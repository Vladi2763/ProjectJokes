import classes from "./Category.module.scss";

const Category: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className={classes.category}>
      <span className={classes.category__name}>{name}</span>
    </div>
  );
};

export default Category;
