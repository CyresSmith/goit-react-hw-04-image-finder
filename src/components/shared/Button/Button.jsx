import { PropTypes } from 'prop-types';
import { StyledButton, ButtonText } from './Button.styled';

const Button = ({
  starticon: StartIcon = null,
  endicon: EndIcon = null,
  iconSize,
  mt = null,
  mb = null,
  type = 'button',
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      mt={mt}
      mb={mb}
      onClick={onClick}
    >
      {StartIcon && <StartIcon size={iconSize} />}
      <ButtonText isIconThere={StartIcon || EndIcon}>{children}</ButtonText>
      {EndIcon && <EndIcon size={iconSize} />}
    </StyledButton>
  );
};

Button.propTypes = {
  starticon: PropTypes.func,
  endicon: PropTypes.func,
  mt: PropTypes.number,
  mb: PropTypes.number,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default Button;
