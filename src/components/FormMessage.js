import React from "react";
import PropTypes from "prop-types";

const errorClassName = "formMessageError";
const successClassName = "formMessageSuccess";

const FormMessage = ({ message, isError }) =>
  message.length ? (
    <p className={isError ? errorClassName : successClassName}>{message}</p>
  ) : null;

FormMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool
};

export default FormMessage;
