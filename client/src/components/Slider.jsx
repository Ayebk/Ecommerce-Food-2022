import React, { useEffect, useState } from "react";

//SC
import styled from "styled-components";

//MUI
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";

import { mobile, laptop, tablet, desktop } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100%;
  height: 570px;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })};
  ${tablet({ height: "500px" })};
`;

const Wrapper = styled.div`
  height: 100%;
  
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.sliderindex * +100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 575px;
  display: flex;
  top: 0;
  align-items: center;
  background-color: #${(props) => props.bgc};
`;

const Arrow = styled.div`
  width: 70px;
  height: 70px;
  background-color: #f80202;
  border-radius: 50%;
  display: flex;
  position: absolute;
  top: 240px;
  margin: auto;
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
  }
  &:active {
    transition: 0.05s ease-in-out;
    transform: scale(0.8);
  }
  left: ${(props) => props.direction === "left" && "200px"};
  right: ${(props) => props.direction === "right" && "200px"};
  z-index: 2;
  -webkit-tap-highlight-color: transparent;

  @media only screen and (max-width: 1500px) {
    left: ${(props) => props.direction === "left" && "100px"};
    right: ${(props) => props.direction === "right" && "100px"};
  }

  @media only screen and (max-width: 1000px) {
    left: ${(props) => props.direction === "left" && "50px"};
    right: ${(props) => props.direction === "right" && "50px"};
  }
  @media only screen and (max-width: 820px) {
    left: ${(props) => props.direction === "left" && "150px"};
    right: ${(props) => props.direction === "right" && "150px"};
    top: 410px;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
  position: relative;
  top: 180px;
`;
const Image = styled.img`
  height: 60%;
  width: 55%;
  object-fit: scale-down;
  margin-right: 3%;
  mix-blend-mode: multiply;

  height: 45%;
  width: 80%;
  object-fit: contain;
  ${tablet({ height: "auto", width: "80%", objectFit: "contain" })};
`;
const InfoContainer = styled.div`
  height: 85%;
  text-align: -webkit-center;
  flex: 1;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-right: 40%;
  width: 64%;
  margin-bottom: 0%;
  ${desktop({ fontSize: "55px" })};
  ${tablet({ marginRight: "0", fontSize: "38px" })};
`;
const Desc = styled.p`
  margin-right: 40%;
  font-size: 40px;
  width: 50%;
  margin-top: 5%;
  font-family: "Assistant";
  ${desktop({ fontSize: "35px" })};

  ${tablet({ marginRight: "0", fontSize: "25px", width: "60%" })};
`;
const ButtonText = styled.span`
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 1s;
`;

const IconFood = styled(FoodBankOutlinedIcon)`
  width: 100px;
  margin-right: 3px;
  vertical-align: middle;
  opacity: 0;
`;

const Button = styled.button`
  padding: 0px;
  opacity: 0.8;
  margin-right: 40%;
  border-radius: 4px;
  background-color: red;
  width: 350px;
  font-size: 40px;
  text-align: center;
  padding: 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: 3s;
  margin-top: 20px;
  &:active {
    transition: 0.1s;
    transform: scale(1.1);
    box-shadow: 0px 0px 7px;
  }

  &:hover ${ButtonText} {
    padding-left: 50px;
    ${tablet({ display: "none" })};
  }

  &:hover ${IconFood} {
    transition: opacity 1s ease-in-out;
    opacity: 1;
  }

  ${desktop({ fontSize: "35px", width: "290px" })};
  ${tablet({
    marginRight: "0",
    fontSize: "25px",
    width: "60%",
    padding: " 9px",
  })};
`;

const Slider = (props) => {
  const [sliderindex, setsliderindex] = useState(0);
  const [sliders, SetSliders] = useState([]);
  const navigate = useNavigate();


 /**
   * Request for sliders content - API
   */

  useEffect(() => {
    const sliders = async () => {
      const res = await publicRequest.get("/info/slider");
      SetSliders(res.data);
    };

    sliders();
  }, []);

   /**
   * Arrow move sliders
   */

  const handleClick = (direction) => {
    if (direction === "right") {
      setsliderindex(sliderindex > 0 ? sliderindex - 1 : 2);
    } 
    else {
      setsliderindex(sliderindex < 2 ? sliderindex + 1 : 0);
    }
    console.log(sliders.bgc) 
  };

  /**
   * Navigation
   */

  const nav = (link) => {
    navigate(link);
  };

  return (
    <Container>
      

      <Wrapper sliderindex={sliderindex}> 
        {sliders?.map((item) => (
          <Slide bgc={item.bgc} key={item.id}>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button onClick={() => nav(item.link)}>
                <ButtonText> כנסו עכשיו</ButtonText>
                <IconFood style={{ fontSize: "50px" }} />
              </Button>
            </InfoContainer>
            <ImageContainer>
              <Image src={item.img} />
            </ImageContainer>
          </Slide>
          
        ))}
      </Wrapper>
 
    </Container>
  );
};

export default Slider;
