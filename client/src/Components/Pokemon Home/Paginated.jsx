import React from "react";
import { generator } from "../../helpers/pageGeneratorFunction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { currentPage } from "../../redux/actions";

function Paginated() {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.totalPages);
  const totalButtons = generator(totalPages);

  const buttons = totalButtons.map((e) => {
    return (
      <button key={e} id={e} onClick={() => dispatch(currentPage(e))}>
        {e}
      </button>
    );
  });

  return <div>{buttons}</div>;
}

export default Paginated;
