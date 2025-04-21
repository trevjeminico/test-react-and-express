import React from "react";
import PropTypes from "prop-types";

function InputWrapper({
  disableInput,
  InputName,
  InputText,
  InputType,
  handleChange,
  errorForm,
}) {
  const disableInputStyle = disableInput ? "cursor-not-allowed" : "";
  let errResult = "";
  if (errorForm?.length) {
    errResult = errorForm?.find((err) => err.err_path === InputName);
  }
  const errorStyle = errResult?.err_msg ? "border-red-600" : "border-gray-200";
  const errorTextStyle = errResult?.err_msg ? "text-red-600" : "";
  return (
    <div className="flex flex-wrap flex-col m-[15px] w-full">
      <label htmlFor={InputName} className={`font-medium ${errorTextStyle}`}>
        {InputText} :
      </label>
      <input
        type={InputType}
        id={InputName}
        name={InputName}
        className={`border-1 p-2  ${disableInputStyle} ${errorStyle}`}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
}

InputWrapper.Proptypes = {
  errorForm: PropTypes.any,
  handleChange: PropTypes.func,
  InputName: PropTypes.string.required,
  InputText: PropTypes.string,
  InputType: PropTypes.string.required,
};

export default InputWrapper;
