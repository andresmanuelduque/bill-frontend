import React,{useState,useEffect} from 'react';
import {Container, FormGroup, Label, Input, Row, Col, Button} from 'reactstrap';
import './style.css'
import {createDte} from "../../Services/DteService";
import {
    validateAlphanumericLength,
    validateEmail,
    validateNumberFloat,
    validateOnlyNumber,
    validateStringLength,
    validateNumberOrPoint,
    validateNumberRange,
    validateIsBoolean
} from "../../Utils/Validation";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

function DteForm() {

    let history = useHistory();

    const [taxes,setTaxes] = useState(0);
    const [discounts,setDiscounts] = useState(0);
    const [subtotalAmount,setSubtotalAmount] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0);
    const [allDataIsValid,setAllDataIsValid] = useState(false);

    const [dteData,setDteData] = useState({
        "email":"",
        "itemName":"",
        "itemDescription":"",
        "itemType":"",
        "itemAmount":0,
        "itemQuantity":1,
        "discountRate":0,
        "iva":true
    });

    const [dteValidate,setDteValidate] = useState({
        "email":1,
        "itemName":1,
        "itemDescription":3,
        "itemType":1,
        "itemAmount":1,
        "itemQuantity":3,
        "discountRate":3,
        "iva":3
    });

    useEffect(()=>{
        setAllDataIsValid(validateAllData());
        let newSubTotal = dteData.itemAmount*dteData.itemQuantity;
        let newDiscount = 0;
        let newTaxes = 0;
        let newTotal = newSubTotal;
        if(dteData.discountRate>0){
            newDiscount = (newTotal * (dteData.discountRate *0.01));
            newTotal -= newDiscount;
        }
        if(dteData.iva){
            newTaxes = newTotal * (process.env.REACT_APP_IVA_PERCENT * 0.01);
            newTotal += newTaxes
        }
        setSubtotalAmount(newSubTotal);
        setDiscounts(newDiscount);
        setTaxes(newTaxes);
        setTotalAmount(newTotal);
    },[dteData]);

    const validateAllData = ()=>{
        let isValid = true;

        for(const key in dteValidate){
            if(dteValidate[key] === 1 || dteValidate[key] === 2 ){
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    const handleInputModify = (name,value)=>{

        if(validateType(name,value)){
            setDteData(dteData => ({...dteData, [name]: value}));

            if(validateInput(name,value)){
                setDteValidate(dteValidate=>({...dteValidate,[name]:3}));
            }else{
                setDteValidate(dteValidate=>({...dteValidate,[name]:2}));
            }
        }
    }

    const validateInput = (name,value)=>{
        let isValid;
        switch (name) {
            case "email": isValid = validateEmail(value);break;
            case "itemName": isValid = validateAlphanumericLength(value,3,100);break;
            case "itemDescription": isValid = validateAlphanumericLength(value,3,500);break;
            case "itemType": isValid = validateStringLength(value,8,8);break;
            case "itemAmount": isValid = validateNumberFloat(value);break;
            case "itemQuantity": isValid = validateNumberFloat(value);break;
            case "discountRate": isValid = validateNumberRange(value,0,99);break;
            case "iva":isValid=validateIsBoolean(value);break;
            default: isValid = false;
        }
        return isValid;
    }

    const validateType = (name,value)=>{
        let isValid;
        switch (name) {
            case "itemAmount": isValid = validateNumberOrPoint(value);break;
            case "itemQuantity": isValid = validateNumberOrPoint(value);break;
            case "discountRate": isValid = validateOnlyNumber(value);break;
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
        createDte(dteData)
            .then((res)=>{
                toast.success(res.message);
                history.push('/home');
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }

    return (
        <Container className="theme-container">
            <Row>
                <legend>Información del comprador</legend>
            </Row>
            <Row>
                <Col xs="12">
                    <FormGroup>
                        <Label for="email">Correo del comprador</Label>
                        <Input
                            id="email"
                            name="email"
                            value={dteData.email}
                            invalid={dteValidate.email===2}
                            onChange={(e)=>handleInputModify('email',e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <legend>Información del producto o servicio</legend>
            </Row>
            <Row>
                <Col xs="6">
                    <FormGroup>
                        <Label for="email">Nombre</Label>
                        <Input
                            id="itemName"
                            name="itemName"
                            value={dteData.itemName}
                            invalid={dteValidate.itemName===2}
                            onChange={(e)=>handleInputModify('itemName',e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col xs="6">
                    <FormGroup>
                        <Label for="itemType">Tipo</Label>
                        <Input
                            type="select"
                            name="itemType"
                            id="itemType"
                            onChange={(e)=>handleInputModify('itemType',e.target.value)}
                        >
                            <option disabled selected >Seleccione...</option>
                            <option value="PRODUCTO">PRODUCTO</option>
                            <option value="SERVICIO">SERVICIO</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <FormGroup>
                        <Label for="itemDescription">Descripcción</Label>
                        <Input
                            type="textarea"
                            name="itemDescription"
                            id="itemDescription"
                            value={dteData.itemDescription}
                            invalid={dteValidate.itemDescription===2}
                            onChange={(e)=>handleInputModify('itemDescription',e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs="6">
                    <FormGroup>
                        <Label for="itemAmount">Precio {formatter.format(dteData.itemAmount)}</Label>
                        <Input
                            id="itemAmount"
                            name="itemAmount"
                            value={dteData.itemAmount}
                            invalid={dteValidate.itemAmount===2}
                            onChange={(e)=>handleInputModify('itemAmount',e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col xs="6">
                    <FormGroup>
                        <Label for="itemQuantity">Cantidad</Label>
                        <Input
                            id="itemQuantity"
                            name="itemQuantity"
                            value={dteData.itemQuantity}
                            invalid={dteValidate.itemQuantity===2}
                            onChange={(e)=>handleInputModify('itemQuantity',e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <legend>Descuentos e Impuestos</legend>
            </Row>
            <Row>
                <Col xs="4">
                    <FormGroup>
                        <Label for="discountRate">Descuento (%)</Label>
                        <Input
                            id="discountRate"
                            name="discountRate"
                            value={dteData.discountRate}
                            invalid={dteValidate.discountRate===2}
                            onChange={(e)=>handleInputModify('discountRate',e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row className="row-separator">
                <Col xs="4">
                    <FormGroup check>
                        <Label check>
                            <Input
                                onChange={(e)=>handleInputModify('iva',!dteData.iva)}
                                checked={dteData.iva}
                                type="checkbox" />{' '}
                            Aplicar IVA
                        </Label>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="row-totals">
                <div className="total-space-between">
                    <Label>Subtotal:</Label>
                    <Label>{formatter.format(subtotalAmount)} (+)</Label>
                </div>
                <div className="total-space-between">

                    <Label>Descuentos:</Label>
                    <Label>{formatter.format(discounts)} (-)</Label>
                </div>
                <div className="total-space-between">
                    <Label>Impuestos:</Label>
                    <Label>{formatter.format(taxes)} (+)</Label>
                </div>
                <div className="total-space-between">
                    <Label>Total:</Label>
                    <Label>{formatter.format(totalAmount)} (+)</Label>
                </div>
            </Row>
            <Row>
                <Col xs="12" className="col-items-center">
                    <Button onClick={handleSendData} disabled={!allDataIsValid} color="primary">Enviar</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DteForm;