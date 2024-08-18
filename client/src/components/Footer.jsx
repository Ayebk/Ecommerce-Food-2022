import React from "react";
import styled from "styled-components";
import { mobile, laptop, tablet, desktop } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  background-color: #def1ff;
  padding: 10px;

  top: 50px;
  position: relative;

  ${mobile({ flexDirection: "column" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  ${mobile({ padding: "10px" })}
`;

const LetterContainer = styled.div`
  flex: 1;
`;

const NewsContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 29px;
  font-family: "Assistant";
`;

const Button = styled.button`
  font-size: 20px;
  cursor: pointer;
  font-family: "Assistant";
`;
const Email = styled.input`
  margin-top: 10px;
  font-size: 20px;
`;

const Content = styled.span`
  font-size: 20px;
  font-family: "Assistant";
`;

const Footer = () => {
  return (
    <Container>
      <InfoContainer>
        <Title>אודותינו</Title>
        <Content>
          FoodNow היא רשת הגדולה והמובילה במדינה, סניפים חדשים מצטרפים בכל רחבי
          הארץ.
          <br /> הוקם בשנת 2021, משרתת את הציבור הרחב ומביאה מוצרים המובילים
          והכי טובים ללקוחותיה. חדשנות שלנו תמיד נמשכת, יחד עם הטכנולוגיה, עוד
          הרבה יבוא בעתיד, הישארו מעודכנים.{" "}
        </Content>
      </InfoContainer>
      <LetterContainer>
        <Title>הישארו מעודכנים</Title>
        <Content>
          השאירו אימייל, להיות הראשונים לדעת על מצבעים,הטבות והנחות.{" "}
        </Content>
        <Email />
        <Button>שלח</Button>
      </LetterContainer>
    </Container>
  );
};

export default Footer;
