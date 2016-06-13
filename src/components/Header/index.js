import React from 'react';
import './_header';

// 定义页面头部
class Header extends React.Component {
  render() {
    const { className, userName, onToggle, onLogout, ...others } = this.props;
    return (
      <header
        id="header"
        className={className ? `header-shadow ${className}` : 'header-shadow'}
        {...others}
      >
        <div className="appbar">
          <div className="container-fluid">
            <a className="sidedrawer-toggle js-show-sidedrawer"
               onClick={onToggle}>☰</a>
            <span className="login">
              <em>欢迎你，{userName}</em>
              <a href="#" onClick={onLogout} className="exit">退出</a>
            </span>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userName: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onToggle: React.PropTypes.func,
  onLogout: React.PropTypes.func,
};

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;
