import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import lockr from 'lockr';
import config from 'lib/config';
lockr.prefix = config.LOCKR_PREFIX;

export const PublicRoute = ({ component: Component, ...rest}) => (
	<Route
		{...rest}

		render = {props =>
			!lockr.get('Authorization') ?
			(<Component {...props} />) :
			(<Redirect to={{
				pathname: '/main',
				state: {from: props.location}
			}} />)
		}
	/>
);
