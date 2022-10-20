import { ActionForHistory } from "../../../../../store/types";

import classes from "./index.module.scss";

const Action: React.FC<{ action: ActionForHistory }> = (props) => {
  const action = props.action;

  const date = `${action.day}.${action.month}.${action.year
    .toString()
    .slice(2)}`;

  const time = `${action.hour}:${action.newMinutes}`;

  return (
    <div className={classes.action}>
      <div className={classes.action__textContainer}>
        <span className={classes.textContainer_text}>{action.text}</span>
      </div>
      <div className={classes.action__dateContainer}>
        <div className={classes.dateContainer_date}>{date}</div>
        <div className={classes.dateContainer_time}>{time}</div>
      </div>
    </div>
  );
};

export default Action;
