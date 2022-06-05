import styled from "styled-components";
import { Button } from "react-bootstrap";

export const SignUpContainer = styled.div`
  margin: 3rem 14rem;

  @media screen and (max-width: 1320px) {
    margin: 3rem 10rem;
  }

  @media screen and (max-width: 1195px) {
    margin: 3rem 5rem;
  }
  @media screen and (max-width: 850px) {
    margin: 3rem 3rem;
  }
`;

export const SignUpH2 = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

export const ButtonSubmit = styled(Button)`
  border-radius: 50px;
  background: #2e5185;
  white-space: nowrap;
  padding: 12px 36px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin: 1rem 0;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #223c63;
    color: #fff;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const TextRed = styled.span`
  color: red;
  font-size: ${({ fontSmall }) => (fontSmall ? "14px" : "16px")};
  font-style: ${({ italic }) => italic && "italic"};
`;

export const CautionWrapper = styled.div`
  margin-top: 1.5rem;
`;
