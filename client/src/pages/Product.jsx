import React, { useEffect, useState } from "react";
import Advertisement from "../components/Advertisement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//SC
import styled from "styled-components";

//MUI
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { mobile, laptop, tablet, desktop } from "../responsive";
import { useParams } from "react-router-dom";

//REDUX
import { addToCart, updateCart } from "../redux/actions/cartActions";
import { clearProduct, getProduct } from "../redux/actions/productsActions";
import { useDispatch, useSelector } from "react-redux";


const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 100px;
  width: 90%;
  margin-right: auto;
  margin-left: auto;

  ${tablet({
    flexDirection: "column",
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
  max-height: 600px;
  ${desktop({
    flex: 0.5,
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px;
  ${tablet({
    flex: 0.5,
  })}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  margin-top: 30px;
  border: none;
`;
const Title = styled.h1`
  padding: 10px;
  font-size: 50px;
`;

const Desc = styled.p`
  padding: 10px;
  font-size: 25px;
  ${mobile({
    fontSize: "19px",
  })}
`;

const SmallDetails = styled.div`
  padding: 10px;
  font-size: 18px;
  ${mobile({
    fontSize: "16px",
  })}
`;
const TitleDetails = styled.h2`
  margin-bottom: 5px;
  font-size: 28px;
`;
const InfoTable = styled.table`
  margin-top: 30px;
  font-size: 19px;

  ${mobile({
    fontSize: "16px",
  })}
`;
const Disclaimer = styled.h4`
  margin-top: 5px;
`;
const OrderContainer = styled.div`
  display: flex;
  place-content: flex-end;
`;
const AmountContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  width: 150px;
  padding: 0px 15px;
`;

const ButtonOrder = styled.button`
  color: black;
  font-size: 28px;
  font-family: "Assistant";
  border: none;
  font-weight: 400;
  border-radius: 5px;
  background-color: #def1ff;
  cursor: pointer;
  margin-top: 18px;
  display: flex;
  border: 1px solid #a0d3f83b;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: #a0d3f8;
    transform: scale(1.4);
  }
`;

const IconAdd = styled(AddIcon)`
  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: #ffffff3d;
    color: #ffc107;
    transform: scale(1.5);
  }
`;

const IconRemove = styled(RemoveIcon)`
  margin-left: 5px;
  border-radius: 10%;
  &:hover {
    background-color: #ffffff3d;
    transform: scale(1.2);
  }
  &:active {
    background-color: #ffffff3d;
    color: #ffc107;
    transform: scale(1.5);
  }
`;
const InputAmount = styled.input`
  width: 30%;
  font-size: 22px;
  text-align: center;
  margin: 0px 5px;
`;

const PriceShakel = styled.span`
  font-size: 20px;
`;
const PirceExtra = styled.span`
  font-size: 25px;
  font-family: "Assistant";
`;

const Price = styled.div`
  color: #3e515f;
  font-size: 60px;
  font-family: fantasy;
  font-weight: 500;
  text-align-last: end;
  padding: 20px;
  margin-left: 30px;
`;

const Tr = styled.tr``;

const Td = styled.td`
  font-size: 20px;
  padding-left: 5px;
`;

const Product = () => {
  let id = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);


  const loggedUser = useSelector((state) => state.auth);
  const cartProducts = useSelector((state) => state.cart.products);
  const cart = useSelector((state) => state.cart);
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  useEffect(() => {
    getProduct(dispatch, id);
    return () => {
      clearProduct(dispatch);
    };
  }, [getProduct, id]);


  const handleAddClick = () => {
    dispatch(addToCart({ selectedProduct, quantity }));
  };

  useEffect(() => {
    if (loggedUser.username) updateCart(dispatch, cart, loggedUser);
  }, [cartProducts]);

  const handleQuantity = (type) => {
    if (type === "remove") {
      quantity > 1 && setQuantity((quantity) => quantity - 1);
    } else {
      setQuantity((quantity) => quantity + 1);
    }
  };


  return (
    <Container>
      <Navbar />
      <Advertisement />
      <Wrapper>
        <InfoContainer>
          <Title>{selectedProduct ? selectedProduct.title : null}</Title>
          <Desc>{selectedProduct ? selectedProduct.desc : null}</Desc>
          <SmallDetails>
            <TitleDetails>נתונים</TitleDetails>
            <Tr>
              <Td>רשת: </Td>
              {selectedProduct ? <b>{selectedProduct.brand}</b> : null}
            </Tr>
            <Tr>
              <Td>מק"ט: </Td>
              {selectedProduct ? selectedProduct.catalogNumber : null}
            </Tr>
            {selectedProduct?.details ? (
              <InfoTable>
                רכיבים: <br /> {selectedProduct?.details}
              </InfoTable>
            ) : null}
            <Disclaimer>
              הנתונים המדויקים מופיעים על גבי המוצר. התמונות והתאריכים המופיעים
              הינם להמחשה בלבד ואין להסתמך עליהם.
            </Disclaimer>
          </SmallDetails>
          <Price>
            <PriceShakel>₪</PriceShakel>
            {selectedProduct ? selectedProduct.price : null}
            <PirceExtra></PirceExtra>
          </Price>

          <OrderContainer>
            <ButtonOrder onClick={handleAddClick}>הוסף לסל</ButtonOrder>
            <AmountContainer>
              <IconAdd onClick={() => handleQuantity("add")} fontSize="large" />
              <InputAmount value={quantity} />
              <IconRemove
                onClick={() => handleQuantity("remove")}
                fontSize="large"
              />
            </AmountContainer>
          </OrderContainer>
        </InfoContainer>
        {selectedProduct ? 
        <ImgContainer>
          <Image src={selectedProduct.img} />
        </ImgContainer> :  null}
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Product;
