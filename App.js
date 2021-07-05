import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import HomeScreen from './components/HomeScreen';


export default class App extends React.Component {
  render() {
    return (
      <View>
        <HomeScreen />
      </View>
    );
  }
}
