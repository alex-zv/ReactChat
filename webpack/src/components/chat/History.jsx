import React from "react";
import {connect} from "react-redux";

import PropTypes from 'prop-types';
import Message from "./Message";

class History extends React.Component {
    constructor (props) {
        super(props);

        this.historyContainer = React.createRef();
    }

    scrollToBottom() {
        setTimeout(() => this.historyContainer.current.scrollTop = this.historyContainer.current.scrollHeight, 50);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.history !== prevProps.history) {
            this.scrollToBottom();
        }
    }

    render () {
        const messages = this.props.history.map( (message, index) =>
            <Message data={message} key={message.chat_history_id} />
        );

        return (
            <div className="history-container" ref={this.historyContainer}>
                {messages}
            </div>
        )
    }
}

History.propTypes = {
    users: PropTypes.array,
    history: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        history: state.history
    };
};

export default connect(mapStateToProps)(History);