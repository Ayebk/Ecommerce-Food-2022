import React from "react";

//REDUX
import { useSelector } from "react-redux";

//SC
import styled from "styled-components";

import { mobile, laptop, tablet } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  height: 35px;
  background-color: #ff5050b9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  font-family: sans-serif;
  margin-top: 10px;
  ${tablet({ fontSize: "18px", margin: "auto", padding: "5px" })};
  ${mobile({
    height: "50px",
    fontSize: "18px",
    margin: "auto",
    padding: "5px",
  })};
`;

const Advertisement = () => {
  const user = useSelector((state) => state.auth.username);

  return (
    <Container>
      {!user ? (
        <Wrapper data-testid="advertisemen">
          " חגיגת פתיחה - 5% הנחה למשתמשים רשומים.מהרו להירשם !"
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default Advertisement;
