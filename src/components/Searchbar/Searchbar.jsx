import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import Box from 'components/shared/Box';
import IconButton from 'components/shared/IconButton';
import theme from 'theme';
import { Form, Input } from './Searchbar.styled';
import propTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChanges = ({ target }) => {
    const { value } = target;
    setSearchQuery(value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
  };

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
            onChange={handleChanges}
            value={searchQuery}
            name="searchQuery"
            required
          />
          <IconButton
            className="searchButton"
            type="submit"
            icon={FaSearch}
            iconSize={12}
            disabled={searchQuery.length > 0 ? false : true}
            ariaLable="search button"
            round={true}
          ></IconButton>
        </Form>
      </Box>
    </Box>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
