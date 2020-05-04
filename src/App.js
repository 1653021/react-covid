import React from 'react';
import { Switch, Route, Link, Redirect } from "react-router-dom";

import './App.css';
import CovidDashboard from "./components/CovidDashboard";
import Stats from './components/Stats/Stats'

export default function App() {
    return (
        <>
            <div className="wrap-router">
                <div className={ "link-map " }>
                    <Link to="/map" > Map </Link>
                </div>
                <div className={ "link-stats " }>
                    <Link to="/stats"> Stats </Link>
                </div>
            </div>

            <hr />

            <Switch>
                <Route exact path="/" render={() => (
                    <Redirect to="/map"/>
                )}/>
                <Route exact path="/react-covid" render={() => (
                    <Redirect to="/map"/>
                )}/>
                <Route exact path="/map">
                    <CovidDashboard />
                </Route>
                <Route path="/stats">
                    <Stats />
                </Route>
            </Switch>
        </>
    );
}
