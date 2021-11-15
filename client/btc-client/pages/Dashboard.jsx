import {AppBar, Button, Toolbar,Card,Paper, Typography,MenuItem,InputLabel,FormControl,TextField,Select} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
//import {SendIcon} from '@material-ui/icons'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import {Logout} from './redux/actions'
import {deposit} from './apis/api'
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
//Top section with name and deposit button
const FirstSection=({user,modal})=>{
    return(
        <div className="row1">
                <div className="text-sec">
                <Typography variant='h5'>
                        @{user.username}
                    </Typography>
                </div>
                <div className="btn-sec">
                <Button
                className="btn"
                onClick={modal}
                    variant='contained'
                    color='primary' 
                    size='small'>
                      deposit
                    </Button>
                </div>
            </div>
    )
}
//plan section with name and upgrade button
const Plan=({plan, modal})=>{
    const choosePlan=()=>{

    }
    if(plan===null){
        
        return(
            <div className="plan-cover">
                <Card className="wrap">
                    <div className="p-text-wrap">
                        <Typography className='p-width' variant='h5'>
                            Plan:
                        </Typography>
                        <Typography className='p-width-1' variant='h5'>
                                No plan 
                        </Typography>
                    </div>
                    <div className="btn-c">

                    <Button className="btn" onClick={modal} variant='contained' color='secondary'>
                        Choose plan
    
                    </Button>
                    </div>
                </Card>
            </div>
        )
    }
    if(plan==='Gold'){
         
        return(
            <div className="plan-cover">
                <Card className="wrap">
                    <div className="p-text-wrap">
                        <Typography className='p-width' variant='h5'>
                            Plan:
                        </Typography>
                        <Typography className='p-width-1' variant='h5'>
                                {plan}
                        </Typography>
                    </div>
                    <div className="btn-c">

                        <Button className="btn" onClick={modal} variant='contained' color='secondary'>
                        Upgrade

                        </Button>
                    </div>
                </Card>
            </div>
        )
    }
    if(plan==='Diamond'){ 
        
        return(
            <div className="plan-cover">
                <Card className="wrap">
                    <div className="p-text-wrap">
                        <Typography className='p-width' variant='h5'>
                            Plan:
                        </Typography>
                        <Typography className='p-width-1' variant='h5'>
                                {plan}
                        </Typography>
                    </div>
                    <div className="btn-c">

                        <Button className="btn" onClick={modal} variant='contained' color='secondary' >
                                        Upgrade

                        </Button>
                    </div>
                </Card>
            </div>
        )
    }
    if(plan==='Platinum'){
        
        return(
            <div className="plan-cover">
                <Card className="wrap">
                    <div className="p-text-wrap">
                        <Typography className='p-width' variant='h5'>
                            Plan:
                        </Typography>
                        <Typography className='p-width-1' variant='h5'>
                                {plan}
                        </Typography>
                    </div>
                </Card>
            </div>
        )
    }
} 
//balance section with deposit button 

const Balance=({balance})=>{
    return(
        <div className="balance-cover">
            <Card className="wrap">
            <div className="p-text-wrap">
                        <Typography className='p-width-1' className='p-width' variant='h5'>
                            Bal:
                        </Typography>
                        <Typography variant='h5'>
                                ${balance}
                        </Typography>
                    </div>
            </Card>
        </div>
    )
}


//capital section with deposit button
const Capital=({capital})=>{
    return(
        <div className="balance-cover">
            <Card className="wrap">
            <div className="p-text-wrap">
                        <Typography className='p-width' variant='h5'>
                            Capital:
                        </Typography>
                        <Typography className='p-width-1' variant='h5'>
                                ${capital}
                        </Typography>
                    </div>
            </Card>
        </div>
    )
}

