import React from 'react';
import { userActions, appActions } from './actions';
import { connect } from 'react-redux';
import Notification from 'components/LayoutComponents/Notification';
import routes from 'routes/routes';

class App extends React.Component{

  constructor(props) {
    super(props);

    this.props.getCurrentUser()
    console.log("0.1.14");
  }

  render() {
    return ( !this.props.isFetching ?
      <div>
        <Notification />
        { routes }
      </div> : null
    );
  }
}

const mapDispatchToProps = {
  getCurrentUser: userActions.getCurrentUser,
  setLoadingState: appActions.setLoadingState,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
