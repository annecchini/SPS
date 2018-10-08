import "../../assets/css/app/app.css";
import React from "react";

import UserList from "./User/UserList.jsx";
import UserCreate from "./User/UserCreate.jsx";
import UserRead from "./User/UserRead.jsx";
import UserUpdate from "./User/UserUpdate.jsx";
import UserDelete from "./User/UserDelete.jsx";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: "process-list",
      currentId: null
    };
  }

  changeMode = (newMode, newProcess) => {
    if (newProcess !== undefined) {
      this.setState({
        currentMode: newMode,
        currentUser: newProcess
      });
    } else {
      this.setState({
        currentMode: newMode
      });
    }
  };

  render() {
    let component = <UserList changeMode={this.changeMode} />;
    switch (this.state.currentMode) {
      case "user-list":
        break;
      case "user-create":
        component = <UserCreate changeMode={this.changeMode} />;
        break;
      case "user-read":
        component = (
          <UserRead
            user={this.state.currentUser}
            changeMode={this.changeMode}
          />
        );
        break;
      case "user-update":
        component = (
          <UserUpdate
            user={this.state.currentUser}
            changeMode={this.changeMode}
          />
        );
        break;
      case "user-delete":
        component = (
          <UserDelete
            user={this.state.currentUser}
            changeMode={this.changeMode}
          />
        );
        break;
      default:
        break;
    }
    return component;
  }
}

export default Users;
