import { css } from "styled-components";

export const extraMobile = (props) => {
  return css`
    @media only screen and (max-width: 410px) {
      ${props}
    } ;
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 560px) {
      ${props}
    } ;
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 820px) {
      ${props}
    } ;
  `;
};

export const laptop = (props) => {
  return css`
    @media only screen and (max-width: 1024px) {
      ${props}
    } ;
  `;
};

export const desktop = (props) => {
  return css`
    @media only screen and (max-width: 1250px) {
      ${props}
    } ;
  `;
};
