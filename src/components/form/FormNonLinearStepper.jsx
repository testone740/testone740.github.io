import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Select,
  MenuItem,
  TextField,
  Autocomplete
} from '@mui/material';

const steps = [
  'Select a category',
  'Choose an option',
  'Save your selection'
];

const options = {
  category1: ['Option 1-1', 'Option 1-2', 'Option 1-3'],
  category2: ['Option 2-1', 'Option 2-2', 'Option 2-3'],
};

const MyFormComponent = () => {
  const { control, handleSubmit, watch } = useForm();
  const [activeStep, setActiveStep] = useState(0);

  const onSubmit = data => {
    console.log(data);
  };

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const category = watch('category');
  const autocompleteOptions = category ? options[category] || [] : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stepper activeStep={activeStep} orientation="horizontal" nonLinear>
        {steps.map((label, index) => (
          <Step key={label} completed={false}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {index === 0 && (
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} displayEmpty fullWidth>
                      <MenuItem value="" disabled>Select a category</MenuItem>
                      <MenuItem value="category1">Category 1</MenuItem>
                      <MenuItem value="category2">Category 2</MenuItem>
                    </Select>
                  )}
                />
              )}
              {index === 1 && (
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
              )}
              {index === 2 && (
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              )}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  style={{ marginRight: '8px' }}
                >
                  Back
                </Button>
                {index < steps.length - 1 && (
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                  </Button>
                )}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </form>
  );
};

export default MyFormComponent;
