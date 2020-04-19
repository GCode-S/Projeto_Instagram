import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { Feather } from 'react-native-vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
export default function Chat() {
  
const navigator = useNavigation();
  return (
    <View style={styles.container}>
       <View style={styles.HeaderSpace} />
          <View style={styles.header}>
                    <TouchableOpacity style={styles.headerButton} onPress={() =>{navigator.navigate('Home', {screen: 'Feed'});}}>
                        <Feather name="arrow-left" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Direct</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text> Chat</Text>
          </View>
    </View>
  );
}