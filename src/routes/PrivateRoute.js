import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import Navbar from 'components/BingerComponents/Navbar';
import lockr from 'lockr';
import config from 'lib/config';
lockr.prefix = config.LOCKR_PREFIX;

export const PrivateRoute = ({ component: Component, ...rest}) => (
	<Route
		{...rest}

		render = {props =>
			lockr.get('Authorization') ? (
				<React.Fragment>
					<Navbar />
					<Component {...props} />
				</React.Fragment>
			) : (
				<Redirect to={{
					pathname: '/login',
					state: {from: props.location}
				}} />
			)
		}
	/>
);
