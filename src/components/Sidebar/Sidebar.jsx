import React, { Component } from "react";
import { Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// this is used to create scrollbars on windows devices like the ones from apple devices
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import HeaderLinks from "components/Header/HeaderLinks.jsx";

// backgroundImage for Sidebar
import image from "assets/img/full-screen-image-2.jpg";
// image for avatar in Sidebar
import avatar from "assets/img/default-avatar.png";
// logo for sidebar
import logo from "logo.svg";

import dashboardRoutes from "routes/dashboard.jsx";

import appRoutesSidebar from "routes/AppRoutesSidebar.jsx"
import DummySession from "variables/DummySession.jsx"

const bgImage = { backgroundImage: "url(" + image + ")" };

var ps;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      openMyBlock: this.activeRoute("/app/myblock") !== "" ? true : false,
      openComponents: this.activeRoute("/components") !== "" ? true : false,
      openForms: this.activeRoute("/forms") !== "" ? true : false,
      openTables: this.activeRoute("/tables") !== "" ? true : false,
      openMaps: this.activeRoute("/maps") !== "" ? true : false,
      openPages: this.activeRoute("/pages") !== "" ? true : false,
      isWindows: navigator.platform.indexOf("Win") > -1 ? true : false,
      width: window.innerWidth,
      //User data
      user: null
    };

  }

  componentWillMount() {

    //recolhendo dados da sessão do usuário.
    let result = null
    try {
      result = DummySession.getData('user-info')
    }
    catch (exception) {
      alert("Falha em obter dados da sessão / Erro no servidor")
    }

    if (result.ok) {
      this.setState({
        user: result.user
      })
    }

  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // if the windows width changes CSS has to make some changes
  // this functions tell react what width is the window
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.updateDimensions();
    // add event listener for windows resize
    window.addEventListener("resize", this.updateDimensions.bind(this));
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentDidUpdate() {
    if (navigator.platform.indexOf("Win") > -1) {
      setTimeout(() => {
        ps.update();
      }, 350);
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  logout(event){
    event.preventDefault()
    DummySession.delData('logout')
    window.location.replace("http://localhost:3000")
  }

  render() {
    return (
      <div className="sidebar" data-color="blue" data-image={image}>
        <div className="sidebar-background" style={bgImage} />
        <div className="logo">
          <a
            href="https://www.creative-tim.com"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://www.creative-tim.com"
            className="simple-text logo-normal"
          >
            EDITAIS
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebarWrapper">
          <div className="user">
            <div className="photo">
              <img src={avatar} alt="Avatar" />
            </div>
            <div className="info">
              <a
                onClick={() =>
                  this.setState({ openAvatar: !this.state.openAvatar })
                }
              >
                <span>
                  {/*Nome do usuário*/}
                  {this.state.user !== null ? this.state.user.firstName : 'Visitante'}
                  <b
                    className={
                      this.state.openAvatar ? "caret rotate-180" : "caret"
                    }
                  />
                </span>
              </a>
              {this.state.user !== null ? (
                <span>
                  <Collapse in={this.state.openAvatar}>
                    <ul className="nav">
                      <li>
                        <a href="http://localhost:3000/#/app/users/me">
                          <span className="sidebar-mini">LG</span>
                          <span className="sidebar-normal">Meu perfil</span>
                        </a>
                      </li>
                      <li>
                        <a href="http://localhost:3000/#/app/users/me/edit">
                          <span className="sidebar-mini">EP</span>
                          <span className="sidebar-normal">Editar perfil</span>
                        </a>
                      </li>
                      <li>
                        <a href="http://localhost:3000" onClick={event=>this.logout(event)}>
                          <span className="sidebar-mini">LG</span>
                          <span className="sidebar-normal">Logout</span>
                        </a>
                      </li>

                    </ul>
                  </Collapse>
                </span>
              ) : (
                  <span>
                    <Collapse in={this.state.openAvatar}>
                      <ul className="nav">
                        <li>
                          <a href="http://localhost:3000/#/app/auth/login">
                            <span className="sidebar-mini">LG</span>
                            <span className="sidebar-normal">Login</span>
                          </a>
                        </li>
                        <li>
                          <a href="http://localhost:3000/#/app/auth/register">
                            <span className="sidebar-mini">RG</span>
                            <span className="sidebar-normal">Registre-se</span>
                          </a>
                        </li>
                      </ul>
                    </Collapse>
                  </span>
                )}

            </div>
          </div>

          <ul className="nav">
            {/* If we are on responsive, we want both links from navbar and sidebar
                            to appear in sidebar, so we render here HeaderLinks */}
            {this.state.width <= 992 ? <HeaderLinks /> : null}
            {/*
                            here we render the links in the sidebar
                            if the link is simple, we make a simple link, if not,
                            we have to create a collapsible group,
                            with the speciffic parent button and with it's children which are the links
                        */}


            {/* My app routes*/}
            {appRoutesSidebar.map((prop, key) => {
              var st = {};
              st[prop["state"]] = !this.state[prop.state];
              if (prop.collapse) {
                return (
                  <li className={this.activeRoute(prop.path)} key={`app${key}`}>
                    <a onClick={() => this.setState(st)}>
                      <i className={prop.icon} />
                      <p>
                        {prop.name}
                        <b
                          className={
                            this.state[prop.state]
                              ? "caret rotate-180"
                              : "caret"
                          }
                        />
                      </p>
                    </a>
                    <Collapse in={this.state[prop.state]}>
                      <ul className="nav">
                        {prop.views.map((prop, key) => {
                          return (
                            <li
                              className={this.activeRoute(prop.path)}
                              key={key}
                            >
                              <NavLink
                                to={prop.path}
                                className="nav-link"
                                activeClassName="active"
                              >
                                <span className="sidebar-mini">
                                  {prop.mini}
                                </span>
                                <span className="sidebar-normal">
                                  {prop.name}
                                </span>
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </Collapse>
                  </li>
                );
              } else {
                if (prop.redirect) {
                  return null;
                } else {
                  return (
                    <li className={this.activeRoute(prop.path)} key={key}>
                      <NavLink
                        to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                }
              }
            })}

            <li><hr></hr></li>

            {/* */}
            {dashboardRoutes.map((prop, key) => {
              var st = {};
              st[prop["state"]] = !this.state[prop.state];
              if (prop.collapse) {
                return (
                  <li className={this.activeRoute(prop.path)} key={key}>
                    <a onClick={() => this.setState(st)}>
                      <i className={prop.icon} />
                      <p>
                        {prop.name}
                        <b
                          className={
                            this.state[prop.state]
                              ? "caret rotate-180"
                              : "caret"
                          }
                        />
                      </p>
                    </a>
                    <Collapse in={this.state[prop.state]}>
                      <ul className="nav">
                        {prop.views.map((prop, key) => {
                          return (
                            <li
                              className={this.activeRoute(prop.path)}
                              key={key}
                            >
                              <NavLink
                                to={prop.path}
                                className="nav-link"
                                activeClassName="active"
                              >
                                <span className="sidebar-mini">
                                  {prop.mini}
                                </span>
                                <span className="sidebar-normal">
                                  {prop.name}
                                </span>
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </Collapse>
                  </li>
                );
              } else {
                if (prop.redirect) {
                  return null;
                } else {
                  return (
                    <li className={this.activeRoute(prop.path)} key={key}>
                      <NavLink
                        to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                }
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
