import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
margin: 15px 0;
display: flex;
flex-direction: column;
width: 100%;
position: relative;
`;

const Label = styled.label`
font-size: 16px;
margin-bottom: 10px;
color: #333;
`;

const InputContainer = styled.div`
position: relative;
width: 100%;
`;

const StyledInput = styled.input`
width: 100%;
height: 54px;
padding: 8px 12px;
border-radius: 6px;
border: 1px solid ${props => props.hasError ? '#ff4d4f' : '#d9d9d9'};
outline: none;
transition: all 0.3s ease;
padding-right: ${props => props.hasError ? '100px' : '12px'};

&:focus {
  border-color: ${props => props.hasError ? '#ff4d4f' : '#1890ff'};
  box-shadow: ${props => 
    props.hasError 
      ? '0 0 0 2px rgba(255, 77, 79, 0.2)' 
      : '0 0 0 2px rgba(24, 144, 255, 0.2)'
  };
}

&::placeholder {
  color: #bfbfbf;
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
  
  // Компонент для textarea
  const StyledTextArea = styled(StyledInput).attrs({ as: 'textarea' })`
    width: ${props => props.width || '100%'};
    min-height: ${props => props.height || '120px'};
    resize: vertical;
    padding: 12px;
  `;
  
  // Компонент TextAreaField
  export const TextAreaField = ({
    label,
    placeholder = '',
    value = '',
    onChange,
    required = false,
    name,
    width = '100%',
    height = '120px'
  }) => {
    const [error, setError] = React.useState('');
    const [touched, setTouched] = React.useState(false);
  
    const validateField = (value) => {
      if (required && !value.trim()) {
        setError('Заполните поле');
        return false;
      }
      setError('');
      return true;
    };
  
    const handleChange = (e) => {
      onChange(e);
      if (touched) {
        validateField(e.target.value);
      }
    };
  
    const handleBlur = () => {
      setTouched(true);
      validateField(value);
    };
  
    return (
      <InputWrapper>
        {label && <Label>{label}</Label>}
        <InputContainer>
          <StyledTextArea
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            hasError={touched && error}
            name={name}
            width={width}
            height={height}
          />
          {touched && error && <ErrorText error={error} />}
        </InputContainer>
      </InputWrapper>
    );
  };
  
  // Обновленный основной компонент InputField
  export const InputField = ({
    label,
    placeholder = '',
    value = '',
    onChange,
    required = false,
    name,
    width = '100%',
    isUNF = false,
  }) => {
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);
  
    const handleBlur = (e) => {
      setTouched(true);
      const formattedValue = formatUNF(e.target.value);
      console.log(formattedValue);
      if (formattedValue !== e.target.value) {
        setError('Формат: 890-XXX-XXX-XX-XXX');
        e.target.value = formattedValue
        onChange(e, formattedValue);
      } else {
        setError('');
      }
    };
  
    const handleChange = (e) => {
      const formattedValue = formatUNF(e.target.value);
      onChange(e, formattedValue);
    
      if (touched) {
        if (formattedValue !== e.target.value) {
          setError('Формат: 890-XXX-XXX-XX-XXX');
        } else {
          setError('');
        }
      }
    };
  
    const formatUNF = (value) => {
      const sanitizedValue = value.replace(/[^0-9-]/g, '');
      const parts = sanitizedValue.split('-');
      console.log(parts[0]?.length < 5);
      let formattedValue = '';

      if (parts.length < 5) {
        formattedValue = ''
      }
      else if (parts[0]?.length > 0) {
        formattedValue = '890-';
        if (parts[1]?.length > 0) formattedValue += parts[1].slice(0, 3);
        if (parts[1]?.length >= 3) formattedValue += '-';
        if (parts[2]?.length > 0) formattedValue += parts[2].slice(0, 3);
        if (parts[2]?.length >= 3) formattedValue += '-';
        if (parts[3]?.length > 0) formattedValue += parts[3].slice(0, 2);
        if (parts[3]?.length >= 2) formattedValue += '-';
        if (parts[4]?.length > 0) formattedValue += parts[4].slice(0, 3);
        if (parts[4]?.length < 3) formattedValue = '';
      }
      else{
        formattedValue = ''
      }
  
      return formattedValue;
    };
  
    return (
      <InputWrapper style={{ width }}>
        {label && <Label>{label}</Label>}
        <InputContainer>
          <StyledInput
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            hasError={touched && error}
            name={name}
          />
          {touched && error && <ErrorText error={error} />}
        </InputContainer>
      </InputWrapper>
    );
  };