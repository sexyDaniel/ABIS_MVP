import { adminRoutes, publicRoutes, superAdminRoutes, userRoutes } from './routes';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import AdminNavBar from './components/AdminNavBar/AdminNavBar';
import { setUser } from './store/reducers/UserSlice';
import { authAPI } from './services/authService';
import Header from './components/Header/Header';
import React, { useEffect, useState } from 'react';
import { AdminLinks, SuperAdminLinks, UserLinks } from './const';
import { Layout, Spin } from 'antd';

import styles from './App.module.scss';

import 'antd/dist/antd.css';
import './vars.scss';
import './markdown.scss';

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();
    const { accessToken } = useAppSelector((state) => state.token);
    const { data, isLoading } = authAPI.useGetUserQuery(undefined, { skip: !accessToken });

    useEffect(() => {
        if (data) dispatch(setUser(data));
    }, [data, dispatch]);

    if (isLoading)
        return (
            <div className={styles.spin}>
                <Spin size='large' />
            </div>
        );

    const defaultPath = !data
        ? publicRoutes.defaultPath
        : data.role === 'User'
        ? userRoutes.defaultPath
        : data.role === 'Admin'
        ? adminRoutes.defaultPath
        : superAdminRoutes.defaultPath;

    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Header />
                <Layout>
                    {data && (
                        <Layout.Sider
                            theme='light'
                            collapsible
                            collapsed={collapsed}
                            onCollapse={(value) => setCollapsed(value)}>
                            <AdminNavBar
                                links={
                                    data.role === 'User'
                                        ? UserLinks
                                        : data.role === 'Admin'
                                        ? AdminLinks
                                        : SuperAdminLinks
                                }
                            />
                        </Layout.Sider>
                    )}
                    <Layout.Content className={styles.content}>
                        <React.Suspense fallback={<Spin />}>
                            <Routes>
                                {data?.role === 'User' &&
                                    userRoutes.routes.map(({ path, Component }) => (
                                        <Route key={path} path={path} element={<Component />} />
                                    ))}
                                {data?.role === 'Admin' &&
                                    adminRoutes.routes.map(({ path, Component }) => (
                                        <Route key={path} path={path} element={<Component />} />
                                    ))}
                                {data?.role === 'SuperAdmin' &&
                                    superAdminRoutes.routes.map(({ path, Component }) => (
                                        <Route key={path} path={path} element={<Component />} />
                                    ))}
                                {publicRoutes.routes.map(({ path, Component }) => (
                                    <Route key={path} path={path} element={<Component />} />
                                ))}
                                <Route path='*' element={<Navigate to={defaultPath} replace />} />
                            </Routes>
                        </React.Suspense>
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
