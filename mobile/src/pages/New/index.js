import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-simple-toast';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import styles from './styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function New ({ navigation }) {

    const navigator = useNavigation();

    const [button, setButton] = useState('true');
    const [load, setLoad] = useState(null);


    const [author, setAuthor] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');

    let [selectedImage, setSelectedImage] = React.useState(null);


    let openImage = async () => {

      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
  
      if (pickerResult.cancelled === true) {
        return;
      }
  
      setSelectedImage({ uri: pickerResult.uri, type: pickerResult.type +"/jpg", name: new Date().getTime() +'.jpg'});
      
    };
  


    function handleBackPage(){
      navigator.navigate('Home', {screen: 'Feed'});
    }

    async function handleSubmit(){
     
      setButton(null);
      setLoad('true');


      try{

        const data = new FormData();

        data.append('image', selectedImage);
        data.append('author', author);
        data.append('place', place);
        data.append('description', description);
        data.append('hashtags', hashtags);

        Toast.show('Compartilhando...', Toast.SHORT);
        await api.post('posts', data);
       
        setLoad(null);
        setButton('true');
        setSelectedImage(null);
        setAuthor('');
        setPlace('');
        setDescription('');
        setHashtags('');
        navigator.navigate('Home', {screen: 'Feed'});
       

      }catch(error){
        alert(error);
      }
     
    }
    

    return (
        <View style={{ flex:1,}}>
           <View style={styles.HeaderSpace} />
         <View style={styles.header} >
                      <TouchableOpacity style={styles.headerButton} onPress={handleBackPage}>
                          <Feather name='arrow-left' size={28} color='#000' />
                      </TouchableOpacity>
                      <View style={styles.headerText}>
                        <Text style={styles.textHeader}>Publicar</Text>
                      </View>
                 </View>
           <KeyboardAwareScrollView  contentContainerStyle={{alignItems:'center'}}   resetScrollToCoords={{ x: 0, y: 0 }}>
            
         
           {/* <View style={{flex: 1,alignItems: 'center'}}> */}
          
                 
                    <TouchableOpacity style={styles.selectButton} onPress={openImage}>
                        <Text style={styles.selectButtonText} >Selecionar imagem</Text>
                    </TouchableOpacity>
                  
                    { selectedImage && <Image style={styles.preview} source={{ uri: selectedImage.uri }} /> }
                    
                    {load && <ActivityIndicator style={styles.Indicator} size={40} color="#bdc3c7" />}
                  
                <TextInput
                          style={styles.input}
                          autoCorrect={false}
                          autoCapitalize="none"
                          placeholder="Nome do usuário"
                          placeholderTextColor="#999"
                          value={author}
                          onChangeText={author => setAuthor(author)}
                          />

                          <TextInput
                          style={styles.input}
                          autoCorrect={false}
                          autoCapitalize="none"
                          placeholder="Local da foto"
                          placeholderTextColor="#999"
                          value={place}
                          onChangeText={place => setPlace(place)}
                          />

                          <TextInput
                          style={styles.input}
                          autoCorrect={false}
                          autoCapitalize="none"
                          placeholder="Descrição da foto"
                          placeholderTextColor="#999"
                          value={description}
                          onChangeText={description => setDescription(description)}
                          />

                          <TextInput
                          style={styles.input}
                          autoCorrect={false}
                          autoCapitalize="none"
                          placeholder="Hashtags"
                          placeholderTextColor="#999"
                          value={hashtags}
                          onChangeText={hashtags => setHashtags(hashtags)}
                          />

          {button && 
                          <TouchableOpacity style={styles.shareButton} onPress={handleSubmit}>
                              <Text style={styles.shareButtonText} >Compartilhar</Text>
                          </TouchableOpacity>
          }
          {/* </View> */}
          </KeyboardAwareScrollView>
          </View>
    );
}

