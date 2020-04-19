import React from 'react';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import Feed from './pages/Feed';
import Chat from './pages/Chat';
import CameraView from './pages/Camera';
import Followers from './pages/Followers';
import New from './pages/New';
import Profile from './pages/Profile';
import Seacher from './pages/Seacher';


const appStack = createBottomTabNavigator();

const Stack = createStackNavigator();


function MyTabNavigation(){
    return (
      
      <appStack.Navigator
      initialRouteName="Feed"
                         tabBarOptions={{
                             activeTintColor:'#000',
                             showLabel: false,
                             keyboardHidesTabBar: true,
                             safeAreaInset: {bottom: 'never', top: 'always'},
                              
                         }} >
                      
                      <appStack.Screen name="Feed"  component={Feed}
                        options={{  
                                    tabBarIcon: ({color, size}) =>(<MaterialCommunityIcons name="home-outline" size={32} color={color} backgroundColor={color} />),
                                  }}
                        />
  
                    <appStack.Screen name="Seacher" component={Seacher}
                        options={{  
                                    tabBarIcon: ({color, size}) =>(<Feather name="search" size={25} color={color} />),
                                  }}
                        />
  
                    <appStack.Screen name="New" component={New}
                        options={{  
                                    tabBarIcon: ({color, size}) => (<Feather name="plus-square" size={30} color={color} />),
                                  }} 
                        />
  
                    <appStack.Screen name="Followers" component={Followers} 
                        options={{  
                                    tabBarIcon: ({color, size}) =>(<Feather name="heart" size={25} color={color} />),
                                 }}
                        />
  
                    <appStack.Screen name="Profile" component={Profile} 
                            options={{  
                                        tabBarIcon: ({color, size}) =>(<Feather name="user" size={25} color={color} />),
                                        }}
                        />
      </appStack.Navigator>
    );
  } 
  
  
  function App() {
    return (
      <Stack.Navigator 
       initialRouteName="Home"
       screenOptions={{
             headerShown: false
         }}
         mode='modal'
        >
  
          <Stack.Screen name="Home" component={MyTabNavigation} />
  
          <Stack.Screen name="CameraView" component={CameraView}  options={{gestureEnabled: true, gestureDirection: 'horizontal-inverted', gestureVelocityImpact: 0.5}}/>
          
          <Stack.Screen name="Chat" component={Chat} options={{gestureEnabled: true, gestureDirection: 'horizontal'}}/>
    
      </Stack.Navigator>
  
    );
  }
  
  export default class Routes extends React.Component {
    render() {
      return (
       
          <NavigationContainer independent={true}>
              <App />
          </NavigationContainer>
        
      );
    }
  }