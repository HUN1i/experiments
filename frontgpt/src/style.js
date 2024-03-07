import styled from 'styled-components';

const wideDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: gray;
`;
const Button = styled.button`
  background-color: #3498db;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #297fb8;
  }
`;

export default Button;
