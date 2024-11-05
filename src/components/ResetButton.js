import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
margin-top: 20px;
width: 225px;
height: 50px;
border: 1px solid grey;
border-radius: 25px;
background-color: white;
font-size: 12pt;
font-family: "Inter Tight", sans-serif;
`
const ResetButton = ({ onReset }) => {
    return (
      <Button onClick={onReset}>
        Отменить заполнение
      </Button>
    );
  };
  
  export default ResetButton;