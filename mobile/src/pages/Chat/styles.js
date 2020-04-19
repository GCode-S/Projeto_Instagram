import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex:1,
    },

    HeaderSpace:{
        height: Constants.statusBarHeight,
    },

    header:{
        height:50,
        width: '100%',
        flexDirection: 'row',
        marginRight: 10,
        padding: 5,
        alignItems: 'center',
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#FFF'
    },

    headerButton:{
        padding: 6
    },

    headerTitle:{
        fontWeight: '900',
        fontSize: 18,
        marginLeft: 10,
    }

});