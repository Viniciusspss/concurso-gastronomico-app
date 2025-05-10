import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/authContext/AuthContextProvider.tsx";
import { DishContextProvider } from "./context/dishContext/DishContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <DishContextProvider>
        <App />
      </DishContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
