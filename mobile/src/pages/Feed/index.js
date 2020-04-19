import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { Feather, EvilIcons, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import logo from '../../assets/logo.png';

import io  from 'socket.io-client';
import api from '../../services/api';

import styles from './styles';


export default class Feed extends React.Component{

    state = {
        posts: [],
        refreshing: false,
        postNews: false,
      };

      async componentDidMount(){
        this.registerToSocketPost();
        this.onRefresh();
        }   

      registerToSocketPost = () => {
            //substitua a palavra "seuIp" pelo o ip da sua máquina
            const socket = io('http://seuIp:3333');     
            
            socket.on('post', newPost => {
                this.setState({ postNews: true })
            });
    
            socket.on('like', likePost => {
                this.setState({ posts: this.state.posts.map(post => post._id === likePost._id ? likePost : post)});
            }); 
    
            socket.on('delete', destroy => {
               
                const position = this.state.posts.map(post => post._id === destroy._id ? destroy : null);
           
                for (var i = 0; i < position.length; i++){
                    if(position[i] != null){
                        
                        const arr = this.state.posts;
                        arr.splice(i, 1);
                        this.setState({posts: arr });
                        return
                    }
                }
            });
          }

          Like = id =>{
            api.post(`/posts/${id}/like`);
          }
    
          handleRemovePost = id =>{
                api.delete(`/posts/${id}/delete`);
          }
    
    
          navigationSend = () => {
                this.props.navigation.navigate('Chat');
          }
    
          navigationCamera = () =>{
              this.props.navigation.navigate('CameraView');
          }

          onRefresh = async () => {
            this.setState({refreshing: true});
            await api.get('/posts').then(res =>{
                this.setState({ posts: res.data });
                this.setState({refreshing: false}); 
                this.setState({postNews: false});
            });
            
          }

          render(){
            return (
                <View style={styles.container}>
                    <View style={styles.HeaderSpace} />
        
                <View style={styles.header}>
                        <View style={styles.camera}>
                            <TouchableOpacity  onPress={() =>this.navigationCamera()}>
                                <EvilIcons name="camera" size={38} color="#000"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                 this.onRefresh();
                                 this.flatList_Ref.scrollToIndex({animated: true,index:0});
                                   
                            }}>
                                <Image source={logo} style={styles.logo}/>
                            </TouchableOpacity>
                        </View>
                    
                  
                    <TouchableOpacity onPress={() =>this.navigationSend()}>
                        <Feather name="send" size={25} />
                    </TouchableOpacity>
                  
                </View>
                            
                        {
                             this.state.postNews &&
                        
                            <View style={{flex: 1, alignItems:'center'}}>
                                <TouchableOpacity onPress={() => {
    
                                    this.onRefresh();
                                    this.flatList_Ref.scrollToIndex({animated: true,index:0});
    
                                }} style={{backgroundColor:'#fff', flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 10, width: '45%', height: 35, alignItems:'center', borderRadius: 100, borderWidth: 1, borderColor: '#cecece', marginTop: 8, zIndex: 1}}>
                                    <Ionicons name="ios-refresh"  size={20} />
                                    <Text>Novas publicações</Text>
                                </TouchableOpacity>
                            </View>
                        }
    
                    <FlatList 
                     ref={ref => {
                        this.flatList_Ref = ref;
                    }}
                    
                      data={this.state.posts}
                      keyExtractor={post => String(post._id)}
                      ListEmptyComponent={() => (<View />)}
                      removeClippedSubviews={true}
                      refreshControl={  <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} /> }
                      extraData={this.state.posts}
                      renderItem={({ item, index }) => (
                      
                        <View style={styles.feedItem}>
                            <View style={styles.feedItemHeader}>
                                <View style={styles.groupProfile}>
                                    <View style={styles.profile}>
                                        <Feather name="user" size={25} color='#fff' />
                                    </View>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.name}> { item.author }</Text>
                                        <Text style={styles.place}> { item.place }</Text>
        
                                    </View>
                                </View>
                                    <View>
    
                                        <TouchableOpacity style={styles.moreAction} onPress={() => {
                                            Alert.alert(
                                                'Deseja excluir este Post ?',
                                                'toque em ok',
                                                [
                                                    {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                    {text: 'OK', onPress:() => this.handleRemovePost(item._id)},
                                                ],
                                                { cancelable: false }
                                            )
                                        }}>
                                            <Feather name="more-vertical" size={20} />
                                        </TouchableOpacity>
                                     
                                    </View>
                            </View>
        
                            <Image style={styles.feedImage} source={{ uri: `http://192.168.0.116:3333/files/${item.image}` }} />
        
                            <View style={styles.feedItemFooter}>
                                <View style={styles.actions}>
                                    <TouchableOpacity style={styles.action} onPress={()=> this.Like(item._id)}>
                                        <Feather name="heart" size={28} color='#000' />
                                    </TouchableOpacity>
        
                                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                                        <Feather name="message-circle" size={28} color='#000' />
                                    </TouchableOpacity>
        
                                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                                        <Feather name="send" size={28} color='#000' />
                                    </TouchableOpacity>
                                </View>
        
                                <Text style={styles.likes}> {item.likes} curtidas </Text>
                                <Text style={styles.description}> {item.description} </Text>
                                <Text style={styles.hashtags}> {item.hashtags} </Text>
                            </View>
                        
                        </View>
                      )}
                      >    

                    </FlatList>
                </View>
            );
        }
}