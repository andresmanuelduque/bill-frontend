import React,{useState,useEffect} from 'react';
import { Table,Container,Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {listDte} from "../../Services/DteService";
import {toast} from "react-toastify";
function DteList() {

    const [dtes,setDtes] = useState([]);
    const [totalPages,setTotalPages] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);

    useEffect(()=>{
        handleSendData(1);
    },[])

    const handleSendData = (page)=>{
        listDte(page)
            .then((res)=>{
                setDtes(res.data[0].data);
                setTotalPages(res.data[0].last_page);
                setCurrentPage(res.data[0].current_page);
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }

    const handlePagination = (page)=>{
        if(page<1)page=1;
        if(page>totalPages)page=totalPages;
        if(page!==currentPage){
            setDtes([]);
            handleSendData(page);
        }
    }

    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    })

    return (
        <Container className="themed-container">
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto/Servicio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                {dtes && dtes.map((dte)=>
                    (
                        <tr>
                            <th scope="row">{dte.id}</th>
                            <td>({dte.item_type==="PRODUCTO"?"P":"S"}) {dte.item_name}</td>
                            <td>{dte.item_qty}</td>
                            <td>{formatter.format(dte.total_amount)}</td>
                            <td>{dte.status==="pending"?"Pendiente":"Aprobado"}</td>
                        </tr>
                    )
                )}

                </tbody>
            </Table>
            {(dtes.length>0 && (
                <Pagination size="lg" aria-label="Page navigation example">
                    <PaginationItem>
                        <PaginationLink first onClick={()=>{handlePagination(1)}} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink previous onClick={()=>{handlePagination(currentPage-1)}} />
                    </PaginationItem>
                    {
                        [...Array(totalPages)].map((x, i) =>

                        <PaginationItem>
                            <PaginationLink onClick={()=>{handlePagination(i+1)}}>
                                {i+1}
                            </PaginationLink>
                        </PaginationItem>

                        )
                    }
                    <PaginationItem>
                        <PaginationLink next onClick={()=>{handlePagination(currentPage+1)}} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last onClick={()=>{handlePagination(totalPages)}} />
                    </PaginationItem>
                </Pagination>
            ))}

        </Container>
    );
}

export default DteList;