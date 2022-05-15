import { Box, Typography } from '@mui/material';
import { SelectionBox } from 'components';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Formularze - mieszkania</title>
    </Head>
    <Box
      sx={{
        padding: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <Typography variant="h1">Formularze</Typography>
      <Box>
        <SelectionBox href={'/apartments-form/'}>
          <Typography sx={{ fontSize: '36px' }}>🏠</Typography>
          <Typography>Mieszkania</Typography>
        </SelectionBox>
      </Box>
    </Box>
  </>
);

export default Home;
