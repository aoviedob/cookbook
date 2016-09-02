import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../../routes';
import { Router } from 'react-router';

export default class Main extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <Router history={history} routes={routes} />
            </Provider>
        );
    }
}

Main.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
