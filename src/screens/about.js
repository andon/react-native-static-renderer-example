import React from 'react';
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

const AboutScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      About Screen
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Home' })}
      title="Home"
    />
  </View>
);

AboutScreen.navigationOptions = {
  title: 'About',
};

export default AboutScreen;
