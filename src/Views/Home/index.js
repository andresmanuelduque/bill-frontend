import React from 'react';
import NavBar from "../../Components/NavBar";
import {Redirect, Route, Switch} from "react-router-dom";
import DteList from "../../Components/DteList";
import DteForm from "../../Components/DteForm";
import HomeChart from "../../Components/HomeChart";


function Home() {

    if(!localStorage.token){
           return <Redirect to="/"/>
    }

    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path="/home/dte/list" component={DteList} />
                <Route exact path="/home/dte/form" component={DteForm} />
                <Route path="/home" component={HomeChart} />
            </Switch>

        </>
    );
}

export default Home;