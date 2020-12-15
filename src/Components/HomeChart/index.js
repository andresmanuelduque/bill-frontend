import React,{useState,useEffect} from 'react';
import { Table,Container,Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {listDteByFrequency} from "../../Services/DteService";
import {toast} from "react-toastify";
function HomeChart() {

    const [dtes,setDtes] = useState([]);

    useEffect(()=>{
        handleSendData();
    },[])

    const handleSendData = (page)=>{
        listDteByFrequency('daily')
            .then((res)=>{
                setDtes(res.data);
                toast.success("OK");
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }


    return (
        <Container className="themed-container">
            Grafica
        </Container>
    );
}

export default HomeChart;