import React from "react";

function Message(props) {

    const {name,message,date_send} = props.data;

    return (
        <div className="message-item">
            <div className="message-item__avatar">
                <img className="img-responsive" src="img/avatar_placeholder.png" alt="" />
            </div>
            <div className="message-item__body">
                <div className="message-item__top">
                    <div className="message-item__name">
                        {name}
                    </div>
                    <div className="message-item__date">
                        {date_send}
                    </div>
                </div>
                <div className="message-item__text">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default Message;