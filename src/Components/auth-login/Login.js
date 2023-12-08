import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { useEffect, useState } from "react";

import bg from "../Assets/bg3.jpg";

import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { RiLoginCircleFill } from "react-icons/ri";

import { Alert } from "../Common";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loading) {
      if (password === "" || email === "") {
        if (email === "" && password === "") {
          setAlert("Fill out all fields");
        } else if (password === "") {
          setAlert("No Password");
        } else if (email === "") {
          setAlert("No email/username");
        }
      } else {
        const responseRaw = await fetch(
          "https://accredian-backend-task-ecru.vercel.app/api/login",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );

        const response = await responseRaw.json();

        if (response.msg.split("/")[0] !== "err") {
          //This alert can be replaced with a navigation of homepage if there is one
          window.alert(response.msg.split("/")[1]);
        } else {
          setAlert(response.msg.split("/")[1]);
        }
      }

      setLoading(false);
    }

    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  return (
    <div
      className="flex justify-center items-center w-screen h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <Box
        elevation={5}
        className="flex justify-between w-11/12 md:w-3/12 items-center gap-8 p-6  rounded-xl "
      >
        <Paper
          className="flex flex-col gap-3 p-4 w-full border-b-4 border-[#0525EF]"
          elevation={4}
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
          <Box className="flex justify-between">
            <Avatar
              sx={{
                bgcolor: "#0C1014",
              }}
            >
              <RiLoginCircleFill />
            </Avatar>
            <Typography variant="h4" className="text-right">
              Log In
            </Typography>
          </Box>
          <FormControl
            variant="form"
            className="flex flex-col items-center justify-center gap-4 w-full"
          >
            <TextField
              label="Username/E-mail"
              fullWidth
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              type="password"
              label="Password"
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              className="w-full"
            >
              <Link className="hover:underline" to={"/register"}>
                Register
              </Link>
              <button className="p-2 shadow-md hover:shadow-lg rounded-full transition-all border-b-2 border-blue-600">
                <FcGoogle size={25} />
              </button>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                  bgcolor: "#0C1014",
                  alignSelf: "flex-end",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ":hover": {
                    bgcolor: "#0C1014",
                  },
                }}
                onClick={handleLogin}
              >
                {loading ? <CircularProgress /> : "Complete"}
              </Button>
            </Box>
          </FormControl>
        </Paper>
      </Box>
    </div>
  );
}
