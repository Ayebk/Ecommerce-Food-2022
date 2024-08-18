import React, { useEffect, useState } from "react";
import Advertisement from "../components/Advertisement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//SC
import styled from "styled-components";

import { publicRequest } from "../requestMethods";

const Container = styled.div``;

const Title = styled.h1`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #354550;
  font-size: 60px;
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 15px;
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 50px;
  justify-content: center;
`;

const StoresWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 50px;
  justify-content: center;
`;

const Store = styled.div`
  display: flex;
  margin-bottom: 30px;
  height: 160px;
`;

const StoreImg = styled.div`
  width: 200px;
  margin-right: 30px;
`;

const StoreInfo = styled.div`
  width: 300px;
`;

const StoreTitle = styled.h1``;
const StoreDeta = styled.h3``;

const StoreImage = styled.img`
  object-fit: scale-down;
  width: 100%;
  height: 100%;
`;

const Stores = () => {
  const [stores, SetStores] = useState();

  useEffect(() => {
    const stores = async () => {
      const res = await publicRequest.get("/info/store");
      SetStores(res.data);
    };

    stores();
  }, []);

  return (
    <Container>
      <Navbar />
      <Advertisement />

      <Title> הכירו את החנויות והרשתות שפועלים איתנו</Title>

      <StoresWrapper>
        {stores?.map((item) => (
          <Store key={item.id}>
            <StoreInfo>
              <StoreTitle>{item.title}</StoreTitle>
              <StoreDeta>{item.desc}</StoreDeta>
            </StoreInfo>
            <StoreImg>
              <StoreImage src={item.img} />
            </StoreImg>
          </Store>
        ))}
      </StoresWrapper>
      <Footer />
    </Container>
  );
};

export default Stores;
