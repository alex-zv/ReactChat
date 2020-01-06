import React from "react";

import axios from "axios";
import {connect} from "react-redux";
import History from "./History";

class Chat extends React.Component {
    constructor (props) {
        super(props);
    }
    componentDidMount() {

    }

    render () {
        return (
            <div className="chat">
                <div className="chat-wrapper">
                    <div className="chat-sidebar">
                        Menu here
                    </div>
                    <div className="chat-top-panel">
                        <div>
                            Menu btn
                        </div>
                    </div>
                    <div className="chat-main">
                        <History/>

                        <div className="bottom-panel">
                            <div className="bottom-panel__left">
                                <div className="btn btn-attachment">
                                    F
                                </div>
                            </div>
                            <div className="bottom-panel__middle">
                                <textarea placeholder="Your message"></textarea>
                            </div>
                            <div className="bottom-panel__right">
                                <button className="btn">Send</button>
                            </div>
                        </div>
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

export default connect(mapStateToProps)(Chat);