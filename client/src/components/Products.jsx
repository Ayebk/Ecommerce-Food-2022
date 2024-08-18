import React, { useEffect, useState } from "react";
import Product from "./Product";

//SC
import styled from "styled-components";
import { mobile, laptop, tablet, desktop } from "../responsive";
import axios from "axios";

//REDUX
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 50px;
  justify-content: center;
  ${desktop({ width: "100%" })}
`;

const Products = ({ category, filters, sort }) => {
  const products = useSelector((state) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  
  /**
   * Filtering Products to map them
   */

  useEffect(() => {
    let unmounted = false;
    if (
      category &&
      (filters.brand == null || filters.brand == "all") &&
      !unmounted
    ) {
      const filtered = products.filter(
        (item) => item.categories == filters.category
      );
      setFilteredProducts(filtered);
    } else if (category && !unmounted) {
      const filtered = products.filter(
        (item) =>
          item.categories == filters.category && item.brand == filters.brand
      );
      setFilteredProducts(filtered);
    }
    return () => {
      unmounted = true;
    };
  }, [category, filters, products]);




  return (
    <Container>
      {filteredProducts
        .sort((a, b) => {
          if (sort == "asc") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        })
        .map(
          (
            item,
            index // index only for cypress-test !
          ) => (
            <Product item={item} key={item._id} index={index} />
          )
        )}
    </Container>
  );
};

export default Products;
