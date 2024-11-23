import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import AppLayout from "./components/AppLayout";
import Token from "./pages/Tokens/Token";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";
import { useInterval } from "@mantine/hooks";
import BlobLoader from "./pages/BlobLoader";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 10,
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
  useEffect(() => {
    // Set a timeout to hide the loader after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: document.body.style.backgroundColor || "#ffffff",
        }}
      >
        <BlobLoader />
      </div>
    );
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/token/:id" element={<Token />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AppLayout>
        </Router>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
