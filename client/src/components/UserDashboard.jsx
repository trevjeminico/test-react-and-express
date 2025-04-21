import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { getUser } from "../utilities/AuthValid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputWrapper from "./InputWrapper";
import {
  faUser,
  faEnvelope,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

import { userChangePassword } from "../stores/authSlice";
import { useDispatch } from "react-redux";
function RenderchangePassword({ closeForm }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [errorForm, setErrorForm] = useState({});
  const { uuid } = getUser();
  const dispatch = useDispatch();

  document.title = "Task Management - Dashboard";

  const handleChangePass = (e) => {
    e.preventDefault();

    const params = {
      uuid,
      oldPassword,
      newPassword,
      passwordValid,
    };

    dispatch(userChangePassword(params)).then((result) => {
      const hasError = !!result?.error;
      console.log(result);
      if (hasError) {
        const { data } = result.payload;
        setErrorForm(data.errors);
      } else {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordValid(false);
        closeForm(false);
      }
    });
  };

  const formInputs = [
    {
      name: "oldPassword",
      type: "password",
      text: "Old Password",
      handler: setOldPassword,
    },
    {
      name: "newPassword",
      type: "password",
      text: "New Password",
      handler: setNewPassword,
    },
    {
      name: "password2",
      type: "password",
      text: "Confirm Password",
      handler: setConfirmPassword,
    },
  ];

  const isLoading = false;

  const buttonStyleExt = isLoading
    ? "border-blue-300 bg-blue-300 cursor-not-allowed"
    : "border-blue-500 bg-blue-500 hover:border-blue-600 hover:bg-blue-600 cursor-pointer";
  return (
    <div className="w-[70%]">
      <h1 className="text-[18px]">Change Password:</h1>
      <form onSubmit={handleChangePass} className="shadow text-center">
        <div className="px-8 pt-6 pb-8 mb-4 flex flex-col my-2 text-left">
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
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
            </div>
            <div className="md:w-1/2 px-3">
              <div className="bg-gray-100 p-3.5 w-full text-left mx-2.5 mt-10">
                <PasswordChecklist
                  rules={[
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                    "match",
                  ]}
                  minLength={6}
                  value={newPassword}
                  valueAgain={confirmPassword}
                  onChange={(isValid) => {
                    setPasswordValid(isValid);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="basis-1/2">
            <button
              className={`w-50 px-6 py-3.5 my-5 text-base rounded-[5px]  text-white ${buttonStyleExt} `}
              disabled={isLoading}
            >
              {!isLoading ? (
                "Change"
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
          </div>

          <div className="basis-1/2">
            <div
              role={"button"}
              className={`w-50 px-6 py-3.5 my-5 text-base rounded-[5px] cursor-pointer hover:underline`}
              onClick={() => {
                closeForm(false);
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function UserDashboard() {
  const [showChangePassBtn, setShowChangePassBtn] = useState(false);
  const { name, email, date_joined } = getUser();
  const dateJoined = new Date(date_joined).toISOString().split("T")[0];
  return (
    <div className="ml-25 mr-25 mt-5 mb-5 flex justify-center">
      <section className="bg-white rounded-lg p-6 shadow-md space-y-6 w-full content-center  justify-center">
        <h1 className="text-[18px]">User Info:</h1>
        <div className="flex">
          <div className="basis-1/2">
            <div className="shadow flex rounded-tl-lg">
              <FontAwesomeIcon
                icon={faUser}
                className="bg-gray-200 py-2 px-2 w-5 border-r dark:border-gray-100"
              />
              <span className="my-1 mx-2.5"> Name: {name}</span>
            </div>
            <div className="shadow flex  rounded-bl-lg">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="bg-gray-200 w-5 py-2 px-2 border-r dark:border-gray-100"
              />
              <span className="my-1 mx-2.5"> E-mail: {email}</span>
            </div>
          </div>
          <div className="basis-1/2">
            <div className="shadow flex  rounded-tr-lg">
              <FontAwesomeIcon
                icon={faCalendar}
                className="bg-gray-200 w-5 py-2 px-2 border-r dark:border-gray-100"
              />
              <span className="my-1 mx-2.5"> Date Joined: {dateJoined}</span>
            </div>
            <div className="rounded-br-lg">
              {!showChangePassBtn && (
                <button
                  role="button"
                  className="shadow w-full py-1 px-1 cursor-pointer hover:underline hover:text-blue-500"
                  onClick={() => {
                    setShowChangePassBtn(true);
                  }}
                >
                  Change Password
                </button>
              )}
            </div>
          </div>
        </div>
        {showChangePassBtn && (
          <RenderchangePassword closeForm={setShowChangePassBtn} />
        )}
      </section>
    </div>
  );
}

export default UserDashboard;
