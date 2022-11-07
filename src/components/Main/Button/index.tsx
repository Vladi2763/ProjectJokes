import "./index.scss";

const Button: React.FC<{
  text: string;
  isSelectedCategory: boolean;
  openModalWindow: () => void;
}> = (props) => {
  return (
    <div className="buttonContainer" onClick={() => props.openModalWindow()}>
      <button
        className="buttonContainer__button"
        id="buttonCreateJoke"
        disabled={props.isSelectedCategory}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
