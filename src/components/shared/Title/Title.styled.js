import styled from 'styled-components';
import {
  color,
  typography,
  space,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  variant,
} from 'styled-system';

import theme from 'theme';

// const Title = styled.h3`
//   text-align: center;
//   font-size: ${theme.fontSizes.xl};
//   font-weight: ${theme.fontWeights.bold};
//   color: ${theme.colors.accent};
//   margin-left: auto;
//   margin-right: auto;
// `;

const Title = styled('p')(
  color,
  typography,
  space,
  layout,
  border,
  position,

  variant({
    variants: {
      mainTitle: {
        textAlign: 'center',
        fontSize: theme.fontSizes.xl,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.accent,
        ml: 'auto',
        mr: 'auto',
      },

      subTitle: {
        textAlign: 'center',
        fontSize: theme.fontSizes.xl,
        fontWeight: theme.fontWeights.light,
        color: theme.colors.accent,
        ml: 'auto',
        mr: 'auto',
        mb: [5],
      },
    },
  })
);

export default Title;
