import classes from "./Header.module.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { selectCategory } from "../../store/actionsCreater";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateHomeHandler = () => {
    navigate("/");
    dispatch(selectCategory(null));
  };
  return (
    <div className={classes.header} onClick={navigateHomeHandler}>
      <span className={classes.header__title}> Jokes Aplication</span>
    </div>
  );
};

export default Header;
