import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { Layout } from "@/components/Layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ResumeBuilder from "@/pages/tools/ResumeBuilder";
import PdfToWord from "@/pages/tools/PdfToWord";
import WordToPdf from "@/pages/tools/WordToPdf";
import YoutubeDownloader from "@/pages/tools/YoutubeDownloader";
import SocialDownloader from "@/pages/tools/SocialDownloader";
import ImageCompressor from "@/pages/tools/ImageCompressor";
import QrGenerator from "@/pages/tools/QrGenerator";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/tool/resume-builder" component={ResumeBuilder} />
      <Route path="/tool/pdf-to-word" component={PdfToWord} />
      <Route path="/tool/word-to-pdf" component={WordToPdf} />
      <Route path="/tool/youtube-downloader" component={YoutubeDownloader} />
      <Route path="/tool/social-downloader" component={SocialDownloader} />
      <Route path="/tool/image-compressor" component={ImageCompressor} />
      <Route path="/tool/qr-generator" component={QrGenerator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
