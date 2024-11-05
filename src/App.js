import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import FirstStage from './components/FirstStage';
import SecondStage from './components/SecondStage';
import ThirdStage from './components/ThirdStage';
import FourthStage from './components/FourthStage';
import ResetButton from './components/ResetButton';

const Container = styled.div`
  width: 100%;
  max-width: 1125px;
  margin: 0 auto;
  padding: 20px;
  overflow: hidden;
`;

const StageWrapper = styled(motion.div)`
  width: 100%;
`;
const Finally = styled.div`
  justify-content: center;
  width: 100%;
  height: 100%;
`

const pageVariants = {
  initial: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  })
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      projectName: '',
      genre: '',
      format: '',
      number: '',
      country: '',
      cost: '',
      sinopsis: ''
    };
  });

  useEffect(() => {
    const savedStep = localStorage.getItem('currentStep');
    if (savedStep) {
      setCurrentStep(Number(savedStep));
    }
  }, []);

  const handleUpdateFormData = (newData) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
  };

  const handleNext = () => {
    setDirection(1);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    localStorage.setItem('currentStep', nextStep);
  };

  const handlePrev = () => {
    setDirection(-1);
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    localStorage.setItem('currentStep', prevStep);
  };
  const handleReset = () => {
    setFormData({
      projectName: '',
      genre: '',
      format: '',
      number: '',
      country: '',
      cost: '',
      sinopsis: ''
    });
    localStorage.removeItem('formData');
    setCurrentStep(1)
  };
  return (
    <Container>
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <StageWrapper
          key={currentStep}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {currentStep === 1 && (
            <FirstStage
              formData={formData}
              onUpdateFormData={handleUpdateFormData}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
          {currentStep === 2 && (
            <SecondStage
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
          {currentStep === 3 && (
            <ThirdStage
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
          {currentStep === 4 && (
            <FourthStage
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
          {currentStep === 5 && (
            <Finally>
              <h1>
                Вы отправили форму.
              </h1>
              <div>
                Даные вашего фильма:
              </div>
              <div>
              {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
              </div>
              <ResetButton onReset={handleReset} />
            </Finally>
          )}
        </StageWrapper>
      </AnimatePresence>
    </Container>
  );
}

export default App;