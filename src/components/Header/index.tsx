import classes from "./Header.module.scss";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigateHomeHandler = () => {
    navigate("/");
  };
  return (
    <div className={classes.header} onClick={navigateHomeHandler}>
      <span className={classes.header__title}> Jokes Aplication</span>
    </div>
  );
};

export default Header;
