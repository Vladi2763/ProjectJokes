import ReactDom from "react-dom/client";
import "./styles.scss";
import store from "./store";
import { Provider } from "react-redux";

import App from "./App";

const root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
