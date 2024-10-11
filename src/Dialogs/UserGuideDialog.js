import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import steps from '../Navbar/steps';

const UserGuideDialog = ({ open, onClose, activeStep, setActiveStep }) => {
  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ position: 'relative' }}>
        User Guide: StartUp Vest
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ 
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#ED262A'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                onClick={() => handleStepClick(index)} 
                sx={{ 
                  cursor: 'pointer', 
                  color: activeStep === index ? '#336FB0' : 'inherit', 
                  '&:hover': {
                    color: '#336FB0',
                  },
                }}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {steps[activeStep]?.content}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserGuideDialog;
