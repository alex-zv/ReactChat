import React from "react";
import axios from "axios";
import {connect} from "react-redux";

import Message from "./Message";

class History extends React.Component {
    constructor (props) {
        super(props);

        this.state = {

        };

        this.historyContainer = React.createRef();
    }
    componentDidMount() {
        this.historyContainer.current.scrollTop = this.historyContainer.current.scrollHeight;
    }

    render () {

        const messages = this.props.history.map( (message, index) =>
            <Message data={message} key={message.history_id} />
        );

        return (
            <div className="history-container" ref={this.historyContainer}>
                {messages}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        history: state.history
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        test: (content) => { dispatch({type: 'TEST_TYPE', payload: '123123'}) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);