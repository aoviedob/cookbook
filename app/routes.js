import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './client/components/App';
import RecipeManagement from './client/containers/RecipeManagement';

export default (
	<Route path="/app/" component={App}>
		<IndexRoute component={RecipeManagement} />
	</Route>
);
