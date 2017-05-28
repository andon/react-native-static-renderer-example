import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Home Screen
    </Text>
    <Text style={styles.instructions}>
      This is the home screen. You can go to about.
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'About' })}
      title="About"
    />
  </View>
);

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

HomeScreen.navigationOptions = {
  title: 'Home',
};

export default HomeScreen;
