import styled from 'styled-components';
import theme from 'theme';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 300px;
  max-width: 1000px;
  width: 100%;
  padding: ${theme.space[4]};
  background-color: ${theme.colors.primary};
  border-radius: ${theme.radii.high};
  box-shadow: ${theme.shadow.high};

  button {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;
