import React, { Component } from 'react';
import NavLink from '../NavLink';
import { Menu, Icon } from 'antd';
import './_sidebar';

const SubMenu = Menu.SubMenu;
const sideBarMenu = [
  {
    key: 'product-manage',
    icon: 'product-manage',
    title: '产品管理',
    children: [
      { key: 'product', title: '库存', url: 'product' },
      { key: 'sales', title: '销售', url: 'sales' },
    ],
  },
  {
    key: 'contact',
    icon: 'contact',
    title: '联系人管理',
    children: [
    ],
  },
  {
    key: 'eye',
    icon: 'eye',
    title: '其他',
    children: [
    ],
  },
  {
    key: 'setting',
    icon: 'setting',
    title: '系统设置',
    children: [
    ],
  },
];

class SlideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'product',
      openKeys: ['product-manage'],
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
          className="text-title">姗姗专用后台</div>
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
