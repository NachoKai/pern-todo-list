import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./List";

const Container = styled.div`
  .modal-content {
    background: #222;
    color: #eee;
  }
  .modal-header,
  .modal-body,
  .modal-footer {
    border: none;
  }
  .close {
    color: #eee;
  }
`;

const Input = styled.input`
  background: #eee;
  color: 222;
  border-radius: 10px;
  width: 100%;
  padding: 8px;
`;

const Edit = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <Button type="button" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
        <i className="fas fa-pencil-alt"></i>
      </Button>

      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit To-Do:</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <Input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => description.trim().length > 0 && updateDescription(e)}
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Edit;
