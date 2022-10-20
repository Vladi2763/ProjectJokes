import classes from "./Aside.module.scss";
import Categories from "./Categories";
import Button from "./Button";
import ModalWindow from "../ModalWindow";

import { addCategory, deleteCategory } from "../../store/actionsCreater";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { InitialState } from "../../store/types";

const Aside = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const dispatch = useDispatch();

  const selectedCategory = useSelector(
    (state: InitialState) => state.selectedCategory
  );

  const openCreateModalWindow = () => {
    setIsCreateModalOpen(true);
  };

  const openDeleteModalWindow = () => {
    if (!selectedCategory || !selectedCategory.custom) return;
    setIsDeleteModalOpen(true);
  };

  const closeModalWindow = () => {
    setIsCreateModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsEmpty(false);
  };

  const addCategoryHandler = (name: string) => {
    if (name.length < 1) {
      setIsEmpty(true);
      return;
    }
    dispatch(addCategory(name));
    setIsEmpty(false);
    setIsCreateModalOpen(false);
  };

  const deleteCategoryHandler = (...args: Array<string>) => {
    const [name, guid] = args;
    dispatch(deleteCategory(guid));
    setIsDeleteModalOpen(false);
  };

  return (
    <aside className={classes.aside}>
      <div className={classes.aside__header}>
        <Button
          char="+"
          text="Add new Category"
          openModal={openCreateModalWindow}
        />
        <h2 className={classes.aside__header_title}>Жанры</h2>
        <Button
          char="-"
          text="Delete Category"
          openModal={openDeleteModalWindow}
        />
      </div>
      <Categories />
      {isCreateModalOpen && (
        <ModalWindow
          text="Create category"
          isCreate={true}
          isEmpty={isEmpty}
          onSubmit={addCategoryHandler}
          onCloseModal={closeModalWindow}
        />
      )}
      {isDeleteModalOpen && (
        <ModalWindow
          text="Delete category"
          isCreate={false}
          isEmpty={isEmpty}
          onSubmit={deleteCategoryHandler}
          onCloseModal={closeModalWindow}
        />
      )}
    </aside>
  );
};

export default Aside;
