import styled from 'styled-components';
import theme from 'theme';

const Gallery = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[5]};

  a:nth-child(n + 3) {
    margin-top: 40px;
  }
`;

export default Gallery;
