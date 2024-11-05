import React from 'react';
import { FormStepper, NavigationControls } from './FormStepper';
import styled from 'styled-components';

const Cont = styled.div`
position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ThirdStage = ({ onNext, onPrev }) => {
  return (
    <>
      <Cont style={{ marginBottom: '90px' }}>
        <h1>Третий этап</h1>
      </Cont>
      <Cont>
        <FormStepper
          currentStep={3}
          totalSteps={4}
          onStepChange={() => {}}
        />
        <NavigationControls
          currentStep={3}
          totalSteps={4}
          onNext={onNext}
          onPrev={onPrev}
          isValid={true}
        />
      </Cont>
    </>
  );
};

export default ThirdStage;