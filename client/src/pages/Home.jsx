import React, { useEffect, useState } from "react";
import Advertisement from "../components/Advertisement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import styled from "styled-components";
import Footer from "../components/Footer";

//REDUX
import { getCart } from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { lastProducts } from "../redux/actions/productsActions"; //mostProducts

import Product from "../components/Product";
import { mobile, laptop, tablet, desktop } from "../responsive";

const Container = styled.div`
  position: relative;
`;

const Title = styled.h1`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #354550;
  font-size: 60px;
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  justify-content: center;
`;

const AdminTitle = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-size: 20px;
  color: white;
  ${mobile({
    marginTop: "39px",
    fontSize: "15px",
  })}
`;

const AdminAd = styled.div`
  cursor: pointer;
  position: absolute;
  height: 240px;
  width: 240px;
  background-color: red;
  border-radius: 50%;
  top: 140px;
  z-index: 10;
  left: 10px;
  text-align: center;

  animation: shake 7s;
  animation-iteration-count: infinite;

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }

  ${mobile({
    height: "180px",
    width: "180px",
    marginTop: "350px",
  })}
`;

const Home = () => {
  const loggedUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (localStorage.getItem("username") !== null)
      getCart(dispatch, loggedUser.id);
  }, []);

  useEffect(() => {
    lastProducts(dispatch);
  }, [dispatch]);


  const adminDemoNav = () => {
    window.location.assign("https://admin-dashboard-demo123.herokuapp.com/")
  };


  return (
    <Container>
      <AdminAd>
        <AdminTitle  onClick={() => adminDemoNav()}>
          לחצו כאן
          <br /> לראות ולחוות את <br />
          <br /> Admin Dashboard <br />
          Demo
        </AdminTitle>
      </AdminAd>
      <Navbar />
      <Advertisement />
      <Slider />
      <Categories />
      <Title> החדשים</Title>
      <ProductsWrapper>
        {products?.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </ProductsWrapper>
      <Footer />
    </Container>
  );
};

export default Home;
