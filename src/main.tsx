import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/authContext/AuthContextProvider.tsx";
import { DishContextProvider } from "./context/dishContext/DishContextProvider.tsx";
import { MessagesContainer } from "./components/MessagesContainer.tsx";
import { Provider } from "react-redux"
import { store } from "./store/store.ts"


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <DishContextProvider>
        <Provider store={store}>
          <MessagesContainer>
            <App />
          </MessagesContainer>
        </Provider>
      </DishContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
