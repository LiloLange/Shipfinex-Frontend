// material-ui
import { Grid } from '@mui/material';

// project imports
import InvestmentSection from './InvestmentsSection';
import TrnedingProjects from './TrendingProjects';

// ==============================|| INVESTOR - PROJECTS ||============================== //

const ProjectsInvestorSection = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <InvestmentSection />
        </Grid>
        <Grid item xs={12}>
          <TrnedingProjects />
        </Grid>
        <Grid item xs={12}>
          <TrnedingProjects />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectsInvestorSection;
