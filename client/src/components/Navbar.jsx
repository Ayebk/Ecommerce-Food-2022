import React, { forwardRef, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import {
  Badge,
  Popover,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import { mobile, laptop, tablet } from "../responsive";
import { useNavigate } from "react-router-dom";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  logoutProcess,
  logoutProcessReset,
  logoutReset,
  logoutSuccess,
  resetMes,
} from "../redux/actions/authActions";
import { updateCart } from "../redux/actions/cartActions";


//MUI
import ReadMoreIcon from "@mui/icons-material/ReadMore";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CoffeeIcon from "@mui/icons-material/Coffee";
import IcecreamIcon from "@mui/icons-material/Icecream";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import SpaIcon from "@mui/icons-material/Spa";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


/**
 * POPUP
 */

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Container = styled.div`
  height: 90px;
  position: sticky;
  top: 0;
  z-index: 99;
  width: 100%;
  background-color: white;
  border-bottom: solid 2px beige;

  ${tablet({ height: "135px" })};
`;

const Wrapper = styled.div`
  padding: 25px 10px 0px 10px;
  display: flex;
`;

const Center = styled.div`
  display: flex;
  flex: 1.5;
  -webkit-tap-highlight-color: transparent;
`;
const SearchContainer = styled.div`
  width: 80%;
`;

const SearchContainerCenter = styled.div`
  display: flex;
  flex: 4;
  margin-top: 5px;
  ${tablet({ display: "none" })};
`;
const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  justify-content: end;
`;

const Logo = styled.div`
  margin-right: 1%;
  margin-left: 2%;
  align-self: center;
  font-size: 40px;
  font-family: Pushster;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  ${mobile({ fontSize: "30px" })}
`;

const MenuItem = styled.div`
  font-size: 20px;
  direction: rtl;
  margin: 20px;
  font-family: Assistant;
  cursor: pointer;

  min-width: 55px;
  min-width: ${(props) => props.type === "menu3" && "105px"};
  margin-left: ${(props) => props.type === "menu3" && "40px"};

  &:hover {
    background-color: #ffffff3d;
    transform: scale(1.1);
  }
  &:active {
    background-color: #ffffff3d;
    color: #ffc107;
    transform: scale(1.2);
  }

  ${laptop({ margin: "20px 15px" })};
  ${tablet({ display: "none" })};
`;
const MenuItemHome = styled.div`
  font-size: 20px;
  direction: rtl;
  margin: 20px;
  font-family: Assistant;
  cursor: pointer;

  min-width: 55px;
  min-width: ${(props) => props.type === "menu3" && "105px"};

  &:hover {
    background-color: #ffffff3d;
    transform: scale(1.1);
  }
  &:active {
    background-color: #ffffff3d;
    color: #ffc107;
    transform: scale(1.2);
  }

  ${laptop({ display: "none" })};
`;

const LoginButtons = styled.div`
  font-size: 20px;
  direction: rtl;
  margin: 20px;
  margin-left: ${(props) => props.type === "last" && "40px"};

  font-family: Assistant;
  cursor: pointer;
  &:hover {
    background-color: #ffffff3d;
    transform: scale(1.05);
  }
  &:active {
    background-color: #ffffff3d;
    color: #171b97;
    transform: scale(1.1);
  }
  ${laptop({ margin: "20px 20px 20px 20px" })};
`;

const RegisterButtons = styled.div`
  font-size: 20px;
  direction: rtl;
  margin: 20px;
  margin-left: ${(props) => props.type === "last" && "40px"};

  font-family: Assistant;
  cursor: pointer;
  &:hover {
    background-color: #ffffff3d;
    transform: scale(1.05);
  }
  &:active {
    background-color: #ffffff3d;
    color: #171b97;
    transform: scale(1.1);
  }
  ${laptop({ margin: "20px" })};
  ${mobile({ display: "none" })}
`;

const IconCart = styled(ShoppingCartOutlinedIcon)`
  cursor: pointer;
  margin-left: 30px;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: #ffffff3d;
    transform: scale(1.2);
  }
  &:active {
    background-color: #ffffff3d;
    color: #ffc107;
    transform: scale(1.4);
  }
`;

const SearchInput = styled.input`
  border: none;
  box-shadow: 0px 0px 3px #014783;
  height: 36px;
  font-weight: 400;
  font-size: 29px;
  width: 95%;
  margin-top: 7px;
  margin-right: 7px;
  &:hover {
    box-shadow: 0px 0px 4px #014783;
  }

  &:focus {
    color: #ffc107;
  }
  ${mobile({ marginRight: "10px" })}
