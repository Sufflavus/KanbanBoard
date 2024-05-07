import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import {DefaultLanguage, I18nextResources} from "./models";
import store from './store';
import App from './App';

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: DefaultLanguage,
    resources: I18nextResources
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <Provider store={store}>
                <App />
            </Provider>
        </I18nextProvider>
    </React.StrictMode>
);
