import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import React from 'react';
import App from './App';

import './reset.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <ErrorBoundary>
        <Provider store={store}>
            <App />
        </Provider>
    </ErrorBoundary>
);