`;

const SearchIconContainer = styled.div`
  display: none;
  cursor: pointer;
  font-size: 33px;
  color: #ffffff;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  margin-right: 15px;
  width: 44px;
  background-color: #0a98ff;
  height: 42px;
  text-align: center;
  border: solid;
  border-radius: 50%;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(1.1);
  }
  ${laptop({ display: "block", margin: "0px 15px 5px 0px" })};
`;
const MoreIconContainer = styled.div`
  display: none;
  cursor: pointer;

  font-size: 30px;

  display: none;
  cursor: pointer;
  margin-top: 3px;
  font-size: 32px;
  color: #ffffff;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  margin-right: 9px;
  width: 44px;
  background-color: #0a98ff;
  height: 42px;
  text-align: center;
  border: solid;
  border-radius: 50%;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(1.1);
  }
  ${tablet({ display: "block", marginBottom: "5px" })};
  ${mobile({ marginRight: "8px" })};
`;

const AccountIcon = styled.div`
  cursor: pointer;
  font-size: 30px;
  color: #44b1ff;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  margin-right: 10px;
  margin-left: 30px;
  width: 38px;
  height: 37px;
  text-align: center;
  border: solid;
  border-radius: 50%;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: #ffffff3d;
    transform: scale(1.2);
  }
  &:active {
    background-color: #ffffff3d;
    color: #ffc107;
    transform: scale(1.4);
  }
`;

const Responsive = styled.div`
  display: none;
  width: 100%;
  ${tablet({ display: "flex", marginBottom: "5px" })};
`;

const Typo = styled(Typography)`
  cursor: pointer;
  width: 100%;
  &:hover {
    color: #b18502;
  }
  &:active {
  }
  ${tablet({ display: "flex", marginBottom: "5px" })};
`;

const ItemDiv = styled.div`
  cursor: pointer;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 6px 6px 6px;

  &:hover {
    background-color: #ffffff3d;
    transform: scale(1.1);
  }
  &:active {
    background-color: #ffffff3d;
    color: #ffc107;
    transform: scale(1.2);
  }
`;

const ItemTitle = styled.h5``;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
`;

