import React, { useState, useEffect } from 'react';
import { FormStepper, NavigationControls } from './FormStepper';
import { InputField, TextAreaField } from './Input';
import styled from 'styled-components'
import SelectField from './SelectField';
import ResetButton from './ResetButton';

const Cont = styled.div`
position: relative;
display: flex;
width: 100%;
justify-content: space-between;
@media screen and (max-width: 800px){
    flex-wrap: wrap;
    justify-content: center;
}
h1{
    max-width: 450px;
    line-height: 1.3;
    font-size: 35pt;
    font-weight: bold;

    @media screen and (max-width: 800px){
        font-size: 20pt;
        max-width: 100%;
    }
}
`



const SecondContColumn = styled.div`
width: 100%;
max-width: 45%;
display: flex;
flex-direction: column;
justify-content: space-between;
@media screen and (max-width: 800px){
    flex-wrap: wrap;
    max-width: 100%;
}
`


const FirstStage = ({ formData, onUpdateFormData, onNext, onPrev }) => {
    const [isValid, setIsValid] = useState(false);
    const [fields, setFields] = useState({
      projectName: formData.projectName || '',
      genre: formData.genre || '',
      format: formData.format || '',
      number: formData.number || '',
      country: formData.country || '',
      cost: formData.cost || '',
      sinopsis: formData.sinopsis || ''
    });
  
    const genres = [
      'Драма',
      'Комедия',
      'Боевик',
      'Триллер',
      'Документальный',
      'Анимация'
    ];
  
    const formats = [
      'Онлайн-платформа',
      'Большой экран',
      'Интернет',
      'Телевидение',
      'Другое'
    ];
  
    const countries = [
      'Россия',
      'Беларусь',
      'Казахстан',
      'Армения',
      'Китай',
    ];
  
    useEffect(() => {
      validateForm();
    }, [fields]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFields(prev => ({ ...prev, [name]: value }));
    };
  
    const validateForm = () => {
      const requiredFields = ['projectName', 'genre', 'format', 'country'];
      const isValid = requiredFields.every(field => fields[field].trim() !== '');
      setIsValid(isValid);
    };
  
    const handleNext = () => {
      onUpdateFormData(fields);
      onNext();
    };
  
    const handleReset = () => {
      setFields({
        projectName: '',
        genre: '',
        format: '',
        number: '',
        country: '',
        cost: '',
        sinopsis: ''
      });
      localStorage.removeItem('formData');
    };
  
    return (
      <>
        <Cont style={{ marginBottom: '90px' }}>
          <h1>Производственные параметры фильма</h1>
          <ResetButton onReset={handleReset} />
        </Cont>
  
        <Cont>
          <SecondContColumn>
            <InputField
              label="Название проекта"
              placeholder="Название"
              required={true}
              name="projectName"
              value={fields.projectName}
              onChange={handleChange}
            />
            <SelectField
            label="Жанр"
            placeholder="Выберите жанр"
            required={true}
            name="genre"
            value={fields.genre}
            onChange={handleChange}
            options={genres}
            />
            <SelectField
              label="Формат"
              placeholder="Выберите формат"
              required={true}
              name="format"
              value={fields.format}
              onChange={handleChange}
              as="select"
              options={formats}
            />
            <InputField
              label="№ УНФ или отсутствует"
              placeholder="890-000-000-00-000"
              name="number"
              value={fields.number}
              onChange={handleChange}
              isUNF={true}
            />
          </SecondContColumn>
  
          <SecondContColumn>
            <SelectField
              label="Страна-производитель"
              placeholder="Выберите страну"
              required={true}
              name="country"
              value={fields.country}
              onChange={handleChange}
              as="select"
              options={countries}
            />
            <InputField
              label="Сведения о сметной стоимости"
              placeholder="Введите сумму"
              name="cost"
              value={fields.cost}
              onChange={handleChange}
              type="number"
            />
            <TextAreaField
              label="Синопсис"
              placeholder="Напишите краткое изложение"
              name="sinopsis"
              value={fields.sinopsis}
              onChange={handleChange}
              height="120px"
            />
          </SecondContColumn>
        </Cont>
  
        <Cont style={{justifyContent: 'center', alignItems: 'center'}}>
          <FormStepper
            currentStep={1}
            totalSteps={4}
            onStepChange={() => {}}
          />
          <NavigationControls
            currentStep={1}
            totalSteps={4}
            onNext={handleNext}
            onPrev={onPrev}
            isValid={isValid}
          />
        </Cont>
      </>
    );
  };
  
  export default FirstStage;