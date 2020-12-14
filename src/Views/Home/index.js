import React,{useState} from 'react';
import NavBar from "../../Components/NavBar";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import DteList from "../../Components/DteList";
import DteForm from "../../Components/DteForm";


function Home() {

    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path="/home/dte/list" component={DteList} />
                <Route exact path="/home/dte/form" component={DteForm} />
            </Switch>

        </>
    );
}

export default Home;