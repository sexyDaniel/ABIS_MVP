import { useLocation, useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { MenuInfo } from 'rc-menu/lib/interface';
import { NavItem } from '../../const';
import React, { FC } from 'react';
import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';

type AdminNavBarProps = {
    className?: string;
    links: NavItem[];
};

const AdminNavBar: FC<AdminNavBarProps> = ({ className, links }) => {
    const navigate = useNavigate();
    const onClick = (item: MenuInfo) => navigate(item.key);
    const selectedKey = useLocation().pathname;

    return (
        <Menu
            mode='inline'
            selectedKeys={[selectedKey]}
            onClick={onClick}
            items={links.map(({ path, label, Icon }) => ({ key: path, label, icon: <Icon /> }))}
        />
    );
};

export default AdminNavBar;
