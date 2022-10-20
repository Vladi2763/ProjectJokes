import ReactDom from "react-dom/client";
import "./styles.scss";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

const root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
