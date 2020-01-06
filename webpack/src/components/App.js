import React from "react";
import Chat from "./chat/Chat";

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
            <Chat />
        )
    }
}

function mapStateToProps(state) {
    return {
        // orderBooksData: state.orderBooksData,

    };
}

export default connect(mapStateToProps)(App);