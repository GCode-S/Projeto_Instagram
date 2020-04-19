import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';


export default StyleSheet.create({
    container: {
        flex: 1,
        // width:'100%',
        justifyContent:'center',
        alignItems: 'center',
    },

    HeaderSpace:{
        height: Constants.statusBarHeight,
    },

    header:{
        height: 50,
        width: '100%',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        zIndex:1
         
    },

    headerButton:{
       width: '10%',
       justifyContent: 'center',       
    },

    headerText:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 0,
        marginLeft: 0,
        
    },
    textHeader:{
        fontWeight: 'bold',
        fontSize:20,
        lineHeight:30,
    },

    selectButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#CCC',
        borderStyle: 'dashed',
        height: 42,
        marginBottom: 25,
        marginTop: 40,
        width:'70%',
        

    },

    selectButtonText: {
        fontSize: 16,
        color: '#666',
    },

    preview: {
        width: 100,
        height: 100,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 4,

    },

    input: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 6,
        marginTop: 10,
        fontSize: 16,
        width:'90%',
        height:40 
    },

    shareButton: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        height: 45,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width:'85%',
        borderWidth: 1,
        borderColor: '#DDD'
    },

    shareButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2980b9',
    },

    Indicator:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
})