//deposit modal section with deposit button 
const Deposit=({balance,modal,removeModal,email} )=>{
    const bal=balance
    let depStatus;
    const [disable, setdisable] = useState(true)
    const [Text, setText] = useState("100-5000")
    const [statmessage, setstatmessage] = useState(`copy the USDT or alternatively the BTC address and make deposit before submiting your deposit request`)
    const [plan, setplan] = useState("Gold")
    const [disp, setdisp] = useState({display:'block',width:"100%"})
    const [capital, setcapital] = useState(0)
    const handleSelect=(event)=>{
            setplan(event.target.value)

    }
    
    
    const handleDeposit=(event)=>{
          let min= plan==="Gold"? 100:plan==="Diamond"?1000:plan==="Platinum"?5000:0
              let diff=min-bal
             let reText=event.target.value<diff?`less than min deposit $${min}`:event.target.value==null||event.target.value==''?"100-5000":min+"-5000"
             event.target.value<diff?setdisable(true):setdisable(false) 
             setcapital(event.target.value)
             console.log(capital)
             setText(reText);
    }
    const deposithandle=async ()=>{

        try{
            depStatus=await deposit({email,plan,capital})
            setstatmessage(depStatus.data)
        }catch(err){
                if(err){
                    console.log(err.message)
                }
        }
    }
    return(
        <>
        <div className="modal" onClick={removeModal} style={modal.modal}></div>
        <div className="deposit-cover" style={modal.deposit}>
        
                        <div className='disp'>

                                <Alert style={disp} severity='info'>{statmessage}</Alert>
                        </div>
                <div className="dep-card">
                    <div className="dep-row">
                        <FormControl style={{width:"100%"}}>
                        <InputLabel id="plan">plan</InputLabel>
                        <Select
                        id='plan'
                        value={plan} 
                        fullWidth
                        onChange={handleSelect}
                        >
                            <MenuItem value="Gold">Gold</MenuItem>
                            <MenuItem value="Diamond">Diamond</MenuItem>
                            <MenuItem value="Platinum">Platinum</MenuItem>
                        </Select>
                        </FormControl>
                        </div>
                     <div className="dep-row">
                <TextField type="number" margin='dense' required onChange={handleDeposit} label={Text} fullWidth variant='filled'/>
                </div>
                <div className="dep-row dep-btn">
                   <Button
                   onClick={removeModal}
                    variant='outlined'
                    color='primary' 
                    size='large'>
                        Cancel
                    </Button>
                   <Button
                    variant='contained'
                    color='primary'
                    onClick={deposithandle}
                    disabled={disable}
                    size='large'>
                        Send 
                    </Button>
                    
                </div>

                </div>
        </div>
        </>
    )
}
const Dashboard = () => {
    const dispatch=useDispatch()
    const router=useRouter()
    const users = useSelector(state => state.Reducer)
    let person1=users.user
    let person;
    if(person1){
        delete person1._id
        person={name:person1.name,username:person1.username,balance:person1.balance,capital:person1.capital,plan:person1.plan}
    }
    if(!person1) person={name:'',username:'',balance:'',capital:'',plan:null};
    const token=users.token
    const eachUser=users.users
    const isModal=false;
    const [user,setUser]=useState({
        name:person.name,
        username:person.username,
        balance:person.balance,
        capital:person.capital,
        plan:person.plan
    })
    const [modal, setmodal] = useState({
        zIndex:-5,
        position:"fixed",
        top:0,
        right:0,
        bottom:0,
        left:0,
        display:'none'
    })
    const [deposit, setdeposit] = useState({
        zIndex:-5,
        position:"fixed",
        top:"50%",
        left:0,
        marginLeft:"50%",
        transform:"translate("+"-50%"+","+"-50"+")",
        display:'none'
    })
    const handleModal=()=>{
        console.log(user)
        setmodal({
            zIndex:4,
        position:"fixed",
        top:0,
        right:0,
        bottom:0,
        left:0,
        display:'block'
    })
    setdeposit({
            zIndex:5,
            position:"fixed",
        top:"50%",
        left:0,
        marginLeft:"50%",
        transform:"translate("+"-50%"+","+"-50%"+")",
        display:'block'
        })
    }
    const removeModal=()=>{
        setmodal({
            zIndex:-4,
        position:"fixed",
        top:0,
        right:0,
        bottom:0,
        left:0,
        display:'none'
    })
    setdeposit({
            zIndex:-5,
            position:"fixed",
        top:'50%',
        left:'50%',
        marginLeft:"50%",
        transform:"translate("+"-50%"+","+"-50"+")",
        display:'none'
        })

    }
    const handleLogout=()=>{
        
         dispatch(Logout({}))
         router.push('/Signin')
    }
    useEffect(() => {
        console.log(user)
        setUser(person)
    }, [users])
    return (  
        <div className="dashboard-cover">
            <AppBar>

                    <Toolbar className='cov' >
                    <div className="dash-header">
                        <div className="logo">
                            <h1>K<span>Inv</span></h1>
                        </div>
                        <nav className='dash-nav'>
                            
                            <Button 
                            variant='contained'
                            size='medium'
                            onClick={handleLogout}
                            color='secondary'
                            style={{borderRadius:"5px 5px 5px 5px"}}
                            >
                            logout
                            </Button>            
                                    
                        </nav>
                        </div>
                    </Toolbar>
            </AppBar >
            <div className="body">
            <Paper elevation={2}>
                <div className="body-cover">
                        <FirstSection user={user} modal={handleModal} />
                        <Plan plan={user.plan} modal={handleModal}/>
                         <Capital capital={user.capital}/>
                        <Balance balance={user.balance}/>
                        
                <div className="sec-1">
                    
                </div>
                </div>
            </Paper>
                <Deposit email={person1.email} balance={user.balance} removeModal={removeModal} modal={{modal,deposit}}/>

            </div>
        </div>
    );
}

export default Dashboard;