import styled from 'styled-components';
import theme from 'theme';

export const PhotoCard = styled.li`
  display: block;
  width: calc(((100% - (${theme.space[5]} * 2)) / 3));
  padding-bottom: ${theme.space[3]};
  border-radius: ${theme.radii.normal};
  background-color: ${theme.colors.primary};
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${theme.shadow.medium};
  transition-duration: 250ms;
  transition-property: all;
  transition-timing-function: ease-in-out;

  &:hover {
    scale: 1.1;
    box-shadow: ${theme.shadow.high};
  }
`;

export const Img = styled.img`
  display: block;
  width: 100%;
  height: 175px;
  object-fit: cover;
  margin-bottom: ${theme.space[3]};
`;

export const InfoItem = styled.p`
  font-size: ${theme.fontSizes.m}
  display: block;
  width: calc(100% / 2);
  text-align: left;
`;
