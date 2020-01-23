import React from "react";
import {connect} from "react-redux";

import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

class Authorization extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            activeLoginTab: true,
        };

        this.navItemHandler = this.navItemHandler.bind(this);
    }
    navItemHandler (event) {
        event.preventDefault();
        this.setState({
            activeLoginTab: !this.state.activeLoginTab
        })
    }
    render () {
        return (
            <div className="authorization">

                <ul className="tab-nav">
                    <li className={this.state.activeLoginTab ? 'active' : ''} onClick={this.navItemHandler}>
                        Login
                    </li>
                    <li className={!this.state.activeLoginTab ? 'active' : ''} onClick={this.navItemHandler}>
                       Reg
                    </li>
                </ul>
                <div className="tab-content-wrap">

                    {this.state.activeLoginTab ? <Login/> : <Registration />}

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // orderBooksData: state.orderBooksData,

    };
}

export default connect(mapStateToProps)(Authorization);