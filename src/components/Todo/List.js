import React from "react";

// Icons 
import { AiOutlineClose } from "react-icons/ai";

const List = ({list, setList}) => {

  const deleteUser = (index) => {
    list.splice(index, 1);
    setList([...list]);
  };

  return (
    <>
      <div className="todo-list">
        <ul>
          {list.map((lists, index) => {
            return (
              <li key={index}>
                <small>{index + 1}</small> - {lists}
                <span>
                  <AiOutlineClose
                    className="icon"
                    onClick={() => deleteUser(index)}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default List;
