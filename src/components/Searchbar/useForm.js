const { useState } = require('react');

const useForm = onSubmit => {
  const [state, setState] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({});
  };

  return { state, setState, handleChange, handleSubmit };
};

export default useForm;
