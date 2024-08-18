import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

//SC
import styled from "styled-components";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../redux/actions/productsActions";

import { useParams } from "react-router-dom";
import Product from "../components/Product";

//MUI
import FindReplaceIcon from "@mui/icons-material/FindReplace";

const Container = styled.div``;

const Title = styled.h1`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #354550;
  font-size: 60px;
`;
const WrapperSearch = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 135px;
  margin-top: 50px;
  justify-content: center;
`;
const Findicon = styled(FindReplaceIcon)`
  font-size: 200px;
`;

const NotFoundImage = styled.img`
  display: flex;
  margin: auto;
  height: 650px;
  mix-blend-mode: multiply;
`;

const TitleNotFound = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 40px;
  margin-bottom: 40px;
`;

const TitleFound = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 33px;
  margin-bottom: 40px;
  margin-right: 40px;
  place-content: flex-start;
  font-weight: 600;
`;

const TitleFoundSpan = styled.span`
  font-weight: 700;
  margin-right: 5px;
`;

const Search = () => {
  const products = useSelector(
    (state) => state.products.productsSearched.products
  );
  const dispatch = useDispatch();
  const { text } = useParams();

  useEffect(() => {
    searchProducts(dispatch, text);
  }, [text]);


  return (
    <Container>
      <Navbar />
      {products?.length != 0 ? (
        <>
          <TitleFound>
            תוצאות עבור: <TitleFoundSpan> {text} </TitleFoundSpan>
          </TitleFound>

          <WrapperSearch>
            {products?.map((item) => (
              <Product item={item} key={item.id} />
            ))}
          </WrapperSearch>
        </>
      ) : (
        <>
          <TitleNotFound>לא נמצאו מוצרים עבור החיפוש: {text}</TitleNotFound>
          <NotFoundImage
            src={
              "https://res.cloudinary.com/dzy0uevma/image/upload/v1646383250/e-commerce/z7hjbktyek62sodb2zti.jpg"
            }
          />
        </>
      )}
      <Footer />
    </Container>
  );
};

export default Search;
