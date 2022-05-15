import { Paper, styled } from '@mui/material';

export const SelectionBox = styled(Paper)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  text-align: center;
  padding: 16px;
  max-width: 300px;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.light};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;
