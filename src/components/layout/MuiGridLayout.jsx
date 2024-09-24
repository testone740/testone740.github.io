import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography } from '@mui/material';
import FillHandleExample from '../reactGridv5/FillHandleExample';
import CutCopyPasteExample from '../reactGridv5/CutCopyPasteExample';

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
      {/* <Box sx={{ width: '50%', mx: 8 }} border={0}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <AntDesignGrid />
          </Grid>
          <Grid item xs={12}>
            <StepperWithColor />
          </Grid>
        </Grid>
      </Box> */}

      <Box sx={{ width: '600px', mx: 8 }} border={0}>
        <h1>React Grid v5-alpha Examples</h1>
        <pre>npm i @silevis/reactgrid@5.0.0-alpha.1</pre>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <h3>Cell Drag Drop</h3>
            <FillHandleExample />
          </Grid>
          {/* <Grid item xs={12}>
            <h3>Copy/Cut & Paste</h3>
            <CutCopyPasteExample />
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default MuiGridLayout;
