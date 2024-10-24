import React, { useEffect, useState } from "react";
import Product from "./Product";

//SC
import styled from "styled-components";
import { mobile, laptop, tablet, desktop } from "../responsive";
import axios from "axios";

//REDUX
import { useDispatch, useSelector } from "react-redux";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { FlashAuto } from "@mui/icons-material";

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

const FillCircle = styled.div`
  width: 200px;
  height: 200px;

  right: 45px;

  ${desktop({ right: "0", margin: "0px auto" })}
  ${mobile({ width: "150px", height: "150px" })}
`;

const Products = ({ category, filters, sort }) => {
  const products = useSelector((state) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sket, setSket] = useState(true);


  /**
   * Filtering Products to map them
   */

  useEffect(() => {
    setIsLoading(true)

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
      setIsLoading(false);
  
    } else if (category && !unmounted) {
      const filtered = products.filter(
        (item) =>
          item.categories == filters.category && item.brand == filters.brand
      );
      setFilteredProducts(filtered);
      setIsLoading(false);


    }
    return () => {
      unmounted = true;
      setIsLoading(true)
    };
  }, [category, filters,filteredProducts]);


  useEffect(()=>{
    if(products)
    setSket(false)

  },[products])



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
