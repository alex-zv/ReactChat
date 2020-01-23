import React, { useState, useEffect } from "react";
import {connect} from "react-redux";

import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

function Authorization (props) {

    const [activeLoginTab, setActiveLoginTab] = useState(true);

    const navItemHandler = (event) => {
        event.preventDefault();
        setActiveLoginTab(!activeLoginTab);
    };

    return (
        <div className="authorization">

            <ul className="tab-nav">
                <li className={activeLoginTab ? 'active' : ''} onClick={navItemHandler}>
                    Login
                </li>
                <li className={!activeLoginTab ? 'active' : ''} onClick={navItemHandler}>
                    Reg
                </li>
            </ul>
            <div className="tab-content-wrap">
                {activeLoginTab ? <Login/> : <Registration />}
            </div>
        </div>
    )
}

export default Authorization;