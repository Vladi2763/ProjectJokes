import React, { useState } from "react";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./Navigation";
import AllJokesPage from "./Pages/AllJokes";
import FavoritesJokes from "./Pages/FavoritesJokes";
import HistoryPage from "./Pages/History";
import Button from "./Button";
import ModalWindow from "../ModalWindow";

import { addNewJoke } from "../../store/actionsCreater";

import classes from "./Main.module.scss";
import { useDispatch } from "react-redux";

const MainWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const dispatch = useDispatch();

  const closeModalWindow = () => {
    setIsModalOpen(false);
    setIsEmpty(false);
  };

  const addJokeHandler = (name: string) => {
    if (name.length < 1) {
      setIsEmpty(true);
      return;
    }
    dispatch(addNewJoke(name));
    setIsEmpty(false);
    setIsModalOpen(false);
  };

  const openModalWindowHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <React.Fragment>
      <main className={classes.body}>
        <Navigation />
        <div className={classes.main}>
          <Outlet />
        </div>
        {isModalOpen && (
          <ModalWindow
            text="Enter joke text"
            isCreate={true}
            isEmpty={isEmpty}
            onCloseModal={closeModalWindow}
            onSubmit={addJokeHandler}
          />
        )}
        <Button
          text="Добавить шутку"
          openModalWindow={openModalWindowHandler}
        />
      </main>
    </React.Fragment>
  );
};

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<MainWrapper />}>
        <Route path="alljokes" element={<AllJokesPage />}></Route>
        <Route path="favoritesjokes" element={<FavoritesJokes />}></Route>
        <Route path="history" element={<HistoryPage />}></Route>
        <Route path="*" element={<Navigate to="alljokes" replace />} />
      </Route>
    </Routes>
  );
};

export default Main;
