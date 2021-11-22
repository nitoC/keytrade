//import Head from 'next/head'
//import Image from 'next/image'
import "../styles/Home.module.scss";
import tawk from "tawkto-react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Card,
  Fab,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
//import { AppBar } from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu";
import {
  CallMade,
  Forward,
  Person,
  PersonAddTwoTone,
  Timer,
  AlarmAddTwoTone,
  Facebook,
  Twitter,
  Instagram,
  Close,
} from "@material-ui/icons";
import { useState, useEffect } from "react";

const Home = () => {
  const tawkToPropertyId = "get_property_id_from_tawkto_dashboard";
  const tawkToKey = "get_key_from_tawkto_dashboard";
  const [modal, setmodal] = useState("modal");
  const [nav, setnav] = useState("nav");
  const [renav, setrenav] = useState("re-nav");
  const tawkPid = "619a2ab96885f60a50bcca66";
  const tawkKey = "1fl13dpgg";

  const handleNav = () => {
    setmodal("n-modal");
    setnav("n-nav");
  };
  const handleRenav = () => {
    setmodal("modal");
    setnav("nav");
  };

  return (
    <div className="wrapper">
      <div className="side-nav">
        <div onClick={handleRenav} className={modal}></div>
        <div className={nav}>
          <div className="icon">
            <IconButton onClick={handleRenav}>
              <Close />
            </IconButton>
          </div>
          <Link href="/About">
            <a>About us</a>
          </Link>
          <Link href="/Services">
            <a>Services</a>
          </Link>
          <Link href="#support">
            <a>Support</a>
          </Link>
          <div className="buttons">
            <div className="btn-1">
              <Link href="/Signin" passHref>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  style={{ width: "100px", borderRadius: "0px" }}
                >
                  login
                </Button>
              </Link>
            </div>
            <div className="btn-2">
              <Link href="/Signup" passHref>
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  style={{ width: "100px", borderRadius: "0px" }}
                >
                  signup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="contained">
        <header>
          <div className="app-cov">
            <div className="header appbar">
              <div className="logo">
                <h1>
                  K<span>Inv</span>
                </h1>
              </div>
              <Box className="nav-1">
                <div className="links">
                  <Link href="/About">
                    <a>About us</a>
                  </Link>
                  <Link href="/Services">
                    <a>Services</a>
                  </Link>
                  <Link href="#support">
                    <a>Support</a>
                  </Link>
                </div>
                <ButtonGroup>
                  <Link href="/Signin" passHref>
                    <Button
                      variant="contained"
                      size="medium"
                      color="secondary"
                      style={{ borderRadius: "5px 0px 0px 5px" }}
                    >
                      login
                    </Button>
                  </Link>
                  <Link href="/Signup" passHref>
                    <Button
                      variant="outlined"
                      size="medium"
                      color="secondary"
                      style={{ borderRadius: "0px 5px 5px 0px" }}
                    >
                      signup
                    </Button>
                  </Link>
                </ButtonGroup>
              </Box>
              <Box className="menu-icon">
                <IconButton
                  onClick={handleNav}
                  color="inherit"
                  fontSize="15px"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </div>
          </div>
        </header>
        <div className="description">
          <div className="keyword">
            <h1
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "top",
              }}
            >
              Key
              <span style={{ display: "inline-block" }}>
                Trade
                <br />
                Invenstment
              </span>
            </h1>
            <h3>
              We create the future. Cryptocurrency is the future of the global
              financial market. And now we are engaged in the extraction of one
              of the most valuable resources, which allows us to get maximum
              profits today.
            </h3>
            <div className="action-btn">
              <Link href="/Signup" passHref>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  endIcon={<Forward />}
                >
                  Get started
                </Button>
              </Link>
            </div>
          </div>
          <div className="desc-profit">
            <h1>20% to 40% profit each day</h1>
            <Link href="https://tawk.to/chat/619a2ab96885f60a50bcca66/1fl13dpgg">
              <Fab
                variant="extended"
                color="primary"
                style={{ position: "fixed", bottom: 70, right: 70, zIndex: 10 }}
              >
                chat
                <Person />
              </Fab>
            </Link>
          </div>
        </div>
      </div>
      <div className="about">
        <div className="about-container">
          <h1 className="l-headers">
            About <span>Us</span>
          </h1>
          <div className="about-desc">
            <div className="img"></div>
            <div className="about-letters">
              Our team of professional traders, economists, logistics
              specialists and IT specialists were united by a common idea.
              Having experience and possibilities of its realization, we have
              created an investment company, which in a short time was able to
              achieve success. We are constantly improving the methods of mining
              and trading the cryptocurrency at the exchange, closely following
              any fluctuations in rates and strive to ensure a stable income for
              each of our investors. Among other tasks, there is a constant and
              harmonious development of the project, which will allow to expand
              and increase the investment pool over time, upgrade the equipment
              and guarantee instant payments to all project participants.
            </div>
          </div>
        </div>
      </div>
      <div className="direction">
        <div className="about-container">
          <h1 className="l-headers">
            How to <span>get started</span>
          </h1>
          <div className="steps">
            <div className="step-img1"></div>
            <div className="step-text">
              <h2>Register and Sign in</h2>
            </div>
          </div>
          <div className="steps">
            <div className="step-text">
              <h2>Choose a plan</h2>
            </div>
            <div className="step-img2"></div>
          </div>
          <div className="steps">
            <div className="step-img3"></div>
            <div className="step-text">
              <h2>Make profit</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="plans">
        <div className="about-container">
          <h1 className="l-headers">
            Service <span>Plans</span>
          </h1>
          <div className="plan-desc">
            <div className="card">
              <Card elevation={3}>
                <div className="plan-letters">
                  <Typography variant="h4" color="secondary">
                    Gold
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Profit:{" "}
                  </Typography>
                  <Typography variant="h2" color="primary">
                    20%
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Min Deposit:{" "}
                  </Typography>
                  <Typography variant="h4" color="initial">
                    $100
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Duration of investment:{" "}
                  </Typography>
                  <Typography variant="h4" color="textSecondary">
                    48hrs
                  </Typography>
                </div>
              </Card>
            </div>
            <div className="card">
              <Card elevation={3}>
                <div className="plan-letters">
                  <Typography variant="h4" color="secondary">
                    Diamond
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Profit:{" "}
                  </Typography>
                  <Typography variant="h2" color="primary">
                    30%
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Min Deposit:{" "}
                  </Typography>
                  <Typography variant="h4" color="initial">
                    $1000
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Duration of investment:{" "}
                  </Typography>
                  <Typography variant="h4" color="textSecondary">
                    72hrs
                  </Typography>
                </div>
              </Card>
            </div>
            <div className="card">
              <Card elevation={3}>
                <div className="plan-letters">
                  <Typography variant="h4" color="secondary">
                    Platinum
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Profit:{" "}
                  </Typography>
                  <Typography variant="h2" color="primary">
                    45%
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Min Deposit:{" "}
                  </Typography>
                  <Typography variant="h4" color="initial">
                    $5000
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Duration of investment:{" "}
                  </Typography>
                  <Typography variant="h4" color="textSecondary">
                    96hrs
                  </Typography>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="us">
        <div className="about-container">
          <h1 className="l-headers">
            Why <span>Us</span>
          </h1>
          <div className="us-container">
            <div className="us-desc">
              <div className="us-img">
                <AlarmAddTwoTone
                  style={{ fontSize: "65px", textAlign: "center" }}
                  color="primary"
                />
              </div>
              <div className="us-letters">
                <h3>Stable Income</h3>
                <h4>
                  We work around the clock - this means that your money is
                  constantly in circulation and your profit grows every hour.
                </h4>
              </div>
            </div>
            <div className="us-desc">
              <div className="us-img">
                <CallMade
                  style={{ fontSize: "65px", textAlign: "center" }}
                  color="primary"
                />
              </div>
              <div className="us-letters">
                <h3>Instant Payment</h3>
                <h4>
                  Getting your profit is very simple - you make out an
                  application in your personal account and in a moment receive
                  money for your wallet.
                </h4>
              </div>
            </div>
            <div className="us-desc">
              <div className="us-img">
                <PersonAddTwoTone
                  style={{ fontSize: "65px", textAlign: "center" }}
                  color="primary"
                />
              </div>
              <div className="us-letters">
                <h3>Professional Team</h3>
                <h4>
                  We have many years of experience working on stock exchanges
                  and in the sphere of cryptocurrency mining – you can
                  completely entrust your investments to us.
                </h4>
              </div>
            </div>
            <div className="us-desc">
              <div className="us-img">
                <Timer
                  style={{ fontSize: "65px", textAlign: "center" }}
                  color="primary"
                />
              </div>
              <div className="us-letters">
                <h3>24/7 Support</h3>
                <h4>
                  Our managers are always ready to answer the questions you are
                  interested in - contact us in any convenient way and you will
                  receive the necessary information.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer" id="support">
        <div className="f-container">
          <div className="contact">
            <div className="logo">
              <h1>
                K<span>Inv</span>
              </h1>
            </div>
            <Typography variant="h4" color="secondary">
              Email:
            </Typography>
            <Typography variant="h5" className="font">
              supportkinvus@gmail.com
            </Typography>
            <div className="action-btn">
              <Link href="/Signup" passHref>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  endIcon={<Forward />}
                >
                  Get started
                </Button>
              </Link>
            </div>
          </div>
          <div className="p-system">
            <Typography variant="h5" color="secondary">
              Payment System
            </Typography>
            <Typography variant="h5" className="font">
              BITCOIN
            </Typography>
            <Typography variant="h5" className="font">
              USDT
            </Typography>
          </div>
          <div className="social">
            <Link href="www.facebook.com">
              <Facebook fontSize="large" />
            </Link>
            <Link href="www.twitter.com">
              <Twitter fontSize="large" />
            </Link>
            <Link href="www.instagram.com">
              <Instagram fontSize="large" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
