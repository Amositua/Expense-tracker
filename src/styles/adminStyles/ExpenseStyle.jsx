import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 800px;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #333;
  }
`;

export const DetailsContainer = styled.div`

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

export const Value = styled.span`
  font-size: 16px;
  color: #333;
`;

export const ReceiptImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #1e3a8a;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #162d6b;
  }
`;

export const ButtonDelete = styled(Button)`
  background-color: #e63946;

  &:hover {
    background-color: #162d6b;
  }
`;


export const StyledLink = styled(Link)`
    color: #fff;
`