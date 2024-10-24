import { useEffect, useState } from "react";
import Advertisement from "../components/Advertisement";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";

//SC
import { mobile, laptop, tablet, desktop } from "../responsive";

//PAYPAL
// import {
//   PayPalScriptProvider,
//   PayPalButtons,
//   usePayPalScriptReducer,
// } from "@paypal/react-paypal-js";

//REUDX
import { useDispatch, useSelector } from "react-redux";

import {
  addOneToCart,
  clearCart,
  removeFromCart,
  removeOneFromCart,
  updateCart,
} from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";

//MUI
import { CheckCircleOutlined, Clear } from "@mui/icons-material";
import { Backdrop, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";



const Container = styled.div``;

const Title = styled.h1`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #354550;
  font-size: 60px;
  margin-top: 30px;
  margin-bottom: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  ${desktop({
    flexDirection: "column",
  })}
`;
const InfoCart = styled.div`
  margin-left: 12px;
  flex: 3;
  display: flex;
  direction: ltr;
  overflow-y: scroll;
  max-height: 600px;
  flex-direction: column;
  border: 1px solid #62dbffa6;
  border-radius: 10px;
  padding: 20px;

  &::-webkit-scrollbar {
    width: 7px;
    border-radius: 50%;
  }
  &::-webkit-scrollbar-track {
    background-color: #62dbffa6;
    border-radius: 50%;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00baf3a6;
    border-radius: 50%;
  }

  ${mobile({
    marginLeft: "0px",
  })}
`;
const Summery = styled.div`
  flex: 1.5;
  border: 2px solid #62dbffa6;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  align-self: center;
  height: max-content;
  margin-left: 12px;
  ${mobile({
    padding: "5px",
    marginBottom: "15px",
    margin: "5px",
  })}
`;
const SummeryTitle = styled.h1`
  color: #3e515f;
  margin-bottom: 20px;
`;
const SummeryItem = styled.div`
  color: #3e515f;
`;

const SummeryItemTotal = styled.div`
  color: #3e515f;
  display: flex;
  margin-top: 20px;
  font-weight: 700;
  padding: 3px;
  margin-top: 20px;
`;

const SummeryItemText = styled.span`
  font-size: 30px;
`;

const SummeryItemTotalText = styled.span`
  font-size: 45px;
  ${mobile({
    fontSize: "30px",
  })}
`;

const SummeryItemPrice = styled.span``;

const SummeryPrice = styled.div`
  color: #3e515f;
  font-size: 42px;
  font-family: fantasy;
  font-weight: 500;
  margin-right: 70px;
`;
const SummeryPriceTotal = styled.div`
  color: #3e515f;
  font-size: 60px;
  font-family: fantasy;
  font-weight: 500;
  margin-right: 70px;
  ${mobile({
    marginRight: "25px",
  })}
`;

const SummeryButton = styled.button``;

const ProductDetail = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  flex: 1;
  width: 200px;
  margin: 15px 20px;
  max-height: 105px;
  ${laptop({
    width: "100px",
  })}
  ${tablet({
    display: "none",
  })}
`;
const Details = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${mobile({
    flex: "1",
  })}
`;

const ProductName = styled.span`
  font-size: 40px;
  margin-bottom: auto;
  ${mobile({
    fontSize: "30px",
  })}
`;
const ProductId = styled.span`
  font-size: 20px;

  font-weight: 300;
  ${mobile({
    fontSize: "17px",
  })}
`;
const ProductColor = styled.span``;

const ProductBrand = styled.span`
  font-size: 20px;
  ${mobile({
    fontSize: "17px",
  })}
`;

const Options = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 50px;
  ${mobile({
    padding: "5px",
    flexDirection: "column",
  })}
`;

const BackButtom = styled.button`
  color: black;
  font-size: 28px;
  font-family: "Assistant";
  border: none;
  font-weight: 400;
  border-radius: 5px;
  background-color: white;
  border: solid #a0d3f8 1px;
  cursor: pointer;
  margin-top: 18px;
  margin-bottom: auto;
  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: #a0d3f8;
    transform: scale(1.4);
  }
  ${mobile({
    display: "none",
  })}
`;

const BuyButtom = styled.button`
  color: black;
  font-size: 45px;
  font-family: "Assistant";
  border: none;
  font-weight: 400;
  border-radius: 5px;
  background-color: #def1ff;
  cursor: pointer;
  margin-top: 18px;
  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: #a0d3f8;
    transform: scale(1.4);
  }
`;

const Hr = styled.hr`
  background-color: #62daff55;
  border: none;
  height: 1px;
  height: ${(props) => props.type === "total" && "2px"};
  margin-top: ${(props) => props.type === "total" && "20px"};
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 3;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-left: 30px;
  ${mobile({
    flexDirection: "column-reverse",
    flex: "1",
    marginBottom: "15px",
  })}/* display: none; */
