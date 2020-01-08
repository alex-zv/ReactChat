import React from "react";
import axios from "axios";
import {serializeData} from "../libs/Lib";


class Login extends React.Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            login: '',
            password: '',
            error: '',
        }
    }

    handleChange(e) {
        console.log(e.target.name);
        if (e.target.name === 'login') {

            this.setState({
                login: e.target.value
            })
        } else {
            this.setState({
                password: e.target.value
            })
        }
    }


    handleSubmit (e) {
        e.preventDefault();
        let requestData = {};

        requestData.login = this.state.login;
        requestData.password = this.state.password;
        axios({
            method: 'post',
            url: '/api/login.php',
            data: serializeData(requestData)
        }).then((response) => {
            if (!response.data.error) {

                this.props.loadHistoryData(response.data);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    validate() {

    }

    render () {

        let error = this.state.error ? <div className="text-danger">{this.state.error}</div> : '';

        return (
            <div className="form-container">
                <form action="#" onSubmit={this.handleSubmit} >
                    {error}
                    <div className="input-wrap">
                        <input type="text" name="login" onChange = {this.handleChange} />
                    </div>
                    <div className="input-wrap">
                        <input type="password" name="password" onChange = {this.handleChange} />
                    </div>
                    <div className="form-bottom">
                        <button className="btn-style" type="submit">Отправить</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;