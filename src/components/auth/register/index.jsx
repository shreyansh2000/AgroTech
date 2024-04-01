import React, { useState, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import {
  validatePassword,
  getColorForStrength,
  handleToggle,
} from "./passwordUtils"; // Importing functions from passwordUtils
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);
  const [strength, setStrength] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false); // State to manage whether to show password info or not

  const { userLoggedIn } = useAuth();

  useEffect(() => {
    const { strength, suggestions } = validatePassword(password);
    setStrength(strength);
    setSuggestions(suggestions);
  }, [password]);

  const handleToggle = (field) => {
    if (field === "password") {
      const newType = passwordType === "password" ? "text" : "password";
      setPasswordType(newType);
      setPasswordIcon(newType === "password" ? eyeOff : eye);
    } else if (field === "confirmPassword") {
      const newType = confirmPasswordType === "password" ? "text" : "password";
      setConfirmPasswordType(newType);
      setConfirmPasswordIcon(newType === "password" ? eyeOff : eye);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if the password strength is not 'Very Strong'
    if (strength !== "Very Strong") {
      setErrorMessage("Password strength is too weak, please try again!");
      setIsRegistering(false); // Reset the registering state if the check fails
      return; // Prevent form submission
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return; // Prevent form submission if passwords do not match
    }

    if (!isRegistering) {
      setIsRegistering(true);
      setErrorMessage(""); // Clear any previous error messages

      try {
        // Assuming doCreateUserWithEmailAndPassword and other sign-up logic are async operations
        await fetch(
          "https://tomatocrop-66f6d-default-rtdb.firebaseio.com/users.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
            }),
          }
        );
        await doCreateUserWithEmailAndPassword(email, password);
        // Navigate or handle success scenario
      } catch (error) {
        // Handle any errors that occur during the sign-up process
        setErrorMessage(error.message);
      } finally {
        setIsRegistering(false); // Reset the registering state after the operation
      }
    }
  };

  const [requirements, setRequirements] = useState({
    minLength: false,
    oneNumber: false,
    oneUpper: false,
    oneLower: false,
    oneSpecial: false,
  });

  useEffect(() => {
    const newRequirements = {
      minLength: password.length >= 8,
      oneNumber: /\d/.test(password),
      oneUpper: /[A-Z]/.test(password),
      oneLower: /[a-z]/.test(password),
      oneSpecial: /[^A-Za-z0-9]/.test(password),
    };
    setRequirements(newRequirements);
  }, [password]);

  const RequirementItem = ({ fulfilled, text }) => {
    return (
      <li style={{ color: fulfilled ? "green" : "red" }}>
        {fulfilled ? <span>✔</span> : <span>✖</span>} {text}
      </li>
    );
  };

  const renderRequirementItem = (condition, message) => {
    return (
      <li style={{ color: condition ? "green" : "red" }}>
        {condition ? "✔️" : "❌"} {message}
      </li>
    );
  };

  const requirementTexts = {
    minLength: "Password should be at least 8 characters long",
    oneNumber: "Add at least one number",
    oneUpper: "Include at least one uppercase letter",
    oneLower: "Include at least one lowercase letter",
    oneSpecial: "Include at least one special character",
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <img
        src="./assets/image.png"
        style={{
          height: 190,
          width: 190,
          borderRadius: 20,
          position: "relative",
          top: 90,
          left: 650,
          bottom: 200,
        }}
      />

      <main className="w-full h-screen flex place-content-center place-items-center">
        <div
          className="h-75% w-3/5 md:w-4/5 lg:w-3/5 xl:w-2/5 text-gray-600 space-y-5 p-8 shadow-xl border rounded-xl"
          style={{ borderColor: "#39B68D" }}
        >
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-gray-800 text-4xl font-semibold sm:text-2xl">
                Create a New Account
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-3xl text-gray-600 font-bold">
                Username
              </label>
              <input
                type="text"
                autoComplete="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="w-full mt-2 px-3 py-2 text-3xl text-gray-500 bg-transparent outline-none border focus:green-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>
            <div>
              <label className="text-3xl text-gray-600 font-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full mt-2 px-3 py-2 text-3xl text-gray-500 bg-transparent outline-none border focus:green-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div className="password-field-container">
              <label className="text-3xl text-gray-600 font-bold">
                Password
              </label>

              <div className="input-group">
                <input
                  type={passwordType}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setShowPasswordInfo(e.target.value.length > 0); // Show password info if password has any input
                  }}
                  className="form-control"
                />
                <span
                  className="input-group-addon"
                  onClick={() => handleToggle("password")}
                >
                  <Icon icon={passwordIcon} size={20} />
                </span>
              </div>

              {/* Displaying password requirements and strength only when there's input */}
              {showPasswordInfo && (
                <>
                  <div className="password-requirements">
                    {Object.keys(requirements).map((key) => (
                      <div
                        key={key}
                        className={
                          requirements[key]
                            ? "requirement-fulfilled"
                            : "requirement-unfulfilled"
                        }
                      >
                        {requirements[key] ? "✔ " : "✖ "}
                        {requirementTexts[key]}
                      </div>
                    ))}
                  </div>
                  {strength && (
                    <div className="text-xl text-gray-600">
                      Password Strength:{" "}
                      <span style={{ color: getColorForStrength(strength) }}>
                        {strength}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div>
              <label className="text-3xl text-gray-600 font-bold">
                Confirm Password
              </label>
              <input
                disabled={isRegistering}
                type={confirmPasswordType}
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="w-full mt-2 px-3 py-2 text-3xl text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg transition duration-300"
              />
              <span
                className="absolute text-3xl justify-around items-center"
                onClick={() =>
                  handleToggle(
                    "confirmPassword",
                    confirmPasswordType,
                    setConfirmPasswordType
                  )
                }
              >
                <Icon
                  className="absolute right-3 top-4 "
                  icon={confirmPasswordIcon}
                  size={20}
                />
              </span>
            </div>
            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full text-2xl px-4 py-2 text-white font-medium rounded-lg ${
                isRegistering
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:shadow-xl transition duration-300"
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="text-3xl text-center">
              Already have an account? {"   "}
              <Link
                to={"/login"}
                className="text-center text-3xl hover:underline font-bold"
              >
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
