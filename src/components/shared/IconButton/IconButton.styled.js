import styled from 'styled-components';
import theme from 'theme';

const StyledButton = styled('button')`
  display: inline-flex;
  padding: ${theme.space[3]};
  color: ${theme.colors.secondary};
  background-color: ${p =>
    p.disabled ? theme.colors.muted : theme.colors.accent};
  cursor: pointer;
  border: ${theme.borders.none};
  border-radius: ${p => (p.round ? theme.radii.round : theme.radii.normal)};

  box-shadow: ${theme.shadow.low};
  transition-property: all;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

  :disabled {
    pointer-events: none;
  }

  :hover:not(:disabled) {
    background-color: ${theme.colors.accent};
    box-shadow: ${theme.shadow.medium};
    scale: 1.1;
  }
`;

export default StyledButton;
