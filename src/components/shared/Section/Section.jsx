import Box from 'components/shared/Box';
import Title from 'components/shared/Title/Title.styled';
import { PropTypes } from 'prop-types';
import theme from 'theme';

const Section = ({ title, titleVariant, titleAs, children }) => {
  return (
    <Box variant="container">
      <Box
        variant="section"
        as="section"
        backgroundColor="secondary"
        ml="auto"
        mr="auto"
        pl={[5]}
        pr={[5]}
        borderRadius={theme.radii.high}
        boxShadow={theme.shadow.high}
        mt={[6]}
        mb={[6]}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {title && (
          <Title variant={titleVariant} as={titleAs}>
            {title}
          </Title>
        )}
        {children}
      </Box>
    </Box>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
  titleVariant: PropTypes.string,
  titleAs: PropTypes.string,
};

export default Section;
