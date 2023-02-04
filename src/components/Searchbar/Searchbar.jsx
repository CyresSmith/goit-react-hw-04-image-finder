import propTypes from 'prop-types';
import { memo } from 'react';
import { FaSearch } from 'react-icons/fa';

import Box from 'components/shared/Box';
import IconButton from 'components/shared/IconButton';
import theme from 'theme';
import { Form, Input } from './Searchbar.styled';
import useForm from './useForm';

const Searchbar = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit } = useForm(onSubmit);

  return (
    <Box
      as="header"
      backgroundColor="secondary"
      ml="auto"
      mr="auto"
      pt={[5]}
      pb={[5]}
      boxShadow={theme.shadow.high}
    >
      <Box variant="container" display="flex" justifyContent="center">
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            value={state.query ? state.query : ''}
            name="query"
            required
          />
          <IconButton
            className="searchButton"
            type="submit"
            icon={FaSearch}
            iconSize={12}
            disabled={state.query?.length > 0 ? false : true}
            ariaLable="search button"
            round={true}
          ></IconButton>
        </Form>
      </Box>
    </Box>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
