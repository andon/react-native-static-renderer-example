import React from 'react';

import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';

import HomeScreen from './src/screens/home';
import AboutScreen from './src/screens/about';

import PerfMonitor from 'react-native/Libraries/Performance/RCTRenderingPerf';
PerfMonitor.toggle();
PerfMonitor.start();

export default class App extends React.Component {
  store = createStore(reducer);

  componentDidMount() {
    setTimeout(() => {
      PerfMonitor.stop();
    }, 8000);
  }

  render() {
    console.log('render: App');
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

class AppWithNavState extends React.Component {
  render() {
    console.log('render: AppWithNavState');
    const { dispatch, nav } = this.props;
    return <AppWithStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;
  }
}

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
    case 'Home':
      nextState = AppWithStackNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' })
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

