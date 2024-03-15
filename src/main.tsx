import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { InfosProvider } from "./contexts/InfosContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <InfosProvider>
      <App />
    </InfosProvider>
  </AuthProvider>
);
