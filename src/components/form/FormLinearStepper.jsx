import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Box,
} from '@mui/material';

const steps = ['Input Text', 'Select Option'];

const FormComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <Controller
            name="inputText"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Input Text"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
        )}
        {activeStep === 1 && (
          <Controller
            name="selectOption"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                label="Select Option"
                variant="outlined"
                fullWidth
                margin="normal"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            )}
          />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default FormComponent;
