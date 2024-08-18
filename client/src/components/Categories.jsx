import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile, laptop, tablet, desktop } from "../responsive";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
  background-color: #ffffff;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Cover = styled.div`
  background-color: rgb(222 241 255 / 95%);
  width: 28.5vw;
  margin-top: 15px;
  height: 69px;
  text-align: center;
  width: 26.5vw;
  margin-top: 15px;
  height: 77px;

  ${tablet({ width: " 23.5vw", height: "fit-content" })}
  ${mobile({ width: " 23.5vw", height: "fit-content" })}
`;
const Info = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  font-size: 46px;
  font-family: sans-serif;
  color: #000000;
  ${laptop({ fontSize: "39px" })}
  ${tablet({ fontSize: "31px", whiteSpace: "initial" })}
  ${mobile({ fontSize: "23px" })}
`;

const Button = styled.button``;
const Category = styled.div`
  flex: 20%;
  margin: 3px;
  height: 17vh;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:active {
    transition: 0.1s;
    transform: scale(0.96);
    -webkit-tap-highlight-color: transparent;
  }
  &:hover {
    ${Image} {
      transition: 1s ease-in-out;
      transform: scale(1.1);
    }
  }
`;

/**
   * Request for Categories content - API
   */

const Categories = () => {
  const [categories, SetCategories] = useState([]);

  useEffect(() => {
    const categories = async () => {
      const res = await publicRequest.get("/info/category");
      SetCategories(res.data);
    };

    categories();
  }, []);



  return (
    <Container>
      {categories?.map((item) => (
        <Category key={item.id}>
          <Link to={`/products/${item.cat}`}>
            <Image src={item.img} />

            <Info>
              <Cover>
                <Title>{item.title}</Title>
              </Cover>
              <Button></Button>
            </Info>
          </Link>
        </Category>
      ))}
    </Container>
  );
};

export default Categories;