const Navbar = () => {
  const loggedUser = useSelector((state) => state.auth);
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const cartProducts = useSelector((state) => state.cart.products);
  const loggingOut = useSelector((state) => state.auth.isProccessingLogout);
  const failedProcess = useSelector((state) => state.auth.failedProcess);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMes, setOpenMes] = useState(false);
  const [openMesSuc, setOpenMesSuc] = useState(false);
  const [anchorElResp, setAnchorElResp] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * Popup
   */
  const handleClickMes = () => {
    setOpenMes(true);
  };

  const handleCloseMes = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMes(false);
  };

  /**
   * Popup
   */

  const handleClickMesSuc = () => {
    setOpenMesSuc(true);
  };

  const handleCloseMesSuc = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMesSuc(false);
  };

  /**
   * Logout Process
   */

  useEffect(() => {
    if (failedProcess === true) {
      handleClickMes();
    }
  }, [failedProcess]);

  useEffect(() => {
    if (failedProcess == "SUCCESS") {
      handleClickMesSuc();
    }
  }, [dispatch]);

  const handleClickResp = (event) => {
    setAnchorElResp(event.currentTarget);
  };

  const handleCloseResp = () => {
    setAnchorElResp(null);
  };

  const openResp = Boolean(anchorElResp);
  const idResp = openResp ? "simple-popover" : undefined;

  const handleLogout = async () => {
    dispatch(logoutReset());
  };

  /**
   * Navigation
   */

  function navHome() {
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  }
  function navProducts(event) {
    handleClickResp(event);
  }
  function navStores() {
    updateCart(dispatch, cartProducts, loggedUser);
    if (window.location.pathname === "/stores") {
      window.location.reload();
    } else {
      navigate("/stores");
    }
  }
  function navLogin() {
    if (window.location.pathname === "/login") {
      window.location.reload();
    } else {
      navigate("/login");
    }
  }
  function navRegister() {
    if (window.location.pathname === "/register") {
      window.location.reload();
    } else {
      navigate("/register");
    }
  }

  function navCart() {
    if (window.location.pathname === "/cart/" + loggedUser.id) {
      window.location.reload();
    } else {
      navigate("/cart/" + loggedUser.id);
    }
  }

  function navItem(item) {
    navigate("/products/" + item);
    window.location.reload();
  }

  const handleClick = (event) => {
    dispatch(logoutProcess());
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    logoutProcessReset(dispatch);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navSearchPage(e.target.value);
    }
  };

  function navSearchPage(text) {
    if (text) navigate(`/search/${text}`);
  }

  return (
    <Container>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openMes}
          autoHideDuration={6000}
          onClose={handleCloseMes}
        >
          <Alert
            onClose={handleCloseMes}
            severity="error"
            sx={{ width: "100%" }}
          >
            בדוק את הפרטים שלך שוב..
          </Alert>
        </Snackbar>
      </Stack>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openMesSuc}
          autoHideDuration={6000}
          onClose={handleCloseMesSuc}
        >
          <Alert
            onClose={handleCloseMesSuc}
            severity="success"
            sx={{ width: "100%" }}
          >
            registed seccuss!
          </Alert>
        </Snackbar>
      </Stack>

      <Wrapper>
        <Center>
          <Logo onClick={navHome}>FoodNow</Logo>
          <MenuItemHome onClick={navHome}>דף בית</MenuItemHome>
          <MenuItem
            data-testid="productsNav"
            type="menu2"
            onClick={navProducts}
          >
            מוצרים
          </MenuItem>
          <MenuItem type="menu3" onClick={navStores}>
            רשתות וחנויות
          </MenuItem>
        </Center>
        <SearchContainerCenter>
          <SearchInput placeholder="חיפוש..." onKeyDown={handleKeyDown} />
        </SearchContainerCenter>
        <Left>
          {loggedUser.accessToken ? (
            <>
              <AccountIcon onClick={handleClick}>
                <AccountBoxIcon />
              </AccountIcon>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typo onClick={handleLogout} sx={{ p: 2 }}>
                  התנתק
                </Typo>
              </Popover>
            </>
          ) : (
            <>
              <LoginButtons onClick={navLogin}>התחבר</LoginButtons>

              <RegisterButtons type="last" onClick={navRegister}>
                הרשמה
              </RegisterButtons>
            </>
          )}
          <Badge badgeContent={cartQuantity} color="primary" onClick={navCart}>
            <IconCart color="action" fontSize="large" />
          </Badge>
        </Left>
      </Wrapper>
      <Responsive>
        <MoreIconContainer>
          <ReadMoreIcon onClick={navProducts} />
        </MoreIconContainer>
        <SearchContainer>
          <SearchInput placeholder="חיפוש.." onKeyDown={handleKeyDown} />
        </SearchContainer>
      </Responsive>

      <Popover
        id={idResp}
        open={openResp}
        anchorEl={anchorElResp}
        onClose={handleCloseResp}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ItemWrapper>
          <ItemDiv onClick={() => navItem("drinks")}>
            <LocalCafeIcon />
            <ItemTitle>משקאות</ItemTitle>
          </ItemDiv>

          <ItemDiv data-testid="sweetsNav" onClick={() => navItem("sweets")}>
            <IcecreamIcon />
            <ItemTitle>מתוקים</ItemTitle>
          </ItemDiv>

          <ItemDiv onClick={() => navItem("breads")}>
            <BreakfastDiningIcon />
            <ItemTitle>לחמים</ItemTitle>
          </ItemDiv>
          <ItemDiv onClick={() => navItem("fruitsAndVegetables")}>
            <SpaIcon />
            <ItemTitle>ירקות ופירות</ItemTitle>
          </ItemDiv>
          <ItemDiv onClick={() => navItem("pizza")}>
            <LocalPizzaIcon />
            <ItemTitle>פיצות</ItemTitle>
          </ItemDiv>
          <ItemDiv>
            <DinnerDiningIcon onClick={() => navItem("meats")} />
            <ItemTitle>בשרים</ItemTitle>
          </ItemDiv>
          <ItemDiv onClick={() => navItem("cheese")}>
            <KitchenIcon />
            <ItemTitle>גבינות</ItemTitle>
          </ItemDiv>
          <ItemDiv onClick={() => navItem("coffee")}>
            <CoffeeIcon />
            <ItemTitle>קפה</ItemTitle>
          </ItemDiv>
        </ItemWrapper>
      </Popover>
    </Container>
  );
};

export default Navbar;
