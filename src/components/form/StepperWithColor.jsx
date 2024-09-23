import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
  Box,
  MenuItem,
  TextField,
  Autocomplete,
} from '@mui/material';

const optionsMap = {
  Option1: ['Value1', 'Value2', 'Value3'],
  Option2: ['Value4', 'Value5', 'Value6'],
  Option3: ['Value7', 'Value8', 'Value9'],
};

const steps = ['Step 1', 'Step 2'];

const MyForm = () => {
  const { control, handleSubmit, watch } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const selectionValue = watch('selectionField');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted((prevCompleted) => ({
      ...prevCompleted,
      [activeStep]: true,
    }));
    if (activeStep === steps.length - 1) {
      // Handle final save action here
      console.log('Form Saved!');
    } else {
      handleNext();
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton
              color="inherit"
              onClick={handleStep(index)}
              sx={{
                '& .MuiStepLabel-root .Mui-completed': { color: 'red' }, // Completed step icon color
                '& .MuiStepLabel-root .Mui-active': { color: 'red' }, // Active step icon color
              }}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <Box sx={{ mt: 2 }}>
            <Controller
              name="selectionField"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField select label="Select Option" fullWidth {...field}>
                  {Object.keys(optionsMap).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box sx={{ mt: 2 }}>
            <Controller
              name="autocompleteField"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete
                  options={selectionValue ? optionsMap[selectionValue] : []}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Autocomplete Field"
                      fullWidth
                    />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleComplete}>
            {activeStep === steps.length - 1 ? 'Save' : 'Next'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MyForm;
