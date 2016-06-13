import React, { Component } from 'react';
import NavLink from '../NavLink';
import { Menu, Icon } from 'antd';
import './_sidebar';

const SubMenu = Menu.SubMenu;
const sideBarMenu = [
  {
    key: 'solution',
    icon: 'solution',
    title: '配置',
    children: [
      { key: 'bankChannel', title: '银行渠道维护', url: 'bankChannel' },
      { key: 'fraudParam', title: '贷款需求开关', url: 'fraudParam' },
      { key: 'systemParam', title: '贷款产品开关', url: 'systemParam' },
      { key: 'validateSettings', title: '验证项配置', url: 'validateSettings' },
    ],
  },
  {
    key: 'appstore',
    icon: 'appstore',
    title: '推送',
    children: [
      // { key: '/a1', title: '银行渠道维护', url: '/a' },
    ],
  },
  {
    key: 'eye',
    icon: 'eye',
    title: '其他',
    children: [
      // { key: '/a2', title: '银行渠道维护', url: '/a' },
    ],
  },
  {
    key: 'setting',
    icon: 'setting',
    title: '系统设置',
    children: [
      // { key: '/a3', title: '银行渠道维护', url: '/a' },
    ],
  },
];

class SlideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'bankChannel',
      openKeys: ['solution'],
    };

    this.handleClick = this.handleClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  handleClick(e) {
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1),
    });
  }

  onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
    });
  }

  renderSubMenu() {
    return (
      sideBarMenu.map((subMenu) => (
        <SubMenu
          key={subMenu.key}
          title={<span><Icon type={subMenu.icon} /><span>{subMenu.title}</span></span>}
        >
          {
            subMenu.children.map((subMenuItem) => (
              <Menu.Item key={subMenuItem.key}>
                <NavLink
                  to={subMenuItem.url}
                  onlyActiveOnIndex={subMenuItem.key === '/'}>
                  {subMenuItem.title}
                </NavLink>
              </Menu.Item>
            ))
          }
        </SubMenu>
      ))
    );
  }
  render() {
    const { current, openKeys } = this.state;
    const { route } = this.props;
    return (
      <div
        {...this.props}
        id="sidedrawer"
        className={this.props.className}>
        <div
          id="sidedrawer-brand"
          className="text-title">51人品贷后台</div>
        <div className="divider" />

        <Menu
          theme="dark"
          onClick={this.handleClick}
          selectedKeys={route ? [route] : [current]}
          openKeys={openKeys}
          onOpen={this.onToggle}
          onClose={this.onToggle}
          mode="inline">
          {this.renderSubMenu()}
        </Menu>
      </div>
    );
  }
}


export default SlideBar;
