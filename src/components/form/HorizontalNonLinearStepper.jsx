import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
  TextField,
  Box,
  MenuItem,
  Autocomplete,
} from '@mui/material';

const steps = ['Step 1', 'Step 2', 'Step 3'];

const selectionOptions = [
  { value: 'category1', label: 'Category 1' },
  { value: 'category2', label: 'Category 2' },
];

const autocompleteOptions = {
  category1: [{ label: 'Option 1-1' }, { label: 'Option 1-2' }],
  category2: [{ label: 'Option 2-1' }, { label: 'Option 2-2' }],
};

const HorizontalNonLinearStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      selectionField: '',
      autocompleteField: null,
    },
  });

  const selectionField = watch('selectionField');

  const totalSteps = () => steps.length;

  const handleNext = () => {
    const newActiveStep = activeStep + 1 >= totalSteps() ? 0 : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <Controller
            name="selectionField"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Select Category"
                fullWidth
                margin="normal"
              >
                {selectionOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        )}
        {activeStep === 1 && (
          <Controller
            name="autocompleteField"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={autocompleteOptions[selectionField] || []}
                getOptionLabel={(option) => option.label}
                onChange={(_, data) => field.onChange(data)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Autocomplete Options"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            )}
          />
        )}
        {activeStep === 2 && (
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Typography>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
          ) : (
            <Button type="submit">Finish</Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button onClick={handleComplete}>
              {completed[activeStep] ? 'Complete Step' : 'Complete'}
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default HorizontalNonLinearStepper;
