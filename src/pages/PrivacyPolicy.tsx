import { Layout } from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="container min-h-screen pb-12 pt-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="glass-card rounded-xl p-6 md:p-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Disclaimer</h2>
              <p className="mb-6 text-muted-foreground">
                <strong className="text-primary">We are not responsible for any of the content on this website.</strong>
              </p>
              
              <p className="mb-4 text-muted-foreground">
                All content displayed on this website is provided by third parties and is hosted externally. 
                We do not host, store, or control any of the media content available through this platform.
              </p>
              
              <p className="mb-4 text-muted-foreground">
                By using this website, you acknowledge and agree that:
              </p>
              
              <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>We do not claim ownership of any content displayed on this platform</li>
                <li>All content is the sole responsibility of the entity that makes it available</li>
                <li>We are not liable for any damages or losses resulting from your use of this website</li>
                <li>You use this website at your own risk</li>
              </ul>
              
              <h3 className="mb-3 text-lg font-semibold text-foreground">Contact</h3>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </div>
          </div>
          
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
