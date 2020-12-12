
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Views/Login";
import Register from "./Views/Register";
import Home from "./Views/Home";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                pauseOnHover
            />
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    {/*<Route path="/pay/:token" component={} exact/>*/}
                    <Route path="/home" component={Home} />
                </Switch>
            </Router>
        </>

    );
}

export default App;
