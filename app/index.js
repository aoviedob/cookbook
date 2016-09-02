import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import store from './store/configureStore';
import Main from './client/containers/Main';
import './client/styles/recipe_management.scss';
import 'materialize-css/sass/materialize.scss';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init.js';
import {fetchCategories, fetchRecipes } from './actions';

// const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer>
        <Main store={store} history={history} />
    </AppContainer>,
    document.getElementById('main')
);

if (module.hot) {
    module.hot.accept('./client/containers/Main', () => {
        const NewMain = require('./client/containers/Main').default;
        render(
            <AppContainer>
                <NewMain store={store} history={history} />
            </AppContainer>,
            document.getElementById('main')
        );
    });
}
store.dispatch(fetchCategories());
store.dispatch(fetchRecipes());
