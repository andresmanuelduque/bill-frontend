import React,{useEffect,useState} from 'react';
import {Button, Form, FormGroup, Input, Label,Spinner} from "reactstrap";
import {
    validateAlphanumericLength,
    validateEmail
} from "../../Utils/Validation";
import "./style.css"

import {toast} from "react-toastify";
import {loginUser} from "../../Services/UserService";
import {Redirect, useHistory} from "react-router-dom";
import {setUserInfo} from "../../Utils/LocalStorage";

function Login() {

    let history = useHistory();

    const [loading,setLoading] = useState(false);
    const [credentialsData,setUserData] = useState({
        "email":"",
        "password":""
    })

    const [credentialsValidate,setCredentialsValidate] = useState({
        "email":1,
        "password":1
    })

    const [allDataIsValid,setAllDataIsValid] = useState(false);

    useEffect(()=>{
        setAllDataIsValid(validateAllData());
    },[credentialsValidate]);

    const handleInputModify = (name,value)=>{
        setUserData(userData => ({...credentialsData, [name]: value}));

        if(validateInput(name,value)){
            setCredentialsValidate(credentialsValidate=>({...credentialsValidate,[name]:3}));
        }else{
            setCredentialsValidate(credentialsValidate=>({...credentialsValidate,[name]:2}));
        }
    }

    const validateInput = (name,value)=>{
        let isValid;
        switch (name) {
            case "email": isValid = validateEmail(value);break;
            case "password": isValid = validateAlphanumericLength(value,8,20);break;
            default: isValid = false;
        }
        return isValid;
    }

    const validateAllData = ()=>{
        let isValid = true;

        for(const key in credentialsValidate){
            if(credentialsValidate[key] === 1 || credentialsValidate[key] === 2 ){
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    const handleSendData = ()=>{
        setLoading(true);
        loginUser(credentialsData)
            .then((res)=>{
                setLoading(false);
                toast.success(res.message);
                setUserInfo(res.data[0]);
                history.push('/home');
            })
            .catch((err)=>{
                setLoading(false);
                toast.error(err.message);
            })
    }

    if(localStorage.token){
        return <Redirect to="/home"/>
    }

    return(
        <div className="form-container">
            <Form>
                <h1>Login</h1>
                <FormGroup>
                    <Label for="email">Correo electr??nico</Label>
                    <Input
                        id="email"
                        name="email"
                        value={credentialsData.email}
                        invalid={credentialsValidate.email===2}
                        onChange={(e)=>handleInputModify('email',e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Contrase??a</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={credentialsData.password}
                        invalid={credentialsValidate.password===2}
                        onChange={(e)=>handleInputModify('password',e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="button-container">
                    <Button onClick={handleSendData} disabled={!allDataIsValid} color="primary">Enviar</Button>
                    {loading && <Spinner color="primary" />}
                    <a href="/register" color="info">Registrate</a>
                </FormGroup>

            </Form>
        </div>

    );
}

export default Login;