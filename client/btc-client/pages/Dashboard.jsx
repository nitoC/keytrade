import {
  AppBar,
  Button,
  Toolbar,
  Card,
  Paper,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Select,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
//import {SendIcon} from '@material-ui/icons'
import tawk from "tawkto-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Logout } from "./redux/actions";
import { deposit } from "./apis/api";
import { withdraw } from "./apis/api";
import { addressfunc } from "./apis/api";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
//Top section with name and deposit button
let depaddress = {};
const FirstSection = ({ user, modal }) => {
  return (
    <div className="row1">
      <div className="text-sec">
        <Typography variant="h5">@{user.username}</Typography>
      </div>

      <div className="btn-sec">
        <Button
          className="btn"
          onClick={modal.handleModal1}
          variant="outlined"
          color="primary"
          size="small"
        >
          withdraw
        </Button>
      </div>

      <div className="btn-sec">
        <Button
          className="btn"
          onClick={modal.handleModal}
          variant="contained"
          color="primary"
          size="small"
        >
          deposit
        </Button>
      </div>
    </div>
  );
};

//transaction section

const Transactions = ({ click, modal, user }) => {
  let trans;
  if (user.length > 0) {
    trans = user;
  } else {
    trans = [{ value: "", text: "" }];
  }
  return (
    <>
      <div
        className="wrapT"
        onClick={click.removetransactions}
        style={modal.modalT}
      ></div>
      <div className="wrap-transaction" style={modal.transactions}>
        <div className="trans">
          <h2 className="type">type</h2>
          <h2 className="amount-h">amount</h2>
          <h2 className="status-h">status</h2>
          <h2 className="time-h">time</h2>
        </div>
        {trans.map((a, b) => {
          return (
            <div className="trans" key={b}>
              <h3>{a.typeO}</h3>
              <p className="amount">{a.value}</p>
              <p className={a.text}>{a.text}</p>
              <p className="time">{a.time}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
//plan section with name and upgrade button
const Plan = ({ plan, modal }) => {
  if (plan === null || plan === "") {
    return (
      <div className="plan-cover">
        <Card className="wrap">
          <div className="p-text-wrap">
            <Typography className="p-width" variant="h5">
              Plan:
            </Typography>
            <Typography className="p-width-1" variant="h5">
              No plan
            </Typography>
          </div>
          <div className="btn-c">
            <Button
              className="btn"
              onClick={modal}
              variant="contained"
              color="secondary"
            >
              Choose plan
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  if (plan == "Gold") {
    return (
      <div className="plan-cover">
        <Card className="wrap">
          <div className="p-text-wrap">
            <Typography className="p-width" variant="h5">
              Plan:
            </Typography>
            <Typography className="p-width-1" variant="h5">
              {plan}
            </Typography>
          </div>
          <div className="btn-c">
            <Button
              className="btn"
              onClick={modal}
              variant="contained"
              color="secondary"
            >
              Upgrade
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  if (plan == "Diamond") {
    return (
      <div className="plan-cover">
        <Card className="wrap">
          <div className="p-text-wrap">
            <Typography className="p-width" variant="h5">
              Plan:
            </Typography>
            <Typography className="p-width-1" variant="h5">
              {plan}
            </Typography>
          </div>
          <div className="btn-c">
            <Button
              className="btn"
              onClick={modal}
              variant="contained"
              color="secondary"
            >
              Upgrade
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  if (plan == "Platinum") {
    return (
      <div className="plan-cover">
        <Card className="wrap">
          <div className="p-text-wrap">
            <Typography className="p-width" variant="h5">
              Plan:
            </Typography>
            <Typography className="p-width-1" variant="h5">
              {plan}
            </Typography>
          </div>
        </Card>
      </div>
    );
  }
  return null;
};
//balance section with deposit button

const Balance = ({ balance }) => {
  return (
    <div className="balance-cover">
      <Card className="wrap">
        <div className="p-text-wrap">
          <Typography className="p-width-1" className="p-width" variant="h5">
            Bal:
          </Typography>
          <Typography variant="h5">${balance}</Typography>
        </div>
      </Card>
    </div>
  );
};

//capital section with deposit button
const Capital = ({ capital }) => {
  return (
    <div className="balance-cover">
      <Card className="wrap">
        <div className="p-text-wrap">
          <Typography className="p-width" variant="h5">
            Capital:
          </Typography>
          <Typography className="p-width-1" variant="h5">
            ${capital}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

//withdraw modal section with withdraw button
const Withdrawal = ({ balance, modal, removeModal, email }) => {
  const bal = balance;
  let depStatus;
  const [disable, setdisable] = useState(true);
  const [balText, setbalText] = useState(`maxmimum ${bal}`);
  const [statmessage, setstatmessage] = useState(
    `withdrawal requests are usually processed  within 24 hours`
  );
  const [disp, setdisp] = useState({ display: "block", width: "100%" });
  const [amount, setamount] = useState("");
  const [address, setaddress] = useState("");

  const handleAddress = (event) => {
    setaddress(event.target.value);
  };
  const handleAmount = (event) => {
    let reText =
      event.target.value > bal ? `More than wallet balance $${bal}` : "";
    event.target.value > bal ? setdisable(true) : setdisable(false);
    setbalText(reText);
    setamount(event.target.value);
  };

  const withdrawhandle = async () => {
    try {
      depStatus = await withdraw({ email, amount, address });
      setstatmessage(depStatus.data);
    } catch (err) {
      if (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <>
      <div className="modal" onClick={removeModal} style={modal.modal1}></div>
      <div className="deposit-cover" style={modal.withdraw}>
        <div className="disp">
          <Alert style={disp} severity="info">
            {statmessage}
          </Alert>
        </div>
        <div className="dep-card">
          <div className="dep-row">
            <TextField
              type="text"
              margin="dense"
              required
              onChange={handleAddress}
              label="Enter USDT address"
              fullWidth
              variant="filled"
            />
          </div>
          <div className="dep-row">
            <TextField
              type="number"
              margin="dense"
              required
              onChange={handleAmount}
              label={balText}
              fullWidth
              variant="filled"
            />
          </div>
          <div className="dep-row dep-btn">
            <Button
              onClick={removeModal}
              variant="outlined"
              color="primary"
              size="large"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={withdrawhandle}
              disabled={disable}
              size="large"
            >
              withdraw
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
//deposit modal section with deposit button
const Deposit = ({ balance, modal, removeModal, email, address }) => {
  const bal = balance;
  let depStatus;
  const [disable, setdisable] = useState(true);
  const [Text, setText] = useState("100-5000");
  const [statmessage, setstatmessage] = useState(
    `copy the USDT or alternatively the BTC address and make deposit before submiting your deposit request`
  );
  const [plan, setplan] = useState("Gold");
  const [disp, setdisp] = useState({ display: "block", width: "100%" });
  const [capital, setcapital] = useState(0);
  const handleSelect = (event) => {
    setplan(event.target.value);
  };

  const handleDeposit = (event) => {
    let min =
      plan === "Gold"
        ? 100
        : plan === "Diamond"
        ? 1000
        : plan === "Platinum"
        ? 5000
        : 0;
    let diff = min - bal;
    let reText =
      event.target.value < diff
        ? `less than min deposit $${min}`
        : event.target.value == null || event.target.value == ""
        ? "100-5000"
        : min + "-5000";
    event.target.value < diff ? setdisable(true) : setdisable(false);
    setcapital(event.target.value);
    console.log(capital);
    setText(reText);
  };
  const deposithandle = async () => {
    try {
      depStatus = await deposit({ email, plan, capital, address });
      setstatmessage(depStatus.data);
    } catch (err) {
      if (err) {
        console.log(err.message);
      }
    }
  };
  const handleUsdt = () => {
    navigator.clipboard.writeText(address.usdt);
  };
  const handleBtc = () => {
    navigator.clipboard.writeText(address.btc);
  };
  return (
    <>
      <div className="modal" onClick={removeModal} style={modal.modal}></div>
      <div className="deposit-cover" style={modal.deposit}>
        <div className="disp">
          <Alert style={disp} severity="info">
            {statmessage}
          </Alert>
        </div>
        <div className="address">
          <h6>usdt address</h6>
          <p>{address.usdt}</p>
          <button onClick={handleUsdt}>copy</button>
        </div>
        <div className="address">
          <h6> btc address</h6> <p>{address.btc}</p>
          <button onClick={handleBtc}>copy</button>
        </div>
        <div className="dep-card">
          <div className="dep-row">
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="plan">plan</InputLabel>
              <Select id="plan" value={plan} fullWidth onChange={handleSelect}>
                <MenuItem value="Gold">Gold</MenuItem>
                <MenuItem value="Diamond">Diamond</MenuItem>
                <MenuItem value="Platinum">Platinum</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="dep-row">
            <TextField
              type="number"
              margin="dense"
              required
              onChange={handleDeposit}
              label={Text}
              fullWidth
              variant="filled"
            />
          </div>
          <div className="dep-row dep-btn">
            <Button
              onClick={removeModal}
              variant="outlined"
              color="primary"
              size="large"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={deposithandle}
              disabled={disable}
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
const Dashboard = () => {
  let interval;
  const tawkPid = "619a2ab96885f60a50bcca66";
  const tawkKey = "1fl13dpgg";

  const dispatch = useDispatch();
  const [address, setaddress] = useState({
    usdt: "",
    btc: "",
  });
  const router = useRouter();
  const users = useSelector((state) => state.Reducer);
  let person1 = users.user;
  let person;
  if (person1) {
    delete person1._id;
    person = {
      email: person1.email,
      name: person1.name,
      username: person1.username,
      balance: person1.balance,
      capital: person1.capital,
      plan: person1.plan,
    };
  }
  if (!person1)
    person = {
      name: "",
      username: "",
      balance: "",
      capital: "",
      plan: null,
      email: "",
    };
  const token = users.token;
  const eachUser = users.users;
  const isModal = false;
  const [user, setUser] = useState({
    name: person.name,
    username: person.username,
    balance: person.balance,
    capital: person.capital,
    plan: person.plan,
  });
  const [transactions, settransactions] = useState({
    zIndex: -5,
    position: "fixed",
    top: "70px",
    left: 0,
    marginLeft: "50%",
    transform: "translateX(" + "-50%" + ")",
    display: "none",
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
  const [modal1, setmodal1] = useState({
    zIndex: -5,
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "none",
  });
  const [modalT, setmodalT] = useState({
    zIndex: -5,
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "none",
  });
  const [deposit, setdeposit] = useState({
    zIndex: -5,
    position: "fixed",
    top: "50%",
    left: 0,
    marginLeft: "50%",
    transform: "translate(" + "-50%" + "," + "-50" + ")",
    display: "none",
  });
  const [withdraw, setwithdraw] = useState({
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
    setdeposit({
      zIndex: 5,
      position: "fixed",
      top: "50%",
      left: 0,
      marginLeft: "50%",
      transform: "translate(" + "-50%" + "," + "-50%" + ")",
      display: "block",
    });
  };
  const handleModal1 = () => {
    setmodal1({
      zIndex: 4,
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "block",
    });
    setwithdraw({
      zIndex: 5,
      position: "fixed",
      top: "50%",
      left: 0,
      marginLeft: "50%",
      transform: "translate(" + "-50%" + "," + "-50%" + ")",
      display: "block",
    });
  };
  const removeModal1 = () => {
    setmodal1({
      zIndex: -4,
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "none",
    });
    setwithdraw({
      zIndex: -5,
      position: "fixed",
      top: "50%",
      left: "50%",
      marginLeft: "50%",
      transform: "translate(" + "-50%" + "," + "-50" + ")",
      display: "none",
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
    setdeposit({
      zIndex: -5,
      position: "fixed",
      top: "50%",
      left: "50%",
      marginLeft: "50%",
      transform: "translate(" + "-50%" + "," + "-50" + ")",
      display: "none",
    });
  };

  //transactions modal
  const handleTransactions = () => {
    setmodalT({
      zIndex: 4,
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "block",
    });
    settransactions({
      zIndex: 5,
      position: "fixed",
      top: "90px",
      left: 0,
      marginLeft: "50%",
      transform: "translateX(" + "-50%" + ")",
      display: "block",
    });
  };
  const removetransactions = () => {
    setmodalT({
      zIndex: -4,
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "none",
    });
    settransactions({
      zIndex: -5,
      position: "fixed",
      top: "50%",
      left: "50%",
      marginLeft: "50%",
      transform: "translate(" + "-50%" + "," + "-50" + ")",
      display: "none",
    });
  };
  const handleLogout = (interval) => {
    console.log("intervalclear");
    dispatch(Logout({}));
    router.push("/Signin");
    return clearInterval(interval);
  };
  const addfunc = async () => {
    try {
      depaddress = await addressfunc();
      setaddress({
        usdt: depaddress.data.address.usdt,
        btc: depaddress.data.address.btc,
      });
    } catch (err) {
      if (err) console.log(err.message);
    }
  };
  useEffect(() => {
    if (users.token) {
      setUser(person);
    } else {
      router.push("/Signin");
    }
  }, [users]);

  useEffect(() => {
    addfunc();
    interval = setInterval(() => {
      console.log(users.time);
      if (users.time <= Date.now()) {
        console.log("unmounting");
      }
      return () => clearInterval(interval);
    }, 60000);
  }, []);
  useEffect(() => {
    tawk(tawkPid, tawkKey);
    return () => clearInterval(interval);
  }, [handleLogout]);
  return (
    <div className="dashboard-cover">
      <AppBar>
        <Toolbar className="cov">
          <div className="dash-header">
            <div className="logo">
              <h1>
                K<span>Inv</span>
              </h1>
            </div>
            <nav className="dash-nav">
              <div className="btn-sec">
                <Button
                  className="btn"
                  variant="outlined"
                  onClick={handleTransactions}
                  style={{ color: "white", border: "none" }}
                  size="small"
                >
                  transactions
                </Button>
              </div>
              <Button
                variant="contained"
                className="btn"
                size="medium"
                onClick={() => handleLogout(interval)}
                color="secondary"
                style={{ borderRadius: "5px 5px 5px 5px" }}
              >
                logout
              </Button>
            </nav>
          </div>
        </Toolbar>
      </AppBar>
      <div className="body">
        <Paper elevation={2}>
          <div className="body-cover">
            <FirstSection user={user} modal={{ handleModal, handleModal1 }} />
            <Plan plan={user.plan} modal={handleModal} />
            <Capital capital={user.capital} />
            <Balance balance={user.balance} />

            <div className="sec-1"></div>
          </div>
        </Paper>
        <Deposit
          email={person.email}
          balance={user.balance}
          removeModal={removeModal}
          modal={{ modal, deposit }}
          address={address}
        />
        <Withdrawal
          email={person.email}
          balance={user.balance}
          removeModal={removeModal1}
          modal={{ modal1, withdraw }}
        />
        <Transactions
          click={{ handleTransactions, removetransactions }}
          modal={{ modalT, transactions }}
          user={users.user.transactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
