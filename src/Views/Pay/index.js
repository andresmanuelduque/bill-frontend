import React,{useState,useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input,Container,Spinner } from 'reactstrap';
import {validateStringLength,validateOnlyNumber,validateNumberLength} from "../../Utils/Validation";
import { toast } from 'react-toastify';
import './style.css';
import {getDteByToken, payDte} from "../../Services/DteService";


function Pay({match}){

    const [dte,setDte] = useState();
    const [loading,setLoading] = useState();
    const [success,setSuccess] = useState(false);
    const [payData,setPayData] = useState({
        "buyerName":"",
        "buyerPhone":"",
        "buyerDocument":"",
        "token":""
    })

    const [payValidate,setPayValidate] = useState({
        "buyerName":1,
        "buyerPhone":1,
        "buyerDocument":1
    })

    const [allDataIsValid,setAllDataIsValid] = useState(false);

    useEffect(()=>{
        getDteByToken(match.params.token)
            .then((res)=>{
                if(res.data[0].status==="pending"){
                    setDte(res.data[0]);
                    handleInputModify('token',res.data[0].token)
                }else{
                    setDte(null);
                    toast.error("Esta factura ya ha sido pagada");
                }
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    },[])

    useEffect(()=>{
        setAllDataIsValid(validateAllData());
        console.log(payValidate);
    },[payValidate]);

    const handleInputModify = (name,value)=>{

        if(validateType(name,value)){
            setPayData(payData => ({...payData, [name]: value}));

            if(validateInput(name,value)){
                setPayValidate(payValidate=>({...payValidate,[name]:3}));
            }else{
                setPayValidate(payValidate=>({...payValidate,[name]:2}));
            }
        }
    }

    const validateInput = (name,value)=>{
        let isValid;
        switch (name) {
            case "buyerName": isValid = validateStringLength(value,3,50);break;
            case "buyerPhone": isValid = validateNumberLength(value,8,10);break;
            case "buyerDocument": isValid = validateNumberLength(value,6,12);break;
            case "token": isValid = (value.length === 32) ;break;
            default: isValid = false;
        }
        return isValid;
    }

    const validateType = (name,value)=>{
        let isValid;
        switch (name) {
            case "buyerPhone": isValid = validateOnlyNumber(value);break;
            case "buyerDocument": isValid = validateOnlyNumber(value);break;
            default: isValid = true;
        }
        return isValid;
    }

    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    })

    const handleSendData = ()=>{
        setLoading(true);
        payDte(payData)
            .then((res)=>{
                setLoading(false);
                toast.success(res.message);
                setDte(null);
                setSuccess(true);
            })
            .catch((err)=>{
                setLoading(false);
                toast.error(err.message);
            })
    }

    const validateAllData = ()=>{
        let isValid = true;

        for(const key in payValidate){
            if(payValidate[key] === 1 || payValidate[key] === 2 ){
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    return(

        (<Container className="theme-container form-container">
            {(dte) &&
            <Form>
                <h1>Pago de factura</h1>

                <FormGroup>
                    <h4>{dte.item_type} : {dte.item_name}</h4>
                    <h4>Monto a pagar : {formatter.format(dte.total_amount)}</h4>
                    <Label for="buyerName">Nombre</Label>
                    <Input
                        id="buyerName"
                        name="buyerName"
                        value={payData.buyerName}
                        invalid={payValidate.buyerName===2}
                        onChange={(e)=>handleInputModify('buyerName',e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="buyerPhone">Teléfono</Label>
                    <Input
                        id="buyerPhone"
                        name="buyerPhone"
                        value={payData.buyerPhone}
                        invalid={payValidate.buyerPhone===2}
                        onChange={(e)=>handleInputModify('buyerPhone',e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="buyerDocument">Documento</Label>
                    <Input
                        id="buyerDocument"
                        name="buyerDocument"
                        value={payData.buyerDocument}
                        invalid={payValidate.buyerDocument===2}
                        onChange={(e)=>handleInputModify('buyerDocument',e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button onClick={handleSendData} disabled={!allDataIsValid} color="primary">Pagar</Button>
                    {loading && <Spinner color="primary"/>}
                </FormGroup>

            </Form>}
            {success && (
                <h1>Gracias por su pago</h1>
            )}
        </Container>)


    );
}

export default Pay;