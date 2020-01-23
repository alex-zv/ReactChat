import React from "react";
import Chat from "./chat/Chat";

import axios from "axios";
import {connect} from "react-redux";
import Authorization from "./Auth/Authorization";
import {setLoginStatus} from "../actions";

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLogged: false,
        }
    }

    componentDidMount() {
        // check is loggedIn
        axios({
            method: 'post',
            url: '/api/is_auth.php',
            data: '',
        }).then((response) => {
            if (response.data) {
                this.props.setLoginStatus(true);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render () {
        return (
            <>
            { this.props.isLogged ?  <Chat /> : <Authorization/>}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.isLogged
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginStatus: (status) => dispatch(setLoginStatus(status))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);