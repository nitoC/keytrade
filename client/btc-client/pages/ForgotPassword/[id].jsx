import { CircularProgress, Paper } from "@material-ui/core";
import { Button, TextField, Typography } from "@material-ui/core";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { reset } from "../apis/api";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const ref = useRef();
  const [resetMessage, setresetMessage] = useState("");
  const router = useRouter();
  let status;
  const [response, setresponse] = useState("");
  const { id } = router.query;
  const [loader, setLoader] = useState(false);
  const [border, setborder] = useState({
    border: "2px solid #cccccc20",
  });
  const [pass, setpass] = useState({
    reEnter: "",
    password: "",
  });

  const handleReenter = (event) => {
    setpass({
      reEnter: event.target.value,
      password: pass.password,
    });
  };
  const handlePassword = (event) => {
    setpass({
      reEnter: pass.reEnter,
      password: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      status = await reset({ pass, id });
      console.log(status);
      if (status.data == "passwowrd changed successfully") {
        setresponse(status.data);
        console.log(status);
        router.push("/Signin");
      } else {
        setresponse(status.data);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (pass.password == pass.reEnter && pass.reEnter != "") {
      setresetMessage("");
      setborder({
        border: "2px solid #00ddcc40",
      });
    } else if (pass.password != pass.reEnter && pass.reEnter != "") {
      setborder({ border: "2px solid #dd000040" });
      console.log("fail");
      setresetMessage("password does not match");
    } else {
      setborder({ border: "2px solid #cccccc20" });
      setresetMessage("");
    }
  }, [pass, handleSubmit]);
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
          <Typography
            style={{ color: "orange", textAlign: "center" }}
            variant="h4"
          >
            Reset password
          </Typography>
          <Typography
            variant="p"
            color={
              response == "password changed successfully"
                ? "primary"
                : "secondary"
            }
          >
            {response}
          </Typography>
          <Typography variant="p" color="secondary">
            {resetMessage}
          </Typography>
          <div className="row-2">
            <TextField
              onChange={handlePassword}
              type="password"
              required
              margin="dense"
              label="password"
              fullWidth
              variant="filled"
            />
          </div>
          <div className="row-2">
            <TextField
              type="password"
              style={border}
              onChange={handleReenter}
              margin="dense"
              required
              label="re-enter password"
              fullWidth
              variant="filled"
            />
          </div>
          <div className="row-2">
            <Button
              variant="contained"
              type="submit"
              disabled={pass.reEnter == "" || pass.password == ""}
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
    </div>
  );
};

export default ForgotPassword;
