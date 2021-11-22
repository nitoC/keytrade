import { CircularProgress, Paper } from "@material-ui/core";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import Link from "next/link";
import { forgotPassword } from "./apis/api";
import { userFetch, message, rel } from "./redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
let reload = rel;

const ForgotPassword = ({ modal, removeModal, sendEmail }) => {
  const [mail, setmail] = useState("");
  const isModal = false;

  const handleMail = (event) => {
    console.log(sendEmail);
    setmail(event.target.value);
  };
  return (
    <>
      <div
        className="forgot-modal"
        onClick={removeModal}
        style={modal.modal}
      ></div>
      <div className="forgot-cover" style={modal.mailSt}>
        <Typography variant="h6" color="primary">
          please input registered Email
        </Typography>
        <div className="dep-card">
          <div className="dep-row">
            <TextField
              type="text"
              margin="dense"
              required
              fullWidth
              onChange={handleMail}
              label="Email"
              variant="filled"
            />
          </div>
          <div className="dep-row dep-btn">
            <Button
              variant="contained"
              color="primary"
              onClick={() => sendEmail(mail)}
              disabled={mail === null || mail === ""}
              size="large"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const Signin = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [Log, setLog] = useState({ message: "", color: "" });
  const users = useSelector((state) => state.Reducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [modal, setmodal] = useState({
    zIndex: -5,
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "none",
  });
  const [mailSt, setmailSt] = useState({
    zIndex: -5,
    position: "fixed",
    top: "50%",
    left: 0,
    marginLeft: "50%",
    transform: "translate(" + "-50%" + "," + "-50" + ")",
    display: "none",
  });
  const handleModal = () => {
    setmodal({
      zIndex: 4,
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "block",
    });
    setmailSt({
      zIndex: 5,
      position: "fixed",
      top: "50%",
      left: 0,
      marginLeft: "50%",
      transform: "translate(" + "-50%" + "," + "-50%" + ")",
      display: "block",
    });
  };
  const removeModal = () => {
    setmodal({
      zIndex: -4,
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "none",
    });
    setmailSt({
      zIndex: -5,
      position: "fixed",
      top: "50%",
      left: "50%",
      marginLeft: "50%",
      transform: "translate(" + "-50%" + "," + "-50" + ")",
      display: "none",
    });
  };
  const handleEmail = (event) => {
    setLog({
      message: "",
      color: "",
    });
    setUserLogin({
      email: event.target.value,
      password: userLogin.password,
    });
  };
  const handlePassword = (event) => {
    setLog({
      message: "",
      color: "",
    });
    setUserLogin({
      email: userLogin.email,
      password: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);

    // console.log(userLogin)
    try {
      await dispatch(userFetch(userLogin));
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const sendEmail = async (mail) => {
    console.log("hello");
    try {
      await forgotPassword({ email: mail });
    } catch (err) {
      if (err) console.log(err.message);
    }
  };
  useEffect(() => {
    if (message == 1 && loader == true && rel) {
      setLog({
        message: "no such user login",
        color: "secondary",
      });
      setLoader(false);
    }
    if (message == 2 && loader == true && rel) {
      setLoader(false);
      setLog({
        message: "wrong password",
        color: "secondary",
      });
    }
    if (users.token) {
      setLog({
        message: "success",
        color: "primary",
      });
      router.push("/Dashboard");
    }
    //console.log("helo")//router.push('/Dashboard')
  }, [handleSubmit, Log]);
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
      <form onSubmit={handleSubmit} className="form-cover">
        <Paper className="form-space" elevation={2}>
          <ThemeProvider theme={theme}>
            <Typography
              style={{ color: "orange", textAlign: "center" }}
              variant="h3"
            >
              Log in
            </Typography>
          </ThemeProvider>
          <Typography variant="subtitle1" color={Log.color}>
            {Log.message}
          </Typography>
          <div className="row-2">
            <TextField
              onChange={handleEmail}
              type="text"
              required
              margin="dense"
              label="Email"
              fullWidth
              variant="filled"
            />
          </div>
          <div className="row-2">
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
          <div className="row-2">
            <div className="for-o-i">
              <Link href="/Signup">
                <a style={{ padding: "4px" }}>no account?Register</a>
              </Link>
              <Button onClick={handleModal} style={{ padding: "4px" }}>
                forgot password?
              </Button>
            </div>
            <Button
              variant="contained"
              type="submit"
              disabled={userLogin.email == "" || userLogin.password == ""}
              color="primary"
              style={{ display: "block", width: "100%" }}
              size="large"
            >
              Sign in{" "}
              {loader && (
                <CircularProgress
                  style={{ color: "white", width: "15px", height: "15px" }}
                />
              )}
            </Button>
          </div>
        </Paper>
      </form>
      <ForgotPassword
        sendEmail={sendEmail}
        removeModal={removeModal}
        modal={{ modal, mailSt }}
      />
    </div>
  );
};

export default Signin;
