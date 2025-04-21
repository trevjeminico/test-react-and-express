import React, { useState } from "react";
import InputWrapper from "../../components/InputWrapper";
import { userLogin } from "../../stores/authSlice";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export function AuthLogin() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorForm, setErrorForm] = useState({});
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  document.title = "Task Management - Login";

  const handleKeyDown = () => {
    setErrorForm({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      email: userEmail,
      password: userPassword,
    };

    dispatch(userLogin(params)).then((result) => {
      if (result?.error) {
        console.log(result);
        const { data } = result.payload;
        setErrorForm(data.errors);
      } else {
        nav("/dashboard");
      }
    });
  };

  const formInputs = [
    {
      name: "email",
      type: "email",
      text: "Email",
      handler: setUserEmail,
    },
    {
      name: "password",
      type: "password",
      text: "Password",
      handler: setUserPassword,
    },
  ];

  const buttonStyleExt = isLoading
    ? "border-blue-300 bg-blue-300 cursor-not-allowed"
    : "border-blue-500 bg-blue-500 hover:border-blue-600 hover:bg-blue-600 cursor-pointer";

  return (
    <div className="w-125 border-2 rounded-[5px] flex flex-wrap">
      <form
        className="flex flex-wrap flex-col justify-center mx-[30px] mt-[30px] items-center w-100"
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

        <button
          className={`w-full px-6 py-3.5 text-base rounded-[5px]  text-white ${buttonStyleExt}`}
          disabled={isLoading}
        >
          {!isLoading ? (
            "Login"
          ) : (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
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
          No Account yet?
          <Link
            to="/register"
            className="text-blue-300 hover:underline hover:text-blue-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
