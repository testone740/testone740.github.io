import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Stack } from '@mui/material';
// import BasicReactGrid from '../reactGrid/BasicReactGrid';
import CustomReactGrid from '../reactGrid/CustomReactGrid';
import FormLinearStepper from '../form/FormLinearStepper';
import FormLinearStepperV2 from '../form/FormLinearStepperV2';
import FormLinearStepperV2b from '../form/FormLinearStepperV2b';
import CustomizedSteppers from '../form/CustomizedSteppers';
import StepperWithColor from '../form/StepperWithColor';
import AntDesignGrid from '../muiTable/AntDesignGrid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MuiGridLayout = () => {
  return (
    <>
      <h1>React & Material UI Examples</h1>
      <Box sx={{ width: '50%', mx: 8 }} border={0}>
        <Grid container spacing={8}>
          {/* <Grid item xs={12}>
            <FormLinearStepper />
          </Grid>
          <Grid item xs={12}>
            <FormLinearStepperV2 />
          </Grid> */}
          <Grid item xs={12}>
            <AntDesignGrid />
          </Grid>
          <Grid item xs={12}>
            <StepperWithColor />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '600px', m: 8 }} border={0}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <CustomReactGrid />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MuiGridLayout;
