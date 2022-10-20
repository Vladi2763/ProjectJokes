import classes from "./Button.module.scss";

const Button: React.FC<{
  char: string;
  text: string;
  openModal: () => void;
}> = (props) => {
  return (
    <button
      className={classes.button}
      id={`button${props.char}`}
      onClick={() => props.openModal()}
    >
      {props.char}
    </button>
  );
};

export default Button;
