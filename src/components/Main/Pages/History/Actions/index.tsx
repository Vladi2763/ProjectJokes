import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../../../../../store/types";
import "./index.scss";

import Action from "../Action";
import { clearActionsHistory } from "../../../../../store/actionsCreater";

const Actions = () => {
  const history = useSelector((state: InitialState) => state.history);
  const dispatch = useDispatch();

  const clearActionsHistoryHandler = () => {
    dispatch(clearActionsHistory());
  };
  return (
    <section className="section">
      {history.map((action, index) => (
        <Action action={action} key={index} />
      ))}
      <button
        className="section__clearHistory"
        onClick={clearActionsHistoryHandler}
      >
        Clear History
      </button>
    </section>
  );
};

export default Actions;
