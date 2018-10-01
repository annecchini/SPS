import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Footer from "components/Footer/Footer.jsx";
import PagesHeader from "components/Header/PagesHeader.jsx";

// dinamically create pages routes
import pagesRoutes from "routes/AppPages.jsx";

import bgImage from "assets/img/full-screen-image-2.jpg";

class Pages extends Component {
  getPageClass() {
    var pageClass = "";
    switch (this.props.location.pathname) {
      case "/app/auth/login":
        pageClass = " login-page";
        break;
      case "/app/auth/register":
        pageClass = " register-page";
        break;
      case "/app/auth/recover":
        pageClass = " register-page";
        break;
      case "/app/auth/confirm":
        pageClass = " register-page";
        break;
      default:
        pageClass = " register-page";
        break;
    }
    return pageClass;
  }
  componentWillMount() {
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  render() {
    return (
      <div>
        <PagesHeader />
        <div className="wrapper wrapper-full-page">
          <div
            className={"full-page" + this.getPageClass()}
            data-color="blue"
            data-image={bgImage}
          >
            <div className="content">
              <Switch>

                {pagesRoutes.map((prop, key) => {
                  return (
                    <Route
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                })}


              </Switch>
            </div>
            <Footer transparent />
            <div
              className="full-page-background"
              style={{ backgroundImage: "url(" + bgImage + ")" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pages;
