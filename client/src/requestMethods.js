import axios from "axios";

const BASE_URL = "https://ecommerce-food-now-dce4d2ac51b1.herokuapp.com/api/"; 
// const BASE_URL = "https://localhost:3000/api/"; 


// const BASE_URL = process.env.NODE_ENV === "production"
//     ? "https://ecommerce-food-production.herokuapp.com/api/"
//     : "http://localhost:5000/api/";



  
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.defaults.headers.common["token"] =
  "Bearer " + localStorage.getItem("token");
