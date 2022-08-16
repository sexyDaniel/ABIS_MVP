import React, { Component, ErrorInfo, ReactNode } from 'react';

import styles from './ErrorBoundary.module.scss';

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className={styles.wrapper}>
                    <h1 className={styles.message}>Упс, что-то пошло не так</h1>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
