import {
  TextField,
  Typography,
  Box,
  Divider as MuiDivider,
  Slider as MuiSlider,
  Paper,
  Select,
} from '@mui/material';
import { styled } from '@mui/system';

export const Input = styled(TextField)`
  width: 250px;
`;

export const Subheading = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  color: ${(styles) => styles.theme.palette.text.primary};
`;

export const Form = styled('form')`
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  color: ${(styles) => styles.theme.palette.text.primary};
  gap: 8px;
  max-width: 1200px;
  width: 100%;
`;

export const Section = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  flex-direction: column;
  gap: 24px;
  & > div {
    flex-basis: 50%;
  }
`;

export const Divider = styled(MuiDivider)`
  margin: 32px 0;
`;

export const Slider = styled(MuiSlider)`
  max-width: 300px;
`;

export const SliderWrapper = styled(Box)`
  width: 100%;
  display: flex;
  gap: 24px;
  justify-content: center;
`;

export const FlexGroup = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  max-width: 400px;
`;

export const Options = styled(Box)`
  display: flex;
  flex-direction: row-reverse;
  gap: 16px;
  align-items: center;
`;

export const OptionsContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  border-radius: 12px;
  margin-top: 8px;
`;

export const Dropdown = styled(Select)`
  width: 250px;
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;
