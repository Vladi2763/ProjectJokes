import Categories from "./Categories/Categories";
import classes from "./Aside.module.scss";

const Aside = () => {
  return (
    <aside className={classes.aside}>
      <h2 className={classes.aside__title}>Жанры</h2>
      <Categories />
    </aside>
  );
};

export default Aside;
