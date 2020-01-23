import React from "react";

class UserList extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <ul className="users-list">
                <li>
                    Alex
                </li>
                <li>
                    Jane
                </li>
            </ul>
        )
    }
}

export default UserList;