import { Box, Typography } from '@mui/material';
import { ApartmentsForm } from 'components';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Mieszkania</title>
    </Head>
    <Box
      className="flex flex-col w-full justify-center items-center"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px',
      }}
    >
      <Typography variant="h1" sx={{ color: 'text.primary' }}>
        Zgłoszenie
      </Typography>
      <ApartmentsForm />
    </Box>
  </>
);

export default Home;
