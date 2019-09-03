import React from 'react';
import { userActions } from './actions';
import { connect } from 'react-redux';
import Notification from 'components/LayoutComponents/Notification';
import routes from 'routes/routes';

class App extends React.Component{

  constructor(props) {
    super(props);

    this.props.getCurrentUser();
  }

  render() {
    return (
      <div>
        <Notification />
        { routes }
      </div>
    );
  }
}

const mapDispatchToProps = {
  getCurrentUser: userActions.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
