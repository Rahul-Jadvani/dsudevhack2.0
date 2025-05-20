import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./lib/theme-context";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Sponsors } from "./pages/Sponsors";
import { Tracks } from "./pages/Tracks";
import { NewFaq } from "./pages/NewFaq";
import { Insights } from "./pages/Insights";
import { HeaderDemo } from "./pages/HeaderDemo";
import NotFound from "./pages/NotFound";
import { LoadingPage } from "./components/LoadingPage";
import CurtainTransition from "./components/transitions/CurtainTransition";
import { NewNavbar } from "./components/layout/NewNavbar";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCurtain, setShowCurtain] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    // Show the curtain transition immediately when loading completes
    setShowCurtain(true);
    // Keep the loading page visible until curtain is ready
    setIsLoading(false);
  };

  const handleCurtainComplete = () => {
    // Show the main content after curtain transition completes
    setShowContent(true);
    // Hide the curtain
    setShowCurtain(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            {/* Loading page */}
            {isLoading && (
              <LoadingPage onComplete={handleLoadingComplete} loadingTime={2500} />
            )}

            {/* Curtain transition */}
            {showCurtain && (
              <CurtainTransition
                isLoading={isLoading}
                onTransitionComplete={handleCurtainComplete}
              />
            )}

            {/* Main content */}
            {showContent && (
              <div className="app-content-enter">
                {/* Global Navbar - visible on all pages */}
                <NewNavbar />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/sponsors" element={<Sponsors />} />
                  <Route path="/tracks" element={<Tracks />} />
                  <Route path="/faq" element={<NewFaq />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/header-demo" element={<HeaderDemo />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            )}
          </TooltipProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
