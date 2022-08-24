import { adminRoutes, publicRoutes, superAdminRoutes, userRoutes } from './routes';
import FormPageWrapper from './components/FormPageWrapper/FormPageWrapper';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { AdminLinks, SuperAdminLinks, UserLinks } from './const';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import NavBar from './components/NavBar/NavBar';
import PageWrapper from './components/PageWrapper/PageWrapper';
import { setUser } from './store/reducers/UserSlice';
import React, { useEffect, useState } from 'react';
import { authAPI } from './services/authService';
import Header from './components/Header/Header';
import { ConfigProvider, Layout, Spin } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';

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
        <HashRouter>
            <ConfigProvider locale={ruRu}>
                <Layout style={{ minHeight: '100vh' }}>
                    <Header />
                    <Layout>
                        {data && (
                            <Layout.Sider
                                theme='light'
                                collapsible
                                collapsed={collapsed}
                                onCollapse={(value) => setCollapsed(value)}>
                                <NavBar
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
                                        userRoutes.routes.map(({ path, Component, title }) => (
                                            <Route
                                                key={path}
                                                path={path}
                                                element={
                                                    <PageWrapper title={title}>
                                                        <Component />
                                                    </PageWrapper>
                                                }
                                            />
                                        ))}
                                    {data?.role === 'Admin' &&
                                        adminRoutes.routes.map(({ path, Component, title }) => (
                                            <Route
                                                key={path}
                                                path={path}
                                                element={
                                                    <PageWrapper title={title}>
                                                        <Component />
                                                    </PageWrapper>
                                                }
                                            />
                                        ))}
                                    {data?.role === 'SuperAdmin' &&
                                        superAdminRoutes.routes.map(({ path, Component, title }) => (
                                            <Route
                                                key={path}
                                                path={path}
                                                element={
                                                    <PageWrapper title={title}>
                                                        <Component />
                                                    </PageWrapper>
                                                }
                                            />
                                        ))}
                                    {publicRoutes.routes.map(({ path, Component, title }) => (
                                        <Route
                                            key={path}
                                            path={path}
                                            element={
                                                <FormPageWrapper title={title}>
                                                    <Component />
                                                </FormPageWrapper>
                                            }
                                        />
                                    ))}
                                    <Route path='*' element={<Navigate to={defaultPath} replace />} />
                                </Routes>
                            </React.Suspense>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </HashRouter>
    );
};

export default App;
