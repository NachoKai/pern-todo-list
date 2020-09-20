import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  width: 500px;
`;

const Title = styled.h1`
  width: 100%;
  font-weight: bold;
  text-align: center;
  font-size: 3rem;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const InputTodo = styled.input`
  background: #eee;
  color: 222;
  border-radius: 10px;
  display: flex;
  flex-grow: 1;
`;

const Button = styled.button`
  font-weight: bold;
  display: inline-block;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-family: sans-serif;
  color: #fff;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  box-shadow: 4px 3px 15px #364fc7;
  transition: all 0.3s;
  margin: 0 0 0 1rem;
  background: linear-gradient(90deg, #748ffc, #5f3dc4);

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
    background: linear-gradient(60deg, #748ffc, #5f3dc4);
    box-shadow: 4px 3px 18px #364fc7;
  }
  &:active {
    transform: translateY(3px);
    box-shadow: 4px 3px 5px #364fc7;
  }
`;

const Input = () => {
  const [description, setDescription] = useState("");

  const handleChange = e => {
    setDescription(e.target.value);
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
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
      <Title>TO-DO LIST</Title>
      <Form onSubmit={onSubmitForm}>
        <InputTodo type="text" value={description} onChange={handleChange} maxLength="250" />
        <Button>ADD</Button>
      </Form>
    </Container>
  );
};

export default Input;
