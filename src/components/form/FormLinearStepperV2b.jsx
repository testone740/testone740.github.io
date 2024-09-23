import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
} from '@mui/material';

const options = {
  category1: ['Option 1-1', 'Option 1-2', 'Option 1-3'],
  category2: ['Option 2-1', 'Option 2-2', 'Option 2-3'],
};

const steps = ['Select a category', 'Choose an option', 'Save your selection'];

const FormLinearStepperV2 = () => {
  const { control, handleSubmit, watch } = useForm();
  const [activeStep, setActiveStep] = useState(0);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const category = watch('category');
  const autocompleteOptions = category ? options[category] || [] : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stepper
        activeStep={activeStep}
        orientation="horizontal"
        nonLinear
        sx={{ color: 'red' }}
      >
        <Step key="step1" completed={false} sx={{ color: 'red' }}>
          <StepLabel sx={{ color: 'red' }}>Select a category 123</StepLabel>
          <Box sx={{ mt: 1 }}>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} displayEmpty sx={{ width: 250 }}>
                  <MenuItem value="" disabled>
                    Select a category
                  </MenuItem>
                  <MenuItem value="category1">Category 1</MenuItem>
                  <MenuItem value="category2">Category 2</MenuItem>
                </Select>
              )}
            />
          </Box>
        </Step>
        <Step key="step2" completed={false}>
          <StepLabel>Choose an option</StepLabel>
          <Box sx={{ mt: 1 }}>
            <Controller
              name="option"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={autocompleteOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Choose an option" fullWidth />
                  )}
                  onChange={(event, value) => field.onChange(value)}
                />
              )}
            />
          </Box>
        </Step>
        <Step key="step3" completed={false}>
          <StepLabel>Save your work</StepLabel>
          <Box sx={{ mt: 1 }}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Step>
      </Stepper>
    </form>
  );
};

export default FormLinearStepperV2;
