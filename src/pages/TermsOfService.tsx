import { Layout } from "@/components/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <section className="container min-h-screen pb-12 pt-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="glass-card rounded-xl p-6 md:p-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Disclaimer</h2>
              <p className="mb-6 text-muted-foreground">
                <strong className="text-primary">We are not responsible for any of the content on this website.</strong>
              </p>
              
              <p className="mb-4 text-muted-foreground">
                By accessing and using this website, you accept and agree to be bound by the terms and 
                provisions of this agreement.
              </p>
              
              <h3 className="mb-3 text-lg font-semibold text-foreground">Content Disclaimer</h3>
              <p className="mb-4 text-muted-foreground">
                All content on this website is provided for informational purposes only. We make no 
                representations or warranties of any kind, express or implied, about the completeness, 
                accuracy, reliability, suitability, or availability of the content.
              </p>
              
              <h3 className="mb-3 text-lg font-semibold text-foreground">Limitation of Liability</h3>
              <p className="mb-4 text-muted-foreground">
                In no event shall we be liable for any loss or damage including without limitation, 
                indirect or consequential loss or damage, or any loss or damage whatsoever arising 
                from the use of this website.
              </p>
              
              <h3 className="mb-3 text-lg font-semibold text-foreground">External Links</h3>
              <p className="mb-4 text-muted-foreground">
                Through this website, you may be able to link to other websites which are not under our 
                control. We have no control over the nature, content, and availability of those sites.
              </p>
              
              <h3 className="mb-3 text-lg font-semibold text-foreground">User Responsibility</h3>
              <p className="text-muted-foreground">
                You are solely responsible for your use of this website and any content you access 
                through it. You agree to use this website in accordance with all applicable laws and regulations.
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

export default TermsOfService;
