import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import MetisMenu from "metismenujs";

import SimpleBar from "simplebar-react";

const SidebarContent = props => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">Main</li>

        <li>
          <Link to="/dashboard" className="waves-effect">
            <i className="ti-home"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        
        <li>
          <Link to="/device" className=" waves-effect">
            <i className="ti-view-grid"></i>
            <span>Device</span>
          </Link>
        </li>
        
        <li>
          <Link to="/sensor" className=" waves-effect">
            <i className="fas fa-microchip"></i>
            <span>Sensor</span>
          </Link>
        </li>

        <li>
          <Link to="/data-collection" className=" waves-effect">
            <i className="ti-receipt"></i>
            <span>Data Collection</span>
          </Link>
        </li>

        <li>
          <Link to="/algorithm-parameter" className=" waves-effect">
            <i className="ti-receipt"></i>
            <span>Algorithm Parameter</span>
          </Link>
        </li>
        
        <li>
          <Link to="/setting" className=" waves-effect">
            <i className="ti-settings"></i>
            <span>Setting</span>
          </Link>
        </li>
        
        <li>
          <Link to="/comparision" className=" waves-effect">
            <i className="ti-bar-chart"></i>
            <span>Comparision</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    if (this.props.type !== "condensed" || this.props.isMobile) {
      new MetisMenu("#side-menu");

      var matchingMenuItem = null;
      var ul = document.getElementById("side-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        if (this.props.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  activateParentDropdown = item => {
    item.classList.add("mm-active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active"); // li
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        {this.props.type !== "condensed" ? (
          <SimpleBar style={{ maxHeight: "100%" }}>
            <SidebarContent />
          </SimpleBar>
        ) : (
          <SidebarContent />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Sidebar);
