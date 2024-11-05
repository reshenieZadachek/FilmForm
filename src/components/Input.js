import React from 'react';
import styled from 'styled-components';
import { z } from 'zod';

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

// Создаем схему валидации для УНФ
const unfSchema = z.string().refine(
    (value) => {
      if (value === '') return true; // Разрешаем пустое значение
      return /^890-\d{3}-\d{3}-\d{2}-\d{3}$/.test(value);
    },
    {
      message: 'Формат: 890-XXX-XXX-XX-XXX'
    }
  );
  
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
    type = 'text',
    name,
    width = '100%',
    isUNF = false, // новый проп для определения поля УНФ
  }) => {
    const [error, setError] = React.useState('');
    const [touched, setTouched] = React.useState(false);
  
    const validateField = (value) => {
      if (isUNF) {
        try {
          unfSchema.parse(value);
          setError('');
          return true;
        } catch (err) {
          setError(err.errors[0].message);
          return false;
        }
      } else if (required && !value.trim()) {
        setError('Заполните поле');
        return false;
      }
      setError('');
      return true;
    };
  
    const handleChange = (e) => {
      // Если это поле УНФ, форматируем ввод
      if (isUNF) {
        const value = e.target.value.replace(/[^\d-]/g, '');
        const parts = value.split('-');
        let formattedValue = '';
  
        if (parts[0]?.length > 0) {
          formattedValue = '890-';
          if (parts[1]?.length > 0) formattedValue += parts[1].slice(0, 3);
          if (parts[1]?.length >= 3) formattedValue += '-';
          if (parts[2]?.length > 0) formattedValue += parts[2].slice(0, 3);
          if (parts[2]?.length >= 3) formattedValue += '-';
          if (parts[3]?.length > 0) formattedValue += parts[3].slice(0, 2);
          if (parts[3]?.length >= 2) formattedValue += '-';
          if (parts[4]?.length > 0) formattedValue += parts[4].slice(0, 3);
        }
  
        onChange({
          ...e,
          target: {
            ...e.target,
            value: formattedValue
          }
        });
      } else {
        onChange(e);
      }
  
      if (touched) {
        validateField(e.target.value);
      }
    };
  
    const handleBlur = () => {
      setTouched(true);
      validateField(value);
    };
  
    return (
      <InputWrapper style={{ width }}>
        {label && <Label>{label}</Label>}
        <InputContainer>
          <StyledInput
            type={type}
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