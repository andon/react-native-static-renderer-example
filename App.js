import React from 'react';

import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';

import HomeScreen from './src/screens/home';
import AboutScreen from './src/screens/about';

export default class App extends React.Component {
  store = createStore(reducer);

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedApp />
      </Provider>
    );
  }
}

const AppWithStackNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  About: { screen: AboutScreen }
});

const AppWithNavState = ({ dispatch, nav }) => (
  <AppWithStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
  nav: state.nav
});

const ConnectedApp = connect(mapStateToProps)(AppWithNavState);

const reducer = combineReducers({
  nav
});

function nav(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'About':
      nextState = AppWithStackNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'About' })
      );
      break;
    default:
      nextState = AppWithStackNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}


const initialState = AppWithStackNavigator.router.getStateForAction(
  AppWithStackNavigator.router.getActionForPathAndParams('Home'));

