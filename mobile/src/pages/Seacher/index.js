import React from 'react';

import { 
    View,
    Text,
  } from 'react-native';

export default class Seacher extends React.Component {
    render() {
  
  
      return (
  
          <View  style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Search</Text>
            </View>
          </View>
  
      );
    }
  }