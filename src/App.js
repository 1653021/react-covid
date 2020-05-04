import React from 'react';
import { Switch, Route, Link, Redirect } from "react-router-dom";

import './App.css';
import CovidDashboard from "./components/CovidDashboard";
import Stats from './components/Stats'

export default function App() {
    return (
        <>
            <ul>
                <li>
                    <Link to="/map">Home</Link>
                </li>
                <li>
                    <Link to="/stats">Topics</Link>
                </li>
            </ul>

            <hr />

            <Switch>
                <Route exact path="/" render={() => (
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
