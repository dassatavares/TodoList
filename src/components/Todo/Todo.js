import React, { useState } from "react";

// Alert
import Alert from "react-bootstrap/Alert";

// Icons
import { AiOutlineRight } from "react-icons/ai";
import List from "./List";

// CSS
import "./todo.css";

const Todo = () => {
  // Push To List
  const [list, setList] = useState([]);
  const [input, setInput] = useState();

  const handleForm = (e) => {
    e.preventDefault();

    setList([...list, input]);

    if (list.length > 4) {
      setList([...list]);
      setShow(true);
    }
  };

  const [show, setShow] = useState(false);

  // Alert Bar
  const Alerts = () => {
    return ["danger"].map((variant) => (
      <Alert
        key={variant}
        variant={variant}
        className="Alert"
        onClick={() => setShow(false)}
        dismissible
      >
        A lista suporta apenas 5 itens!
      </Alert>
    ));
  };

  return (
    <>
      {show && <Alerts />}

      <div className="containers">
        <h1 className="text-center">T O D O L I S T</h1>

        <form onSubmit={handleForm} className="form">
          <input
            type="text"
            placeholder="Adicione a lista..."
            maxLength={25}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <AiOutlineRight className="icon" />
          </button>
        </form>

        {/* Todo List */}
        <List list={list} setList={setList} />
      </div>
    </>
  );
};

export default Todo;
