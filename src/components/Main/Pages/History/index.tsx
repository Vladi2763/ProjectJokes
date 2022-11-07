import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../../../store/actionsCreater";
import Actions from "./Actions";

const HistoryPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectCategory(null));
  }, []);

  return <Actions />;
};

export default HistoryPage;
