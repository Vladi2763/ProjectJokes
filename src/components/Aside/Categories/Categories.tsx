import Category from "../Category";
import classes from "./Categories.module.scss";

const DATA: Array<string> = require("../../../categories.json");

const Categories = () => {
  return (
    <div className={classes.categories}>
      {DATA.map((category, index) => (
        <Category key={index} name={category} />
      ))}
    </div>
  );
};

export default Categories;
