import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {getHistoryData, sendMessage} from "../../actions/index";
import {Preloader} from "../shared/Preloader";

const History = React.lazy(() => import('./History'));
const UserList = React.lazy(() => import('./UserList'));

class Chat extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isUsersShow: false,
            message: '',
        };

        this.showUsersBtnHandler = this.showUsersBtnHandler.bind(this);
        this.sendBtnHandler = this.sendBtnHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
        this.props.getHistoryData(this.props.chatId);

        this.updateTimer = setInterval(() => {
            this.props.getHistoryData(this.props.chatId);
        }, 3000)
    }
    componentWillUnmount() {
        clearTimeout(this.updateTimer);
    }

    sendBtnHandler () {
        //console.log(this);
        if (this.state.message.length > 0) {
            this.props.sendMessage(this.state.message).then((data) => {
                this.setState({
                    message: ''
                });
                this.props.getHistoryData(this.props.chatId);
            });
        }
    }

    handleChange (e) {
        let value = e.target.value;
        this.setState({
            message: value
        })
    }


    showUsersBtnHandler () {
        this.setState({
            isUsersShow: !this.state.isUsersShow
        })
    }

    render () {

        const {isUsersShow} = this.state;
        const {isGettingHistory, gettingHistoryDataError} = this.props;

        return (
            <div className="chat">
                <div className="chat-wrapper">
                    <div className={"sidebar users-container" + (isUsersShow ? ' opened' : '')}>

                        <React.Suspense fallback={<Preloader/>}>
                            <UserList />
                        </React.Suspense>
                    </div>
                    <div className="chat-top-panel">
                        <div className="menu-btn" onClick={this.showUsersBtnHandler}>
                            Menu btn
                        </div>
                    </div>
                    <div className="chat-main">

                        {isGettingHistory && <Preloader/>}

                        {!!gettingHistoryDataError.length && <div className="text-danger"> {gettingHistoryDataError} </div>}

                        <React.Suspense fallback={<Preloader/>}>
                            <History />
                        </React.Suspense>


                        <div className="bottom-panel">
                            <div className="bottom-panel__left">
                                <div className="btn btn-attachment">
                                    F
                                </div>
                            </div>
                            <div className="bottom-panel__middle">
                                <textarea placeholder="Your message" onChange={this.handleChange} value={this.state.message}></textarea>
                            </div>
                            <div className="bottom-panel__right">
                                <button className="btn" onClick={this.sendBtnHandler}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Chat.propTypes = {
    isGettingHistory: PropTypes.bool,
    gettingHistoryDataError: PropTypes.string,
    chatId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        isGettingHistory: state.isGettingHistory,
        gettingHistoryDataError: state.gettingHistoryDataError,
        chatId: state.chatId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHistoryData: (chat_id) => dispatch(getHistoryData(chat_id)),
        sendMessage: (message) => dispatch(sendMessage(message))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Chat);