import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import AppLayout from "./components/AppLayout";
import Token from "./pages/Tokens/Token";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Check if the Telegram Web App is available
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // Expand the web app to full screen within Telegram
      tg.expand();

      // Set up the main button within Telegram
      tg.MainButton.show();
      tg.MainButton.setText("Check Token");

      // Optionally, handle dark/light mode based on Telegram's theme
      const theme = tg.themeParams;
      document.body.style.backgroundColor = theme?.bg_color || "#ffffff";
    }
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/token/:id" element={<Token />} />
            </Routes>
          </AppLayout>
        </Router>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
