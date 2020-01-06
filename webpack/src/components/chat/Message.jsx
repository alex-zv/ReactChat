import React from "react";
import {connect} from "react-redux";

class Message extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        const {userName,text,date} = this.props.data;
        return (
            <div className="message-item">
                <div className="message-item__avatar">
                    <img className="img-responsive" src="img/avatar_placeholder.png" alt="" />
                </div>
                <div className="message-item__body">
                    <div className="message-item__top">
                        <div className="message-item__name">
                            {userName}
                        </div>
                        <div className="message-item__date">
                            {date}
                        </div>
                    </div>
                    <div className="message-item__text">
                        {text}
                    </div>
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

export default connect(mapStateToProps)(Message);