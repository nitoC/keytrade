import {login} from '../apis/api'
const USER='USER_DATA'
const LOG='LOGOUT_USER'
let message;
let rel;
export const userFetch=(payload)=>{
    false
    return async (dispatch)=>{
            try{
                     const {data}=await login(payload)
                     dispatch({type:USER,payload:data})
                     if(data.message)message=data.message
                     rel=true
                     console.log('dispatch success')
                    // console.log(data)
            }catch(error){
                    if(error)console.log(error)
            }
    }
}
const Logout=(payload)=>{
    return {
        type:LOG,
        payload,
    }
}
export{message,Logout,rel}