`;

const AmountContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 50px;
  ${laptop({
    marginLeft: "30px",
  })}
  ${tablet({
    marginLeft: "25px",
  })} 
${mobile({
    marginLeft: "0px",
    placeContent: "center",
  })}
`;

const IconAdd = styled(AddIcon)`
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: #ffffff3d;
    color: #ffc107;
    transform: scale(1.5);
  }
`;

const ClearIcon = styled(Clear)`
  cursor: pointer;

  color: #e84848d1;
  border: solid #ff000024 1px;
  border-radius: 50%;
  margin-left: 15px;

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
  cursor: pointer;

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
  width: 20%;
  font-size: 22px;
  text-align: center;
  margin: 0px 5px;
  border: none;
  border-bottom: solid #44b1ff 2px;
`;

const Price = styled.div`
  color: #3e515f;
  font-size: 42px;
  font-family: fantasy;
  font-weight: 500;
  text-align-last: end;
  ${mobile({
    padding: "10px",
  })}
`;

const PriceShakel = styled.span`
  font-size: 20px;
`;
const PriceShakelTotal = styled.span`
  font-size: 20px;
  ${mobile({
    fontSize: "35px",
  })}
`;
const PirceExtra = styled.span`
  font-size: 25px;
  font-family: "Assistant";
`;
const PriceExtraTotal = styled.span`
  font-size: 25px;
  font-family: "Assistant";
`;

const Payment = styled.div`
  text-align: center;
`;

const PaySuccessIcon = styled(CheckCircleOutlined)`
  color: green;
`;

const DisbaledDiv = styled.div`
  pointer-events: none;

  opacity: 0.5;
  background: #ccc;
`;

