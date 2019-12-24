import React from "react";

import axios from "axios";
import {connect} from "react-redux";

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLogged: true,
        }
    }
    render () {
        return (
            <React.Fragment>
                <div>
                    App Ready
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        // orderBooksData: state.orderBooksData,

    };
}

export default connect(mapStateToProps)(App);