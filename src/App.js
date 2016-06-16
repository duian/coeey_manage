import React from 'react';
import classnames from 'classnames';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './views/Home';
import cookie from 'js-cookies';
import auth from './utils/auth';
import './styles/antd';
import './styles/app';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarStatus: true,
      username: cookie.getItem('username') || '姗姗',
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    auth.logout(this.context.router);
  }

  handleToggle() {
    this.setState({
      sidebarStatus: !this.state.sidebarStatus,
    });
  }

  render() {
    const { username } = this.state;
    const { routes } = this.props;
    const sidebarActiveClass = classnames({
      active: !!this.state.sidebarStatus,
    });
    return (
      <div>
        <Header
          name="姗姗专用后台"
          userName={username}
          className={sidebarActiveClass}
          onToggle={this.handleToggle}
          onLogout={this.handleLogout}
        />
        <Sidebar
          className={sidebarActiveClass}
          route={routes[1].path}
        />
        <div className={`container ${sidebarActiveClass}`}>
          {this.props.children || Home}
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

export default App;
