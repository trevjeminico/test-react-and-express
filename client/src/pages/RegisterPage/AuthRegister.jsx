import React, { useState } from "react";
import InputWrapper from "../../components/InputWrapper";
import PasswordChecklist from "react-password-checklist";
import { userLogin, userRegister } from "../../stores/authSlice";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export function AuthRegister() {
  const [errorForm, setErrorForm] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  document.title = "Task Management - Signup";
  const { isLoading } = useSelector((state) => state.auth);

  const handleKeyDown = () => {
    setErrorForm({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      name: userName,
      email: userEmail,
      password: userPassword,
      passwordIsValid: passwordValid,
    };

    dispatch(userRegister(params)).then((result) => {
      if (result?.error) {
        const { data } = result.payload;
        setErrorForm(data.errors);
      } else {
        dispatch(userLogin(params)).then((result) => {
          if (result.payload) {
            setUserEmail("");
            setUserPassword("");
            nav("/dashboard");
          }
        });
      }
    });
  };

  const formInputs = [
    { name: "name", type: "text", text: "Name", handler: setUserName },
    { name: "email", type: "email", text: "Email", handler: setUserEmail },
    {
      name: "password",
      type: "password",
      text: "Password",
      handler: setUserPassword,
    },
    {
      name: "password2",
      type: "password",
      text: "Confirm Password",
      handler: setConfirmPassword,
    },
  ];

  const buttonStyleExt = isLoading
    ? "border-blue-300 bg-blue-300 cursor-not-allowed"
    : "border-blue-500 bg-blue-500 hover:border-blue-600 hover:bg-blue-600 cursor-pointer";

  return (
    <div className="w-125 border-2 rounded-[5px] flex flex-wrap">
      <form
        className="flex flex-wrap flex-col justify-center m-[30px] items-center w-100"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <div className="border-2 rounded-full w-25 text-center">LOGO</div>
        {formInputs.map((value) => {
          return (
            <InputWrapper
              key={value.name}
              InputName={value.name}
              InputText={value.text}
              InputType={value.type}
              handleChange={value.handler}
              errorForm={errorForm}
            />
          );
        })}
        <div className="bg-gray-100 p-3.5 ml-auto mr-auto mb-3.5 w-full">
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={6}
            value={userPassword}
            valueAgain={confirmPassword}
            onChange={(isValid) => {
              setPasswordValid(isValid);
            }}
          />
        </div>
        <button
          className={`w-full px-6 py-3.5 text-base rounded-[5px]  text-white ${buttonStyleExt}`}
          disabled={isLoading}
        >
          {!isLoading ? "Register" : "Loading"}
        </button>
      </form>

      {errorForm?.length && (
        <div className="w-125 grid grid-cols-1 mx-11 px-2.5 mt-2.5 border border-amber-600">
          {errorForm.map((value, index) => {
            return (
              <span
                className="text-red-600 font-bold text-[12px] my-2.5"
                key={index}
              >
                <FontAwesomeIcon icon={faWarning} className="mr-2.5" />
                {value.err_msg}
              </span>
            );
          })}
        </div>
      )}
      <div className="flex justify-center w-full mt-[40px]">
        <p className="mb-3.5">
          have an account already?
          <Link
            to="/"
            className="text-blue-300 hover:underline hover:text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
