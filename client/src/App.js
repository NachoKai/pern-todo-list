import React from "react";
import styled from "styled-components";
import Input from "./components/Input";
import List from "./components/List";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #222;
  color: #eee;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <Input />
      <List />
    </Container>
  );
}

export default App;
