import {cleanUserInfo} from "./LocalStorage";
import {toast} from "react-toastify";


const HandleUnauthorized = ()=>{
    cleanUserInfo();
    toast.error("Sesion expirada");
    window.location ="/";
}

export {
    HandleUnauthorized
}