import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ModalWindow.module.scss";

import { InitialState } from "../../../store/mainReducer";

const ModalWindowPortal: React.FC<{
  text: string;
  isCreate: boolean;
  isEmpty: boolean;
  onSubmit: (...args: Array<string>) => void;
  onCloseModal: () => void;
}> = (props) => {
  const [inputText, setInputText] = useState<string>("");

  const selectedCategory = useSelector(
    (state: InitialState) => state.selectedCategory
  );

  useEffect(() => {
    document.addEventListener("click", closeModaloutHandler);

    return () => {
      document.removeEventListener("click", closeModaloutHandler);
    };
  }, []);

  const closeModaloutHandler = (event: MouseEvent) => {
    if (
      event.target !== document.getElementById("button+") &&
      event.target !== document.getElementById("button-")
    ) {
      if (
        (event.target as HTMLElement).closest("#modalWindow") !==
        document.getElementById("modalWindow")
      ) {
        props.onCloseModal();
      }
    }
  };

  const guid = selectedCategory ? selectedCategory.guid : "";

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div className={classes.modalUnderlay}>
      <div className={classes.modalWindow} id="modalWindow">
        <div className={classes.modalWindow__header}>
          <span className={classes.modalWindow__header_title}>
            {props.text}
          </span>
          <img
            className={classes.modalWindow__header_close}
            src="/images/cross.svg"
            alt="cross"
            onClick={props.onCloseModal}
          />
        </div>
        <div className={classes.modalWindow__body}>
          {props.isCreate && (
            <div className={classes.body__inputContainer}>
              <input
                className={classes.body__inputContainer_input}
                placeholder="Enter category name"
                onChange={inputHandler}
              ></input>
            </div>
          )}
          {props.isEmpty && (
            <div className={classes.body__alert}>
              Поле не должно быть пустым
            </div>
          )}
          <div className={classes.body__buttonContainer}>
            <button
              className={classes.body__buttonContainer_button}
              onClick={() => props.onSubmit(inputText, guid)}
            >
              {props.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalWindow: React.FC<{
  text: string;
  isCreate: boolean;
  isEmpty: boolean;
  onSubmit: (...args: Array<string>) => void;
  onCloseModal: () => void;
}> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalWindowPortal
          text={props.text}
          isCreate={props.isCreate}
          isEmpty={props.isEmpty}
          onSubmit={props.onSubmit}
          onCloseModal={props.onCloseModal}
        />,
        document.getElementById("modal") as HTMLElement
      )}
    </React.Fragment>
  );
};

export default ModalWindow;
