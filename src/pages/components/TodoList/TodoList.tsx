import React, { useState } from 'react';
import style from './TodoList.module.css';
import Alert from 'react-bootstrap/Alert';

export default function TodoList() {
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim()) {
      if (list.length >= 5 && !isEditing) {
        setShow(true);
      } 
      
      else {
        if (isEditing && currentIndex !== null) {
          const updatedList = [...list];
          updatedList[currentIndex] = input;
          setList(updatedList);
          setIsEditing(false);
          setCurrentIndex(null);
        } 
        
        else {
          setList([...list, input]);
        }

        setInput('');
        setShow(false);
      }
    }
  };

  const editUser = (index: number) => {
    setInput(list[index]);
    setIsEditing(true); 
    setCurrentIndex(index);
  };

  const deleteUser = (index: number) => {
    list.splice(index, 1);
    setList([...list]);
    setShow(false);
  };

  const Alerts = () => {
    return ['warning'].map((variant) => (
      <Alert
        key={variant}
        variant={variant}
        className={style.alert}
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

      <header className={style.headerBackground}></header>

      <div className={style.containers}>
        <h1 className={style.title}>T O D O L I S T</h1>

        <form onSubmit={handleForm} className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Adicione ou edite a lista..."
            maxLength={25}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit" className={style.button}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3d3d3d">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
            </svg>          
          </button>
        </form>

        <div className={style.todoList}>
          <ul>
            {list.map((lists, index) => (
              <li key={index}>
                <div>
                  <small>{index + 1}</small> - {lists}
                </div>
                <div className='flex'>
                  <button onClick={() => editUser(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#3d3d3d">
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                    </svg>                    
                  </button>

                  <button onClick={() => deleteUser(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px" fill="#3d3d3d">
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>  
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
