import { CircularProgress, Paper } from "@material-ui/core";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Link from "next/link";
import { register } from "./apis/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SettingsBrightness } from "@material-ui/icons";
const Signup = () => {
  const [Reg, setReg] = useState("");
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const handleName = (event) => {
    setReg("");
    setUser({
      name: event.target.value,
      username: user.username,
      email: user.email,
      password: user.password,
    });
  };
  const handleUsername = (event) => {
    setReg("");
    setUser({
      name: user.name,
      username: event.target.value,
      email: user.email,
      password: user.password,
    });
  };
  const handleEmail = (event) => {
    setReg("");
    setUser({
      name: user.name,
      username: user.username,
      email: event.target.value,
      password: user.password,
    });
  };
  const handlePassword = (event) => {
    setReg("");
    setUser({
      name: user.name,
      username: user.username,
      email: user.email,
      password: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const status = await register(user);
      console.log(status.data);
      if (status.data.registered === true) {
        router.push("/Signin");
      } else {
        setLoader(false);
        setReg(status.data.message);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="form-container">
      <div className="logo">
        <Link href="/">
          <a>
            <h1>
              K<span>Inv</span>
            </h1>
          </a>
        </Link>
      </div>
      <form action="Signin" onSubmit={handleSubmit} className="form-cover">
        <Paper className="form-space" elevation={2}>
          <ThemeProvider theme={theme}>
            <Typography
              style={{ color: "orange", textAlign: "center" }}
              variant="h3"
            >
              Create account
            </Typography>
          </ThemeProvider>
          <Typography variant="p" color="secondary">
            {Reg}
          </Typography>
          <div className="row-1">
            <TextField
              type="text"
              onChange={handleName}
              required
              label="Name"
              margin="dense"
              variant="filled"
            />
            <TextField
              type="text"
              onChange={handleUsername}
              required
              label="username"
              variant="filled"
              margin="dense"
            />
          </div>
          <div className="row-2">
            <TextField
              type="text"
              onChange={handleEmail}
              required
              margin="dense"
              label="Email"
              fullWidth
              variant="filled"
            />
          </div>
          <div className="row-3">
            <TextField
              type="password"
              onChange={handlePassword}
              margin="dense"
              required
              label="password"
              fullWidth
              variant="filled"
            />
          </div>
          <div className="row-4">
            <Link href="/Signin">have an account?Sign in</Link>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ display: "block", width: "100%" }}
              disabled={
                user.name == "" ||
                user.password == "" ||
                user.username == "" ||
                user.email == ""
              }
              size="large"
            >
              Signup
              {loader && (
                <CircularProgress
                  style={{ color: "white", width: "15px", height: "15px" }}
                />
              )}
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
};

export default Signup;
