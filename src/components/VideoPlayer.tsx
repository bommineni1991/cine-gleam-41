import { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type AdBreak } from "@/data/movies";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  adBreaks?: AdBreak[];
}

export const VideoPlayer = ({ src, poster, title, adBreaks = [] }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const adVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Ad state
  const [isShowingAd, setIsShowingAd] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState<number | null>(null);
  const [adCountdown, setAdCountdown] = useState(0);
  const [playedAdTimestamps, setPlayedAdTimestamps] = useState<Set<number>>(new Set());

  // Sort ad breaks by timestamp
  const sortedAdBreaks = [...adBreaks].sort((a, b) => a.timestampMinutes - b.timestampMinutes);

  const checkForAdBreak = useCallback((currentTimeSeconds: number) => {
    if (isShowingAd || sortedAdBreaks.length === 0) return;

    const currentTimeMinutes = currentTimeSeconds / 60;

    for (let i = 0; i < sortedAdBreaks.length; i++) {
      const ad = sortedAdBreaks[i];
      // Check if we've reached an ad timestamp (within 1 second window)
      if (
        !playedAdTimestamps.has(ad.timestampMinutes) &&
        currentTimeMinutes >= ad.timestampMinutes &&
        currentTimeMinutes < ad.timestampMinutes + 0.02 // ~1 second window
      ) {
        // Trigger ad
        setPlayedAdTimestamps((prev) => new Set([...prev, ad.timestampMinutes]));
        setCurrentAdIndex(i);
        setIsShowingAd(true);
        setAdCountdown(ad.durationSeconds);
        
        // Pause main video
        if (videoRef.current) {
          videoRef.current.pause();
        }
        break;
      }
    }
  }, [isShowingAd, sortedAdBreaks, playedAdTimestamps]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
      checkForAdBreak(video.currentTime);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [checkForAdBreak]);

  // Ad countdown timer
  useEffect(() => {
    if (!isShowingAd || adCountdown <= 0) return;

    const timer = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          // Ad finished
          setIsShowingAd(false);
          setCurrentAdIndex(null);
          // Resume main video
          if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isShowingAd, adCountdown]);

  // Play ad video when showing ad
  useEffect(() => {
    if (isShowingAd && adVideoRef.current) {
      adVideoRef.current.play();
    }
  }, [isShowingAd]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && !isShowingAd) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls, isShowingAd]);

  const togglePlay = () => {
    if (isShowingAd) return; // Can't control during ads
    
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isShowingAd) return; // Can't seek during ads
    
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const skipAd = () => {
    if (adCountdown <= 5) {
      setIsShowingAd(false);
      setCurrentAdIndex(null);
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const currentAd = currentAdIndex !== null ? sortedAdBreaks[currentAdIndex] : null;

  return (
    <div
      ref={containerRef}
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-background"
      onMouseMove={() => setShowControls(true)}
    >
      {/* Main Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={`h-full w-full object-contain ${isShowingAd ? "hidden" : ""}`}
        onClick={togglePlay}
        playsInline
      />

      {/* Ad Video/Image Overlay */}
      {isShowingAd && currentAd && (
        <div className="absolute inset-0 bg-background">
          {currentAd.adUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              ref={adVideoRef}
              src={currentAd.adUrl}
              className="h-full w-full object-contain"
              muted={isMuted}
              playsInline
              autoPlay
            />
          ) : (
            <img
              src={currentAd.adUrl}
              alt="Advertisement"
              className="h-full w-full object-contain"
            />
          )}
          
          {/* Ad Badge */}
          <div className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
            Ad • {adCountdown}s remaining
          </div>

          {/* Skip Ad Button (only show when countdown is low) */}
          {adCountdown <= 5 && (
            <Button
              onClick={skipAd}
              className="absolute bottom-20 right-4"
              variant="secondary"
            >
              Skip Ad <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && !isShowingAd && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && !isLoading && !isShowingAd && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 shadow-glow transition-transform duration-300 hover:scale-110"
          >
            <Play className="h-10 w-10 fill-primary-foreground text-primary-foreground" />
          </button>
        </div>
      )}

      {/* Controls */}
      {!isShowingAd && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress Bar with Ad Markers */}
          <div
            className="relative mb-4 h-1 cursor-pointer rounded-full bg-muted"
            onClick={handleSeek}
          >
            {/* Ad Markers */}
            {sortedAdBreaks.map((ad, index) => {
              const video = videoRef.current;
              if (!video || !video.duration) return null;
              const position = (ad.timestampMinutes * 60 / video.duration) * 100;
              return (
                <div
                  key={index}
                  className="absolute top-1/2 h-3 w-1 -translate-y-1/2 rounded bg-primary"
                  style={{ left: `${Math.min(position, 100)}%` }}
                  title={`Ad at ${ad.timestampMinutes}min`}
                />
              );
            })}
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={togglePlay}>
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 fill-current" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              {title && (
                <span className="ml-2 text-sm font-medium text-foreground">{title}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};