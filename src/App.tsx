import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MessagesContainer } from "./components/MessagesContainer";
import { HelmetProvider, Helmet } from "react-helmet-async"


function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <MessagesContainer>
          <Helmet titleTemplate="%s | Concurso Gastronômico" />
          <RouterProvider router={router} />
        </MessagesContainer>
      </Provider>
    </HelmetProvider>
  )
}

export default App;
