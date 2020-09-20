import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  color: #eee;
  width: 500px;
`;

const Title = styled.span``;

const Item = styled.span``;

const IconContainer = styled.div`
  width: 50px;
  margin: 0;
`;

const Button = styled.button`
  display: inline-block;
  text-decoration: none;
  padding: 0.3rem 0.6rem;
  font-family: sans-serif;
  color: #fff;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 1px 7px #000;
  transition: all 0.3s;
  margin: 0 0 0 1rem;
  background: linear-gradient(
    90deg,
    ${p => (p.isDelete ? "#ff6b6b" : "#fcc419")},
    ${p => (p.isDelete ? "#c92a2a" : "#e67700")}
  );

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
    background: linear-gradient(
      60deg,
      ${p => (p.isDelete ? "#ff6b6b" : "#fcc419")},
      ${p => (p.isDelete ? "#c92a2a" : "#e67700")}
    );
    box-shadow: 2px 1px 7px ${p => (p.isDelete ? "#f03e3e" : "#f08c00")};
  }
  &:active {
    transform: translateY(3px);
    box-shadow: 4px 3px 5px ${p => (p.isDelete ? "#f03e3e" : "#f08c00")};
  }
`;

const List = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleEdit = () => {};

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>
              <Title>Description</Title>
            </th>
            <IconContainer>
              <th>
                <Title>Edit</Title>
              </th>
              <th>
                <Title>Delete</Title>
              </th>
            </IconContainer>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>
                <Item>{todo.description}</Item>
              </td>
              <IconContainer>
                <td>
                  <Button onClick={handleEdit}>
                    <i class="fas fa-pencil-alt"></i>
                  </Button>
                </td>
                <td>
                  <Button isDelete onClick={() => deleteTodo(todo.todo_id)}>
                    <i class="far fa-trash-alt"></i>
                  </Button>
                </td>
              </IconContainer>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default List;
