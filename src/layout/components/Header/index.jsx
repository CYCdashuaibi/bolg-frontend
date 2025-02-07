import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { menuList } from './contants';

import { HeaderStyle } from './style';

import Logo from '@/assets/react.svg';
import Avatar from '@/assets/images/avatar.jpeg'

function Header() {
    const location = useLocation();
    const { pathname } = location;

    return (
        <HeaderStyle>
            <div className="container">
                <NavLink href="/home" className="logo">
                    <img src={Logo} alt="logo" className="logo" />
                </NavLink>
                <nav className="header-nav">
                    <ul className="nav-list">
                        <li className="nav-list-menu">
                            {menuList.map((menu) => (
                                <NavLink href={menu.path} key={menu.path} className={`nav-list-menu-item ${pathname === menu.path && 'active'}`}>
                                    {menu.name}
                                </NavLink>
                            ))}
                        </li>
                        <ul className="nav-list-right">
                            <li className="search">
                                <Input.Search placeholder="搜索" enterButton style={{ width: 300 }} />
                            </li>
                            <li className="add">
                                <Button type="primary"><PlusCircleOutlined />写文章</Button>
                            </li>
                            <li>
                                <img src={Avatar} alt="头像" className="avatar" />
                            </li>
                        </ul>
                    </ul>
                </nav>
            </div>
        </HeaderStyle>
    );
}

export default Header;