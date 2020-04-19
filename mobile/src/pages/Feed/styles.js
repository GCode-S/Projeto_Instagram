import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    
    HeaderSpace:{
        height: Constants.statusBarHeight,
    },

    header:{
        height:50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
        padding: 5,
        alignItems: 'center',
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#FFF'
     
    },
    camera:{
        flexDirection: 'row',
        
    },
    logo:{
        marginLeft: 10,
      
    },
     feedItem: {
         marginTop:1,
         backgroundColor: '#FFF'
     },

     feedItemHeader:{
         paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',    
        margin: 4,
    },
    groupProfile:{
        flexDirection: 'row'
    },

    profile:{
        backgroundColor: '#ddd',
        height: 40,
        width : 40,
        borderRadius: 50,
        margin:5,
        justifyContent:'center',
        alignItems: 'center'
    },  

    name:{
        paddingTop: 5,
        fontSize: 14,
        color: '#000',
    },

    place:{
        fontSize: 12,
        color:'#666',
        marginTop:2,

    },

    moreAction:{
        padding: 5
    },

    feedImage:{
        width: '100%',
        height: 400,
        marginVertical: 5,
    },

    feedItemFooter:{
        paddingHorizontal: 15,
    },

    actions: {
        flexDirection: 'row',
    },
    
    action: {
        marginRight: 5,
    },

    likes:{
        marginTop: 10,
        marginBottom: 3,
        fontWeight: 'bold',
        color:'#000',
    },

    description:{
        lineHeight: 18,
        color: '#000',
    },

    hashtags:{
        color: '#7159c1',
        marginBottom: 15,
    },
  

    Indicator:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
    
});