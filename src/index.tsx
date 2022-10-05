import ReactDom from "react-dom/client";
import "./styles.scss";

import Aside from "./components/Aside";

const root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Aside />);
