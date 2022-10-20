import "./index.scss";

const Button: React.FC<{ text: string; openModalWindow: () => void }> = (
  props
) => {
  return (
    <div className="buttonContainer" onClick={() => props.openModalWindow()}>
      <button className="buttonContainer__button" id="buttonCreateJoke">
        {props.text}
      </button>
    </div>
  );
};

export default Button;
