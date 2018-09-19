import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer
        className={
          "footer" +
          (this.props.transparent !== undefined ? " footer-transparent" : "")
        }
      >
        <div
          className={
            "container" + (this.props.fluid !== undefined ? "-fluid" : "")
          }
        >
          <nav className="pull-left">
            <ul>
              <li>
                <a href="https://editais.sead.ufes.br">SPSS</a>
              </li>
              <li>
                <a href="https://www.sead.ufes.br">SEAD</a>
              </li>
              <li>
                <a href="https://blog.sead.ufes.br">Blog</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="http://suporte.sead.ufes.br">Suporte SEAD</a>
          </p>
        </div>
      </footer>
    );
  }
}
export default Footer;
