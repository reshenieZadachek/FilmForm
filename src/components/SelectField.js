import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

const SelectWrapper = styled.div`
margin: 15px 0;
display: flex;
flex-direction: column;
gap: 8px;
width: 100%;
position: relative;
`;

const Label = styled.label`
font-size: 16px;
margin-bottom: 10px;
color: #333;
`;

const SelectContainer = styled.div`
position: relative;
width: 100%;
`;

const SelectButton = styled.button`
width: 100%;
height: 54px;
padding: 8px 12px;
border-radius: 6px;
border: 1px solid ${props => props.hasError ? '#ff4d4f' : props.isOpen ? '#1890ff' : '#d9d9d9'};
background: white;
display: flex;
align-items: center;
justify-content: space-between;
cursor: pointer;
transition: all 0.3s ease;
color: ${props => props.hasValue ? '#333' : '#bfbfbf'};
padding-right: ${props => props.hasError ? '100px' : '12px'};

&:hover {
    border-color: ${props => props.hasError ? '#ff4d4f' : '#1890ff'};
}

svg {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
}
`;

const OptionsWrapper = styled.div`
position: absolute;
top: calc(100% + 4px);
left: 0;
right: 0;
background: white;
border-radius: 6px;
border: 1px solid #d9d9d9;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
opacity: ${props => props.isOpen ? 1 : 0};
transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
transition: all 0.3s ease;
z-index: 1000;
max-height: 250px;
overflow-y: auto;
`;

const Option = styled.div`
padding: 10px 12px;
cursor: pointer;
transition: all 0.2s ease;

&:hover {
    background: #f5f5f5;
}
`;

const ErrorText = styled.div`
position: absolute;
right: 12px;
top: 50%;
transform: translateY(-50%);
color: #ff4d4f;
font-size: 12px;
white-space: nowrap;

&::after {
    content: ${props => props.error ? `"${props.error}"` : '""'};
}
`;

const SelectField = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  name,
  required
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setTouched(true);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setTouched(true);
  };

  return (
    <SelectWrapper>
      {label && <Label>{label}</Label>}
      <SelectContainer>
        <SelectButton
          type="button"
          onClick={handleButtonClick}
          isOpen={isOpen}
          hasValue={value}
          hasError={hasError}
        >
          <span>{value || placeholder}</span>
          <ChevronDown size={20} />
        </SelectButton>
        
        <OptionsWrapper isOpen={isOpen}>
          {options.map((option, index) => (
            <Option
              key={index}
              onClick={() => handleSelect(option)}
            >
              {option}
            </Option>
          ))}
        </OptionsWrapper>
        
        {hasError && (
          <ErrorText error="Заполните поле" />
        )}
      </SelectContainer>
    </SelectWrapper>
  );
};

export default SelectField;