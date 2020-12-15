import React,{useState,useEffect} from 'react';
import { Container } from 'reactstrap';
import {listDteByFrequency} from "../../Services/DteService";
import {toast} from "react-toastify";
import {Line} from 'react-chartjs-2';
import './style.css'

function HomeChart() {

    const [dtes,setDtes] = useState([]);

    const chartOptions = {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Monto de la factura'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Hora'
                }
            }],
        }
    }
    const [chartData,setChartData] = useState({
        labels: [],
        datasets: []
    })

    useEffect(()=>{
        handleSendData();
    },[])

    useEffect(()=>{
        setChartData({
            labels: dtes.map(dte=>(dte.created_at.split("T")[1].split(".")[0])),
            datasets: [
                {
                    label: 'Facturas emitidas el dia de hoy',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dtes.map(dte=>(dte.total_amount))
                }
            ]
        })
    },[dtes]);

    const handleSendData = (page)=>{
        listDteByFrequency('daily')
            .then((res)=>{
                setDtes(res.data);
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }

    return (
        <Container className="themed-container chart-container">
            <Line options={chartOptions} data={chartData} />
        </Container>
    );
}

export default HomeChart;