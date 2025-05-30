import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFokusHome from "./pages/WebFokusHome";
import { TranslationProvider } from "@/hooks/useTranslation"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TranslationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WebFokusHome />} />
          </Routes>
        </BrowserRouter>
      </TranslationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;