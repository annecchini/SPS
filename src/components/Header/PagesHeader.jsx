import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class PagesHeader extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      width: window.innerWidth
    };
  }
  // function that sets the class to active of the active page
  activeRoute(routeName) {
    return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // function that shows/hides sidebar on responsive
  mobileSidebarToggle(e) {
    document.documentElement.classList.toggle("nav-open");
  }
  updateWidth() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth.bind(this));
  }
  render() {
    return (
      <Navbar
        collapseOnSelect
        inverse
        className="navbar-primary navbar-transparent navbar-absolute"
      >
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to={"/"} className="nav-link">
              {this.state.width > 429
                ? "Processos Seletivos SEAD"
                : "Editais SEAD"}
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to={"/"} className="nav-link">
                <i className="fa fa-th-list" />
                <p>Início</p>
              </NavLink>
            </li>
            <li className={this.activeRoute("login-page")}>
              <NavLink to={"/app/auth/login"} className="nav-link">
                <i className="fa fa-drivers-license-o" />
                <p>Login</p>
              </NavLink>
            </li>
            <li className={this.activeRoute("register-page")}>
              <NavLink to={"/app/auth/register"} className="nav-link">
                <i className="fa fa-user-circle-o" />
                <p>Registre-se</p>
              </NavLink>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default PagesHeader;
