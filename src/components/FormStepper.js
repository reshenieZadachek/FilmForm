import React from 'react';
import styled from 'styled-components';

const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 8px;
`;

const Step = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  color: black;
  border: ${props => props.active ? '1px solid #d9d9d9' : 'none'};
  
  &:hover {
    border-color: #1890ff;
  }
`;

const Dots = styled.div`
  margin: 0 8px;
  color: #d9d9d9;
`;

const NavigationButtons = styled.div`
  display: flex;
  position: absolute;
right: 10px;
top: 50%;
transform: translateY(-50%);
@media screen and (max-width: 800px){
    transform: translateY(0);
    width: 100%;
    justify-content: center;
    position: relative;
}
`;

const Button = styled.button`
width: 225px;
height: 50px;
border-radius: 25px;
font-size: 12pt;
font-family: "Inter Tight", sans-serif;

  padding: 8px 24px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background-color: #f5f5f5;
    color: #000;
    
    &:hover {
      background-color: #e8e8e8;
    }
  ` : `
    background-color: transparent;
    color: #000;
    border: 1px solid #d9d9d9;
    
    &:hover {
      border-color: #1890ff;
      color: #1890ff;
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      color: #000;
    }
  }
`;



export const FormStepper = ({ currentStep, totalSteps, onStepChange }) => {
    const renderSteps = () => {
      const steps = [];
      
      // Всегда показываем первый шаг
      steps.push(
        <Step key={1} active={currentStep === 1} onClick={() => onStepChange(1)}>
          1
        </Step>
      );
  
      // Если текущий шаг > 3, показываем многоточие после первого шага
      if (currentStep > 3) {
        steps.push(<Dots key="dots1">...</Dots>);
      }
  
      // Шаг перед текущим (если он существует и не является первым шагом)
      if (currentStep > 1 && currentStep - 1 > 1) {
        steps.push(
          <Step 
            key={currentStep - 1} 
            active={false} 
            onClick={() => onStepChange(currentStep - 1)}
          >
            {currentStep - 1}
          </Step>
        );
      }
  
      // Текущий шаг (если он не первый и не последний)
      if (currentStep !== 1 && currentStep !== totalSteps) {
        steps.push(
          <Step 
            key={currentStep} 
            active={true}
            onClick={() => onStepChange(currentStep)}
          >
            {currentStep}
          </Step>
        );
      }
  
      // Шаг после текущего (если он существует и не является последним)
      if (currentStep < totalSteps - 1) {
        steps.push(
          <Step 
            key={currentStep + 1} 
            active={false}
            onClick={() => onStepChange(currentStep + 1)}
          >
            {currentStep + 1}
          </Step>
        );
      }
  
      // Если после следующего шага есть ещё шаги до последнего
      if (currentStep < totalSteps - 2) {
        steps.push(<Dots key="dots2">...</Dots>);
      }
  
      // Последний шаг
      steps.push(
        <Step 
          key={totalSteps} 
          active={currentStep === totalSteps}
          onClick={() => onStepChange(totalSteps)}
        >
          {totalSteps}
        </Step>
      );
  
      return steps;
    };
  
    return <StepperWrapper>{renderSteps()}</StepperWrapper>;
  };

export const NavigationControls = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  isValid = true 
}) => {
  return (
    <NavigationButtons>
      {currentStep > 1 && (
        <Button onClick={onPrev}>
          Назад
        </Button>
      )}
      <Button
        primary
        onClick={onNext}
        disabled={!isValid}
      >
        {currentStep === totalSteps ? 'Завершить' : 'Следующий шаг'}
      </Button>
    </NavigationButtons>
  );
};