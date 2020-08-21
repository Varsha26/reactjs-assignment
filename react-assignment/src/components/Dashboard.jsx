import React from "react";
import {Nav } from "react-bootstrap";
import { Link, Route } from 'react-router-dom';
import Teams from "./Teams";
import About from "./About";
import Dash from "./Dash";
const Dashboard = () => {
    return (
        <>
        <div className="background col-lg-12 col-md-12">
            <div className="col-lg-3 col-md-3 ">
                <div className="col-lg-12 col-md-12  dashBoardContainer">
                    <h3>React Js</h3>
                    <h2>iJavaScript</h2>
                </div>
                <div className="col-lg-12 col-md-12  navItem">
                <Nav>
                    <div className="Nav__container">
                        <div className="Nav__right">
                        <ul className="Nav__item-wrapper">
                            <li className="Nav__item margin40">
                            <Link className="Nav__link" to="/dashboard/dash">Dashboard</Link>
                            </li>
                            <li className="Nav__item margin40">
                            <Link className="Nav__link" to="/dashboard/about">About</Link>
                            </li>
                            <li className="Nav__item margin40">
                            <Link className="Nav__link" to="/dashboard/teams">Teams</Link>
                            </li>
                        </ul>
                        </div>
                    </div>
                </Nav>
                </div>
            </div>
            <div className="col-lg-9 col-md-9 sideContent">
                <Route path="/dashboard/dash" component={Dash} />
                <Route path="/dashboard/about" component={About} />
                <Route path="/dashboard/teams" component={Teams} />
            </div>
        </div>
       </>
    )
}

export default Dashboard

