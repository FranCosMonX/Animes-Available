import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const whiteColor = "#ffffff";
const redColor = '#970707'

const defaultStyled = createTheme({
  palette: {
    primary: {
      main: whiteColor
    },
    secondary: {
      main: redColor
    },
    background: {
      default: redColor,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={defaultStyled}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
