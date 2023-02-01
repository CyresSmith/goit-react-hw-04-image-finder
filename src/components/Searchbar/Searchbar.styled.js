import styled from 'styled-components';
import theme from 'theme';

export const Form = styled.form`
  position: relative;
  width: 300px;

  button {
    position: absolute;
    top: 4px;
    right: 4px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 36px;
  padding: ${theme.space[3]} ${theme.space[4]};
  font-size: ${theme.fontSizes.m};
  font-family: ${theme.fonts.body};
  border: 0;
  border-radius: 22px;
`;
