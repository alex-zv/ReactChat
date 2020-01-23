import React from "react";
import axios from "axios";



import {serializeData} from "../../libs/Lib";
import {connect} from "react-redux";
import {setLoginStatus} from "../../actions";


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
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }


    handleSubmit (e) {
        e.preventDefault();

        this.setState({
            error: ''
        });

        let requestData = {};

        requestData.login = this.state.login;
        requestData.password = this.state.password;
        axios({
            method: 'post',
            url: '/api/login.php',
            data: serializeData(requestData)
        }).then((response) => {

            if (response.data.error) {
                //this.props.loadHistoryData(response.data);
                this.setState({
                    error: response.data.error
                })
            }
            if (response.data.success) {
                this.props.setLoginStatus(true);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    validate() {

    }

    render () {
        const error = this.state.error ? <div className="text-danger">{this.state.error}</div> : '';

        return (
            <div className="form-container">
                <div className="form-title">
                    Login form
                </div>
                <form action="#" onSubmit={this.handleSubmit} >
                    {error}
                    <div className="input-wrap">
                        <input type="text" name="login" autoComplete="off" placeholder="Login" onChange = {this.handleChange} />
                    </div>
                    <div className="input-wrap">
                        <input type="password" name="password" autoComplete="off" placeholder="Password" onChange = {this.handleChange} />
                    </div>
                    <div className="form-bottom">
                        <button className="btn-style" type="submit">Отправить</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginStatus: (status) => dispatch(setLoginStatus(status))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);