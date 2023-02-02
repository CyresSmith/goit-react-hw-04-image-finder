import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import ScrollUpButton from './ScrollUpBtn.styled';

const ScrollUpBtn = ({ icon: Icon = null, iconSize, round }) => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleScrollUpBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollUpButton
      type="button"
      aria-labelledby="scroll up button"
      round={round}
      onClick={handleScrollUpBtn}
      hidden={scroll < 300 ? true : false}
    >
      {Icon && <Icon size={iconSize} />}
    </ScrollUpButton>
  );
};

ScrollUpBtn.propTypes = {
  icon: PropTypes.func.isRequired,
  iconSize: PropTypes.number.isRequired,
  round: PropTypes.bool,
};

export default ScrollUpBtn;
