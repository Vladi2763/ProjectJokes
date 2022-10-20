import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ModalWindow.module.scss";

import { InitialState } from "../../store/types";

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
    const element = event.target as HTMLElement;
    if (
      element !== document.getElementById("button+") &&
      element !== document.getElementById("button-") &&
      element !== document.getElementById("buttonCreateJoke")
    ) {
      if (
        element.closest("#modalWindow") !==
        document.getElementById("modalWindow")
      ) {
        props.onCloseModal();
      }
    }
  };

  const guid = selectedCategory ? selectedCategory.guid : "";

  const inputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
              <textarea
                className={classes.body__inputContainer_input}
                placeholder="Enter text"
                onChange={inputHandler}
              ></textarea>
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
