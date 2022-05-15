import type { AppProps } from 'next/app';
import {
  GlobalStyles,
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { useMemo } from 'react';
import 'styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#7d00dd',
          },
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        components: {
          MuiPaper: {
            defaultProps: {
              elevation: 2,
            },
          },
        },
        typography: {
          h1: {
            fontSize: '3rem',
            fontWeight: 'bold',
            '@media (min-width: 768px)': {
              fontSize: '4rem',
            },
            color: prefersDarkMode ? '#fff' : '#000',
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <StyledEngineProvider>
      <Toaster />
      <CssBaseline enableColorScheme />
      <GlobalStyles
        styles={{
          html: { colorScheme: prefersDarkMode ? 'dark' : 'light' },
          body: { backgroundColor: prefersDarkMode ? '#0e0e0e' : '#fff' },
        }}
      />
      <ThemeProvider theme={theme}>
        <GoogleReCaptchaProvider
          reCaptchaKey={
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
              ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
              : ''
          }
        >
          <Component {...pageProps} />
        </GoogleReCaptchaProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
