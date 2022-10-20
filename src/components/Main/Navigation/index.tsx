import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <div className={classes.navigation}>
      <div className={classes.navigation__category}>
        <NavLink
          className={(data) =>
            data.isActive ? classes.category_active : classes.category_nonActive
          }
          to="/alljokes"
        >
          Все анекдоты
        </NavLink>
      </div>
      <div className={classes.navigation__category}>
        <NavLink
          className={(data) =>
            data.isActive ? classes.category_active : classes.category_nonActive
          }
          to="/favoritesjokes"
        >
          Избранные анекдоты
        </NavLink>
      </div>
      <div className={classes.navigation__category}>
        <NavLink
          className={(data) =>
            data.isActive ? classes.category_active : classes.category_nonActive
          }
          to="/history"
        >
          История
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
