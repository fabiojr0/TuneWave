import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { InfosProvider } from "./contexts/InfosContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <InfosProvider>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </InfosProvider>
  </AuthProvider>
);
