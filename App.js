import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class App extends React.Component {

  state={
    hasCameraPermission : null,
    type : Camera.Constants.Type.back,
  }

//---- appler pour ouvrir un compenent ----//
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  takePicture () {
    this.camera.takePictureAsync({ skipProcessing: true }).then((data) => {
      this.setState({
          takeImageText: "PICTURE TAKEN",
          photo: data.uri
      }, console.log(data.uri))
  })
  }

  render(){
    const { hasCameraPermission } = this.state;
    //---- L'autorisation est refusé
    if(hasCameraPermission == false ){
      return (
        <View style={styles.container}>
          <Text>L'autorisation est interdit</Text>
        </View>
      );
    }else{
      return(
          <View style={styles.container}>
            {/*----- flex ==  weight */}
            <Camera style={{flex:1 }} type={this.state.type}  
              ref={ref => { this.camera = ref; }}
              type={this.state.type} 
            >
              <TouchableOpacity 
                style={styles.change}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottom}
                onPress={this.takePicture.bind(this)}
              >
                
              </TouchableOpacity>
            </Camera>
          </View>
      );
    }   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  bottom: {
    marginBottom: 36,
    padding: 5,
    height: 50,
    width: 50,  //The Width must be the same as the height
    borderRadius:50, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'rgb(250, 250, 250)',
    alignSelf: 'center',//----- centraliser -----//
    //----- buttoiop de la page -----//
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom : 0,
  },
  change: {
    marginBottom: 36,
    padding: 5,
    height: 50,
    width: 50,  //The Width must be the same as the height
    borderRadius:50, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'rgb(250, 250, 250)',
    //----- buttoiop de la page -----//
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom : 0,
  }
});
