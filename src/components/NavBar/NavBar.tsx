import { useLocation, useNavigate } from 'react-router-dom';
import { MenuInfo } from 'rc-menu/lib/interface';
import { NavItem } from '../../const';
import React, { FC } from 'react';
import { Menu } from 'antd';

type NavBarProps = {
    className?: string;
    links: NavItem[];
};

const NavBar: FC<NavBarProps> = ({ className, links }) => {
    const navigate = useNavigate();
    const onClick = (item: MenuInfo) => navigate(item.key);
    const selectedKey = useLocation().pathname;

    return (
        <Menu
            mode='inline'
            selectedKeys={[selectedKey]}
            onClick={onClick}
            className={className}
            items={links.map(({ path, label, Icon }) => ({ key: path, label, icon: <Icon /> }))}
        />
    );
};

export default NavBar;
