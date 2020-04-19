import React from 'react';
import { View, Text, TouchableOpacity, Platform, Image, Dimensions,ImageBackground, ActivityIndicator } from 'react-native';

import { FontAwesome, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';


import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

export default class CameraView extends React.Component {
  
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    indicator: null,
    hidde: 'n'
  };
  
  async componentDidMount() {
   
    this.getPermissionAsync();
    
  }

  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {
      this.setState({indicator: 'y'});
      this.setState({photo:  (await this.camera.takePictureAsync()).uri,}); 
      this.setState({indicator: null});
      this.setState({hidde: null});


    }
  }

  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissões de rolagem da câmera para fazer isso funcionar!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }
 
  render(){
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1, }}>
            <View style={{height: Constants.statusBarHeight}} />
           { this.state.hidde && 
          
            <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref}}>
          
                 
                
                    {this.state.indicator && <ActivityIndicator  size={60} color="#7f8c8d"></ActivityIndicator>}
                <View style={{flex: 1}}>
                    <View style={{flex:1, alignSelf: 'flex-end', justifyContent:'flex-start', paddingHorizontal: 20, paddingTop:8}}>
                          <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home', {screen: 'Feed'})}
                              style={{ 
                              }}
                              >
                            <Ionicons
                                name="ios-close"
                                style={{ color: "#fff", fontSize: 50}}
                            />
                          </TouchableOpacity>
                    </View>

                <View
                  style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 20,
                      }}
                      >

                        <TouchableOpacity
                          onPress={() => this.pickImage()}
                            style={{ 
                                  alignSelf: 'flex-end',
                                  alignItems: 'center',
                                  backgroundColor: 'transparent',
                            }}
                            >
                          <Ionicons
                              name="ios-photos"
                              style={{ color: "#fff", fontSize: 40}}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => this.takePicture() }
                            style={{ 
                                  alignSelf: 'flex-end',
                                  alignItems: 'center',
                                  backgroundColor: 'transparent',
                            }}
                            >
                         <Feather
                              name="circle" size={65}
                              style={{ color: "#fff"}}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.handleCameraType()}
                            style={{ 
                                  alignSelf: 'flex-end',
                                  alignItems: 'center',
                                  backgroundColor: 'transparent',
                            }}
                            >
                          <MaterialCommunityIcons
                              name="camera-switch"
                              style={{ color: "#fff", fontSize: 40}}
                          />
                        </TouchableOpacity>

                </View>

                </View>
                 

            </Camera>
                            
           }
            { this.state.photo && 
            <View style={{flex: 1}}>
                      <ImageBackground source={{ uri: this.state.photo }}  style={{width: Dimensions.get("screen").width, height: Dimensions.get('screen').height }}>
                          <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent', paddingTop: 25, paddingHorizontal: 20}}>

                              <TouchableOpacity style={{ padding: 3}} onPress={() => {
                                this.setState({photo: null, hidde: 'y'})
                              }}>
                                  <Feather name="arrow-left" size={33} color='#FFF'/>
                              </TouchableOpacity>

                              <TouchableOpacity style={{ padding: 3}} onPress={() => {}}>
                                  <Feather name="send" size={28} color='#FFF'/>
                              </TouchableOpacity>

                          </View>
                        
                      </ImageBackground>
            </View> }
        </View>
      );
       
    }
  }
}
