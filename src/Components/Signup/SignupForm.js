import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineSwapRight,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BiSad } from "react-icons/bi";
import {
  Box,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import bg from "../Assets/bg3.jpg";
import { Alert } from "../Common";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleNext = () => {
    if (password === "" || email === "") {
      if (email === "") {
        setAlert("No E-mail/Username");
      }
      if (password === "") {
        setAlert("No Password");
      }
    } else {
      document.getElementById("sec_1").style.display = "none";
      document.getElementById("sec_2").style.display = "block";
    }

    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  const submitForm = async () => {
    if (password !== "" && email !== "" && username !== "" && !loading) {
      setLoading(true);

      const response_raw = await fetch("http://localhost:3001/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      const response = await response_raw.json();

      if (response.msg.split("/")[0] !== "err") {
        //This alert can be replaced with a navigation of profile page if there is one instead of navigating to login page
        window.alert(response.msg.split("/")[1]);

        navigate("/");
      } else {
        setAlert(response.msg.split("/")[1]);
      }

      setLoading(false);
    }

    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  return (
    <>
      <Box
        boxShadow={3}
        className="flex justify-center items-center h-screen"
        id="login_signup_sec"
        style={{
          background: `url(${bg})`,
        }}
      >
        <div className="flex-flex-col">
          <div className="container flex justify-center items-center h-96">
            <div className="form flex flex-col items-center justify-center">
              <Paper
                id="sec_1"
                className="flex flex-col items-center justify-center bg-white p-8 shadow-lg border-b-4 border-[#0525EF]"
                style={styles.section1}
              >
                {alert?.length > 0 && <Alert content={alert} />}

                <Typography
                  color={"#0525EF"}
                  fontWeight={"bold"}
                  fontSize={"2rem"}
                  textAlign={"center"}
                >
                  accredian
                </Typography>
                <TextField
                  type="email"
                  name=""
                  id="email"
                  label="E-mail/Username"
                  className="w-60 border-primary outline-none hover:shadow-sm hover:outline-none border-solid border-2 p-2 focus:border-0 focus:border-b-2"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="flex mt-4 items-center">
                  <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name=""
                    id="password"
                    className="w-60 border-primary outline-none hover:shadow-sm hover:outline-none border-solid border-2 p-2 w-6/3 focus:border-0 focus:border-b-2"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {showPassword ? (
                    <AiFillEye
                      className="cursor-pointer hover:text-primary text-gray-600 absolute ml-52"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      className="cursor-pointer hover:text-primary text-gray-600 absolute ml-52"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
                <button
                  className="group bg-gradient-to-tl from-primary via-70% to-text px-3 py-2 font-bold bg-black text-white mt-4 transition-all ease-in-out duration-200"
                  style={{
                    width: "100%",
                  }}
                  onClick={toggleNext}
                >
                  <div className="flex items-center justify-evenly">
                    Sign Up{" "}
                    <AiOutlineSwapRight
                      size={25}
                      className="group-hover:translate-x-4 transition-transform ease-in duration-200"
                    />
                  </div>
                </button>
                <button className="px-3 py-2 mt-4 w-60 flex shadow-md justify-around text-gray-700 font-sans text-sm items-center bg-white hover:shadow-lg transition-shadow duration-300">
                  <FcGoogle size={30} />
                  <p>Continue with Google</p>
                </button>
                <div className="flex items-center justify-center">
                  <Link
                    className="text-black px-3 py-2 underline-offset-2"
                    to={"/"}
                  >
                    Login
                  </Link>
                </div>
              </Paper>
              <Paper
                id="sec_2"
                className="flex flex-col items-center justify-center bg-white p-8 shadow-lg border-b-4 border-[#0525EF]"
                style={styles.section2}
              >
                {alert?.length > 0 && <Alert content={alert} />}
                <Typography
                  color={"#0525EF"}
                  fontWeight={"bold"}
                  fontSize={"2rem"}
                  textAlign={"center"}
                >
                  accredian
                </Typography>

                <div className="flex flex-col">
                  <TextField
                    type="text"
                    name=""
                    id=""
                    label="Create Username"
                    className="w-60 border-black outline-none hover:shadow-sm hover:outline-none border-solid border-2 p-2 focus:border-0 focus:border-b-2"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <button
                    onClick={submitForm}
                    className="w-60 bg-black px-3 py-2 font-bold text-white mt-4 hover:bg-white hover:text-black transition-all ease-in-out duration-200"
                  >
                    <div className="flex items-center justify-evenly">
                      {loading ? <CircularProgress /> : "Complete"}
                    </div>
                  </button>
                  <div className="flex w-60 justify-between">
                    <button
                      className="w-60 px-3 py-2"
                      onClick={() => {
                        setAlert("");

                        document.getElementById("sec_1").style.display =
                          "block";
                        document.getElementById("sec_2").style.display = "none";

                        setUsername("");
                      }}
                    >
                      <div className="flex items-center justify-evenly">
                        <FaLongArrowAltLeft />
                        Back
                      </div>
                    </button>
                    <button
                      className="group w-60 px-3 py-2"
                      onClick={() => {
                        setEmail("");
                        setPassword("");
                        setUsername("");
                        setAlert("");

                        document.getElementById("sec_1").style.display =
                          "block";
                        document.getElementById("sec_2").style.display = "none";
                      }}
                    >
                      <div className="flex items-center justify-evenly">
                        Cancel
                        <BiSad color="red" />
                      </div>
                    </button>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

const styles = {
  section1: {
    display: "block",
  },
  section2: {
    display: "none",
  },
};
