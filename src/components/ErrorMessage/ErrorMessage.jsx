import PropTypes from 'prop-types';
import './ErrorMessage.css'

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="error">
      {message}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string, 
};

export default ErrorMessage;
