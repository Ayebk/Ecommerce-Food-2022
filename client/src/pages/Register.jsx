import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Advertisement from "../components/Advertisement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  loginUser,
  registerMes,
  registerUser,
  resetMes,
} from "../redux/actions/authActions";
import { mobile, laptop, tablet, desktop } from "../responsive";

//REDUX
import { useDispatch, useSelector } from "react-redux";

//POPUP
import { toast } from "react-toastify";

const Container = styled.div``;

const Wrapper = styled.div`
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4%;
  border-radius: 9px;
  padding: 15px;

  background-color: #a0d3f8;
`;
const WrapperContainer = styled.div`
  height: 70vh;
  background-color: #a0d3f8;
  border: solid #a0d3f8 8px;

  box-shadow: 0 0 14px #a0d3f8;
`;

const Title = styled.h1`
  text-align-last: center;
`;

const MainTitle = styled.h1`
  margin-top: 50px;
  text-align-last: center;

  font-family: Pushster;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  font-size: 20px;
  min-width: 50%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  color: black;
  font-size: 28px;
  font-family: "Assistant";
  border: none;
  font-weight: 400;
  border-radius: 5px;
  background-color: #def1ff;
  border: solid #0095ff71 2px;
  cursor: pointer;
  margin-top: 40px;
  padding: 3px 30px;
  margin-bottom: 10px;
  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: #a0d3f8;
    transform: scale(1.1);
  }
  ${tablet({ width: " 250px", fontSize: "25px" })}
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth._id);

  const notifySuccess = () =>
    toast.success("הרשמה בוצעה בהצלחה !", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


  /**
   * Debounce function - for popup message
   */
    
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const processDelayMes = debounce(() => notifySuccess());

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (password != passwordAgain) {
    } else {
      const res = await registerUser(dispatch, { username, email, password });
      if (res) {
        processDelayMes();
        navigate("/login");
      }
    }
  };


  return (
    <Container>
      <Navbar />
      <Advertisement />

      <WrapperContainer>
        <Wrapper>
          <Title>הרשמה</Title>
          <Form onSubmit={handleSumbit}>
            <Input
              required
              type="username"
              pattern="[A-Za-z]+.{5,}"
              title=" אנא הזן רק באנגלית כאורך 5 תווים"
              placeholder="שם פרטי"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              required
              type="email"
              title="Please Provide A Valid Email Address !"
              placeholder="דואר אלקטרוני"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <Input
              required
              type="password"
              pattern="(?=.*\d)(?=.*[A-Z]).{8,}"
              title="כל סיסמה חייבת להכיל לפחות 8 תווים עם אות גדולה "
              placeholder=" סיסמה"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              required
              type="password"
              placeholder=" אימות סיסמה"
              onChange={(e) => setPasswordAgain(e.target.value)}
            />

            <Button type="submit">פתיחת חשבון חדש</Button>
          </Form>
        </Wrapper>
      </WrapperContainer>
      <Footer />
    </Container>
  );
};

export default Register;
