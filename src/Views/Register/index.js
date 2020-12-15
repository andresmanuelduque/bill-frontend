import React,{useState,useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input ,Spinner} from 'reactstrap';
import {validateEmail,validateStringLength,validateOnlyNumber,validateNumberLength,validateAlphanumericLength} from "../../Utils/Validation";
import {registerUser} from "../../Services/UserService";
import { toast } from 'react-toastify';
import {Redirect, useHistory} from "react-router-dom";
import './style.css';


function Register(){

    let history = useHistory();

    const [loading,setLoading] = useState(false);

    const [userData,setUserData] = useState({
        "firstName":"",
        "lastName":"",
        "phone":"",
        "document":"",
        "email":"",
        "password":"",
        "passwordConfirm":""
    })

    const [userValidate,setUserValidate] = useState({
        "firstName":1,
        "lastName":1,
        "phone":1,
        "document":1,
        "email":1,
        "password":1,
        "passwordConfirm":1
    })

    const [allDataIsValid,setAllDataIsValid] = useState(false);

    useEffect(()=>{
        setAllDataIsValid(validateAllData());
    },[userValidate]);

    const handleInputModify = (name,value)=>{

        if(validateType(name,value)){
            setUserData(userData => ({...userData, [name]: value}));

            if(validateInput(name,value)){
                setUserValidate(userValidate=>({...userValidate,[name]:3}));
            }else{
                setUserValidate(userValidate=>({...userValidate,[name]:2}));
            }
        }
    }

    const validateInput = (name,value)=>{
        let isValid;
        switch (name) {
            case "email": isValid = validateEmail(value);break;
            case "firstName": isValid = validateStringLength(value,3,50);break;
            case "lastName": isValid = validateStringLength(value,3,50);break;
            case "phone": isValid = validateNumberLength(value,8,10);break;
            case "document": isValid = validateNumberLength(value,6,12);break;
            case "password": isValid = validateAlphanumericLength(value,8,20);break;
            case "passwordConfirm": isValid = (userData.password===value);break;
            default: isValid = false;
        }
        return isValid;
    }

    const validateType = (name,value)=>{
        let isValid;
        switch (name) {
            case "phone": isValid = validateOnlyNumber(value);break;
            case "document": isValid = validateOnlyNumber(value);break;
            default: isValid = true;
        }
        return isValid;
    }

    const handleSendData = ()=>{
        setLoading(true);
        registerUser(userData)
            .then((res)=>{
                setLoading(true);
                toast.success(res.message);
                history.push('/');
            })
            .catch((err)=>{
                setLoading(false);
                toast.error(err.message);
            })
    }

    const validateAllData = ()=>{
        let isValid = true;

        for(const key in userValidate){
            if(userValidate[key] === 1 || userValidate[key] === 2 ){
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    if(localStorage.token){
        return <Redirect to="/home"/>
    }

    return(
        <div className="form-container">
            <Form>
                <h1>Registro de usuario</h1>
                <FormGroup>
                    <Label for="firstName">Nombre</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        invalid={userValidate.firstName===2}
                        onChange={(e)=>handleInputModify('firstName',e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Apellido</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        invalid={userValidate.lastName===2}
                        onChange={(e)=>handleInputModify('lastName',e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Teléfono</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        invalid={userValidate.phone===2}
                        onChange={(e)=>handleInputModify('phone',e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="document">Documento</Label>
                    <Input
                        id="document"
                        name="document"
                        value={userData.document}
                        invalid={userValidate.document===2}
                        onChange={(e)=>handleInputModify('document',e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Correo electrónico</Label>
                    <Input
                        id="email"
                        name="email"
                        value={userData.email}
                        invalid={userValidate.email===2}
                        onChange={(e)=>handleInputModify('email',e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Contraseña</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        invalid={userValidate.password===2}
                        onChange={(e)=>handleInputModify('password',e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="passwordConfirm">Confirmar contraseña</Label>
                    <Input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={userData.passwordConfirm}
                        invalid={userValidate.passwordConfirm===2}
                        onChange={(e)=>handleInputModify('passwordConfirm',e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button onClick={handleSendData} disabled={!allDataIsValid} color="primary">Enviar</Button>
                    {loading && <Spinner color="primary"/>}
                </FormGroup>

            </Form>
        </div>

    );
}

export default Register;