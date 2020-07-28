import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import ResultScreen from './src/screen/ResultScree';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'yellow'
    }}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={
              {
                title: 'EMI Calculator',
                headerTitleStyle: {
                  textAlign: 'center',
                  color: '#79797A',
                  fontWeight: 'bold',
                  fontSize: 22
                }
              }
            }
          />

          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={
              {
                title: 'Result',
                headerTitleStyle: {
                  textAlign: 'center',
                  color: '#79797A'
                }
              }
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
};

const styles = StyleSheet.create({

});

export default App;