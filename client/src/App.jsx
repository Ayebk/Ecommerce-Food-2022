import Home from "./pages/Home";
import Search from "./pages/Search";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import styled from "styled-components";

//POPUP
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Stores from "./pages/Stores";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  min-height: 90vh;
`;
const FooterWrapper = styled.div`
  margin-top: auto;
  height: 100%;
`;
function App() {
  const user = false;

  const LoginWrapper = ({ children, currentUser }) => {
    return currentUser ? <Navigate to="/" replace /> : children;
  };
  const RegisterWrapper = ({ children, currentUser }) => {
    return currentUser ? <Navigate to="/" replace /> : children;
  };

  return (
    <Router>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
        limit="1"
      />
      <Container>
        <Navbar />
        <ContentWrapper>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search/:text" element={<Search />} />
            <Route path="/search/:text" element={<Search />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route
              path="/login"
              element={
                <LoginWrapper currentUser={user}>
                  <Login />
                </LoginWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <RegisterWrapper currentUser={user}>
                  <Register />
                </RegisterWrapper>
              }
            />
          </Routes>
        </ContentWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Container>
    </Router>
  );
}

export default App;
