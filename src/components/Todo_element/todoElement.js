/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import { useState, useContext } from 'react';
import Checkbox from '../Checkbox/checkbox';
import { todoElement, todoText, closeBtn, inputText } from './todoElement.css';
import { TodoContext } from '../../utils/todoContext';
import { Draggable } from 'react-beautiful-dnd';
import Alert from 'react-popup-alert';

export default function TodoElement({ todo, index }) {
  const { dispatch } = useContext(TodoContext);
  const { id, completed, text } = todo;

  const [alert, setAlert] = useState({
    type: 'error',
    text: 'Input should not be empty',
    show: false,
  });

  const onCloseAlert = () => {
    setAlert({
      type: '',
      text: '',
      show: false,
    });
  };

  const onShowAlert = (type) => {
    setAlert({
      type: type,
      text: 'Demo alert',
      show: true,
    });
  };

  const deleteTodo = (id) =>
    dispatch({
      type: 'DELETE_TODO',
      payload: {
        id,
        text,
      },
    });

  const editTodo = (id, newText) =>
    dispatch({
      type: 'EDIT_TODO',
      payload: {
        id,
        text: newText,
      },
    });

  const completeTodo = (id) =>
    dispatch({
      type: 'COMPLETE_TODO',
      payload: {
        id,
        text,
      },
    });

  const complete = css`
    text-decoration: 1px line-through;
    color: var(--Dark-Grayish-Blue);
    & > p {
      color: var(--Dark-Grayish-Blue);
    }
  `;

  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [error, setError] = useState(false);

  const startEditing = () => {
    setEditing(true);
  };

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const saveEdit = (type) => {
    if (editedText.trim() !== '') {
      editTodo(id, editedText);
      setEditing(false);
      setError(false); // Reset error state
    } else {
      setError(true);
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <li
            css={[todoElement, completed ? complete : '']}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Checkbox
              onClick={() => completeTodo(todo.id)}
              checked={completed}
              id={id}
              text={text}
            />
            {editing ? (
              <input
                type="text"
                value={editedText}
                onChange={handleEditChange}
                css={inputText}
              />
            ) : (
              <p css={todoText}>{text}</p>
            )}
            {editing ? (
              <div>
                <button onClick={saveEdit}>Save</button>
              </div>
            ) : (
              <button
                css={closeBtn}
                aria-label="edit todo"
                onClick={startEditing}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                  color="#494C6B"
                >
                  {' '}
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />{' '}
                  <path
                   
                    fill="#494C6B"
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />{' '}
                </svg>
              </button>
            )}
            <button
              css={closeBtn}
              aria-label="remove todo"
              onClick={() => deleteTodo(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  fill="#494C6B"
                  fillRule="evenodd"
                  d="m16.97 0 .708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                />
              </svg>
            </button>
            {/* ) : (
              ''
            )} */}
          </li>
        );
      }}
    </Draggable>
  );
}
