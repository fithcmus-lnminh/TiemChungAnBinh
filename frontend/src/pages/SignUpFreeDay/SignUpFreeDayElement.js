import { Button } from "react-bootstrap";
import styled from "styled-components";

export const FreeDayContainer = styled.div`
  margin: 3rem 0;
`;

export const FreeDayH2 = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

export const FreeDayP = styled.p``;

export const TextRed = styled.span`
  color: red;
  font-size: ${({ fontSmall }) => (fontSmall ? "14px" : "16px")};
  font-style: ${({ italic }) => italic && "italic"};
`;

export const DayWrapper = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1.25rem;

  @media screen and (max-width: 768px) {
    margin-top: 2rem;
  }
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