const Cart = () => {


  const [quantity, setQuantity] = useState();
  const [openQuantity, SetOpenQuantity] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatching = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const loggedUser = useSelector((state) => state.auth);
  const cartProducts = useSelector((state) => state.cart.products);


  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );


  const [discount, setDiscount] = useState(() => {
    return loggedUser.accessToken ? 0.05 : 0;
  });


  const [shippingPrice, setShippingPrice] = useState(() => {
    return cart.quantity != 0 ? 9.9 : 0;
  });
  const [total, setTotel] = useState(
    cart.total - cart.total * discount + shippingPrice
  );




  const handleQuantity = (type) => {
    if (type === "remove") {
      quantity > 1 && setQuantity((quantity) => quantity - 1);
      //   dispatch(addToCart({selectedProduct:item,quantity}))
    } else {
      setQuantity((quantity) => quantity + 1);
    }
  };



   /**
   * Calculating for final price
   */

  useEffect(() => {
    if (cart.quantity != 0) {
      setTotel(
        loggedUser.accessToken
          ? cart.total - cart.total * discount + shippingPrice
          : cart.total + shippingPrice
      );
    } else {
      setTotel(0);
    }
    if (cart.total == 0) {
      setShippingPrice(0);
    } else {
      setShippingPrice(9.9);
    }
  }, [cart.total]);


  useEffect(() => {
    setShippingPrice(cart.quantity != 0 ? 9.9 : 0);
  }, [cart.quantity]);




   /**
   * Handling Product Amount
   */

  const handleRemoveClick = (item) => {
    dispatching(removeFromCart({ selectedProduct: item, quantity }));
  };

  const handleAddQuantity = (item) => {
    dispatching(addOneToCart({ selectedProduct: item, quantity }));
  };

  const handleRemoveQuantity = (item) => {
    if (item.quantity > 1) {
      dispatching(removeOneFromCart({ selectedProduct: item, quantity }));
    }
  };

  useEffect(() => {
    if (loggedUser.username) updateCart(dispatching, cart, loggedUser);
  }, [cartProducts]);



  /**
   * Popup
   */

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;




  /**
   * Paypal
   */

  const [openPay, setOpenPay] = useState(false);

  const amount = total.toFixed(2);
  const currency = "ILS";
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModel = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [openModalDisbaled, setOpenModalDisbaled] = useState(false);
  const handleOpenModelDisbaled = () => setOpenModalDisbaled(true);
  const handleCloseModalDisbaled = () => setOpenModalDisbaled(false);

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const style = { layout: "vertical", color: "white" };

  const creatingOrder = async (data) => {
    userRequest
      .post("/orders", data)
      .then((res) => {
        setOpenModal(true);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const ApplyclearCart = () => {
    dispatching(clearCart());
  };

 
  const ButtonWrapper = ({ currency, showSpinner }) => {
  
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
               
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              const shipping = details.purchase_units[0].shipping;
            
              const products = cart.products.map((item) => {
                return {
                  productId: item.selectedProduct._id,
                  quantity: item.quantity,
                };
              });

              creatingOrder({
                userId: loggedUser.id,
                products: products,
                address: shipping.address.address_line_1,
                amount: details.purchase_units[0].amount.value,
              }).then(() => ApplyclearCart());
            });
          }}
        />
      </>
    );
  };



  return (
    <Container>
      <Advertisement />
      <Title>הסל שלך</Title>
      <Wrapper>
        {cart.quantity != 0 ? (
          <InfoCart>
            {cart.products.map(
              (
                item,
                index // index only for cypress-test !
              ) => (
                <>
                  <ProductDetail>
                    <Details>
                      <ProductName>
                        {" "}
                        <b>{item.selectedProduct.title}</b>
                      </ProductName>
                      <ProductBrand>
                        מותג: <b>{item.selectedProduct.brand}</b>
                      </ProductBrand>
                      <ProductId>
                        מק''ט - {item.selectedProduct.catalogNumber}
                      </ProductId>
                      <ProductColor color="black" />
                    </Details>

                    <IconWrapper>
                      <AmountContainer>
                        <IconAdd
                          data-testid={`AddIconTest-${index}`}
                          onClick={() => handleAddQuantity(item)}
                          fontSize="large"
                        />
                        <InputAmount value={item.quantity} type="text" />
                        <IconRemove
                          data-testid={`RemoveIconTest-${index}`}
                          onClick={() => handleRemoveQuantity(item)}
                          fontSize="large"
                        />
                      </AmountContainer>
                      <Price>
                        <PriceShakel>₪</PriceShakel>
                        {(item.selectedProduct.price * item.quantity).toFixed(
                          2
                        )}
                      </Price>
                    </IconWrapper>

                    <Image src={item.selectedProduct.img} />
                    <ClearIcon onClick={() => handleRemoveClick(item)} />
                  </ProductDetail>
                  <Hr />
                </>
              )
            )}
     
          </InfoCart>
        ) : (
          <h1></h1>
        )}
        <Summery>
          <SummeryTitle>סיכום ותשלום</SummeryTitle>
          <SummeryItem>
            <SummeryItemText>מוצרים:</SummeryItemText>
            <SummeryPrice>
              <PriceShakel>₪</PriceShakel>
              {cart.total.toFixed(2)}
            </SummeryPrice>
          </SummeryItem>
          <SummeryItem>
            <SummeryItemText>משלוח:</SummeryItemText>
            <SummeryPrice>
              <PriceShakel>₪</PriceShakel>
              {cart.quantity != 0
                ? shippingPrice.toFixed(2)
                : (0).toFixed(2)}{" "}
            </SummeryPrice>
          </SummeryItem>
          <SummeryItem>
            <SummeryItemText>הנחה:</SummeryItemText>
            <SummeryPrice>
              <PriceShakel>₪</PriceShakel>
              {(cart.total * discount).toFixed(2)}
            </SummeryPrice>
          </SummeryItem>
          <Hr type="total" />
          <SummeryItemTotal type="total">
            <SummeryItemTotalText type="total">
              סך הכל לתשלום:
            </SummeryItemTotalText>
            <SummeryPriceTotal type="total">
              <PriceShakelTotal>₪</PriceShakelTotal>
              {total.toFixed(2)}
            </SummeryPriceTotal>
          </SummeryItemTotal>
        </Summery>
      </Wrapper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography
            flexDirection="column"
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            align="center"
            id="transition-modal-title"
            variant="h5"
            component="h2"
          >
            התשלום בוצע בהצלחה ! <PaySuccessIcon fontSize="large" />
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openModalDisbaled}
        onClose={handleCloseModalDisbaled}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography
            flexDirection="column"
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            align="center"
            id="transition-modal-title"
            variant="h5"
            component="h2"
          >
            כנראה נהייתם רעבים מכל המוצרים שאספתם בסל, גם אני. <br />
            <br />
            אין כרגע את  אפשרות לתשלום לאור האנשים שיקפצו לשלם ולצערינו מוצרים אלו הינם רק
            כהדגמה בלבד. <br />
            <br />
            (הינכם משתמשים באבטיפוס של האפליקציה)
          </Typography>
        </Box>
      </Modal>

      <Options>
        <BackButtom onClick={() => navigate("/")}>יש לי עוד קניות</BackButtom>

        <BuyButtom
          onClick={function (event) {
            setOpenPay(true);
            handleOpenModelDisbaled();
          }}
        >
          לתשלום
        </BuyButtom>
      </Options>
      <DisbaledDiv>
        {/* <Payment>
          {openPay ? (
            <PayPalScriptProvider
              options={{
                "client-id": process.env.REACT_APP_PAYPALID,
                components: "buttons",
                currency: "USD",
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          ) : null}
        </Payment> */}
      </DisbaledDiv>
    </Container>
  );
};

export default Cart;
