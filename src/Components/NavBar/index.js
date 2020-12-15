import React,{useState,useEffect} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {useHistory} from "react-router-dom";
import './style.css'
import {HandleUnauthorized} from "../../Utils/Authorization";
import {getBalance} from "../../Services/UserService";
import {toast} from "react-toastify";

function NavBar() {
    let history = useHistory();

    const [collapsed, setCollapsed] = useState(true);

    const [balance,setBalance] = useState(localStorage.balance)

    const toggleNavbar = () => setCollapsed(!collapsed);

    const handleSelectLink = (page)=>{
        toggleNavbar();
        switch(page){
            case "list":history.push('/home/dte/list');break;
            case "form":history.push('/home/dte/form');break;
            case "home":history.push('/home');break;
            case "logout":HandleUnauthorized();
        }
    }

    useEffect(()=>{
        updateBalance();
    },[])

    const updateBalance = ()=>{
        getBalance()
            .then((res)=>{
                localStorage.balance = res.data[0].balance
                setBalance(res.data[0].balance)
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }

    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    })

    return (
        <div>
            <Navbar color="faded" light>
                <NavbarBrand>Administrador de facturas</NavbarBrand>
                <NavbarBrand>Usuario : {localStorage.firstName} {localStorage.lastName}</NavbarBrand>
                <NavbarBrand>Saldo : {formatter.format(balance)}</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem className="pointer">
                            <NavLink className="nav-item" onClick={()=>handleSelectLink("home")}>Inicio</NavLink>
                        </NavItem>
                        <NavItem className="pointer">
                            <NavLink className="nav-item" onClick={()=>handleSelectLink("list")}>Facturas</NavLink>
                        </NavItem>
                        <NavItem className="pointer">
                            <NavLink onClick={()=>handleSelectLink("form")}>Crear nueva factura</NavLink>
                        </NavItem>
                        <NavItem className="pointer">
                            <NavLink onClick={()=>handleSelectLink("logout")}>Cerrar Sesion</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;