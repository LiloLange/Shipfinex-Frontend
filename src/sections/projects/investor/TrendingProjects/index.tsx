import { useState } from 'react';

// material-ui
import { Grid, IconButton, Stack, Typography } from '@mui/material';

// project imports
import ProjectCard from '../ProjectCard';
import ProjectsTable from './ProjectsTable';

// assets
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

// project imports

// ==============================|| INVESTOR - PROJECTS ||============================== //

const TrnedingProjects = () => {
  const [form, setForm] = useState<boolean>(false);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Trending projects</Typography>
            <Stack direction="row" alignItems="center" spacing="2">
              <IconButton onClick={() => setForm(false)}>
                <UnorderedListOutlined style={{ color: form ? '#737677' : '#83F1AA', fontSize: '20px' }} />
              </IconButton>
              <IconButton onClick={() => setForm(true)}>
                <AppstoreOutlined style={{ color: !form ? '#737677' : '#83F1AA', fontSize: '20px' }} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        {!form && (
          <Grid item xs={12}>
            <ProjectsTable />
          </Grid>
        )}
        {form && (
          <>
            <Grid item xs={12} xl={3} lg={4} md={4} sm={6}>
              <ProjectCard />
            </Grid>
            <Grid item xs={12} xl={3} lg={4} md={4} sm={6}>
              <ProjectCard />
            </Grid>
            <Grid item xs={12} xl={3} lg={4} md={4} sm={6}>
              <ProjectCard />
            </Grid>
            <Grid item xs={12} xl={3} lg={4} md={4} sm={6}>
              <ProjectCard />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default TrnedingProjects;
