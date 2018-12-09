import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon, Button } from 'native-base';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const flashIcons = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
  torch: 'highlight'
};

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    type: 'back',
  };
  
  toggleFacing = () => this.setState({ type: this.state.type === 'back' ? 'front' : 'back' });

  toggleFlash = () => this.setState({ flash: flashModeOrder[this.state.flash] });

  goBack = (imageUri) => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onImageUpdate({ imageUri });
  };

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      this.goBack(data.uri);
    }
  };

  renderTopBar = () => (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
        <Icon type="MaterialIcons" name={flashIcons[this.state.flash]} style={{ fontSize: 32, color: "white" }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFacing}>
        <Icon type="Ionicons" name="ios-reverse-camera" style={{ fontSize: 32, color: "white" }} />
      </TouchableOpacity>
    </View>
  );

  renderBottomBar = () => (
    <View style={{flex: 0, flexDirection: 'row', paddingBottom: 8 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button transparent style={{ paddingHorizontal: 16 }} onPress={() => this.goBack(null)}>
          <Text style={{ color: "white" }}>Cancel</Text>
        </Button>
      </View>
      <TouchableOpacity style = {{ flex: 1, alignItems: "center", justifyContent: "center" }} onPress={this.takePicture.bind(this)}>
        <Icon type="Ionicons" name="ios-radio-button-on" style={{ fontSize: 70, color: "white" }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
    </View>
  );
  
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={this.state.type}
            flashMode={this.state.flash}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          {this.renderTopBar()}
          {this.renderBottomBar()}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  topBar: {
    flex: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
