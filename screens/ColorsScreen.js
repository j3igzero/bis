import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Left, Button, Icon, Body, Title, Right, Header, Container, Content, Text, View, Footer, FooterTab } from "native-base";
import { getAllSwatches } from "react-native-palette";
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import Color from "color";

import constants from "../constants";

export default class ColorsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon android="md-arrow-back" ios="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Scan Color</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate("Settings")}>
            <Icon android="md-settings" ios="ios-settings" />
          </Button>
        </Right>
      </Header>
    ),
  });

  state = {
    imageUri: undefined,
    dim: {},
    swatches: [],
    selectedColor: null,
    image: null
  };

  componentDidMount = () => {
    Dimensions.addEventListener('change', this.onDimChange);
    this.onDimChange();

    const image = this.props.navigation.getParam('image');
    if (image) {
      this.onImageUpdate(image);
    } else {
      this.openCamera();
    }
  };

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this.onDimChange);
  };

  onDimChange = () => {
    this.setState({
      dim: Dimensions.get('window')
    });
  };

  openCamera = async () => {

    try {
      const image = await ImagePicker.openCamera({
        cropperToolbarTitle: 'Select Area',
        width: 2000,
        height: 2000,
        cropping: true
      });
      this.onImageUpdate(image)
    }
    catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.warn(error);
      }
    }
  };

  onImageUpdate = (image) => {

    const imageUri = image.path;
    if (!imageUri) {
      return;
    }
    getAllSwatches({}, imageUri.substr(8), (error, swatches) => {
      if (error) {
        console.error(error);
      } 
      else {
        swatches.sort((a, b) => {
          return b.population - a.population;
        });
        this.setState({ imageUri, swatches, image });
      }
    });
  };

  renderPantoneButton = () => {
    const { selectedColor } = this.state;
    
    return (
      <Button full success disabled={selectedColor == null}
        onPress={() => {
          this.props.navigation.navigate("Pantone", { hex: selectedColor.hex(), image: this.state.image });
        }}
      >
        <Text style={styles.defaultBtnTxt}>
          {selectedColor != null ? 'Go to pantone color list' : 'Tap the correct color to analyze'}
        </Text>
      </Button>
    );
  };

  selectColor = (color) => {
    this.setState({ selectedColor: color });
  };

  renderColors = () => {
    const { dim, swatches, selectedColor } = this.state;
    const minItemWidth = 150;
    const itemWidth = dim.width / Math.floor(dim.width / minItemWidth);

    return (
      <View style={styles.colorList}>
        {swatches.map((swatch, i) => {
          const color = new Color(swatch.color);
          const isSelected = selectedColor != null && color.hex() === selectedColor.hex();
          const color_display = color.hex();

          return (
            <TouchableOpacity key={i} style={{ ...styles.colorItem, width: itemWidth, backgroundColor: color.hex() }}
              onPress={() => this.selectColor(color)}
            >
              {isSelected && (
                <View style={styles.selectingIconContainer}>
                  <Icon type="FontAwesome" name="check-circle" style={styles.selectedIcon} />
                </View>
              )}
              <Text style={styles.colorItemTitle}>{color_display}</Text>
            </TouchableOpacity>
          );
        }, this)}
      </View>
    );
  };

  render() {

    return (
      <Container>
        <Content>
          <LinearGradient colors={['#3F51B5', '#5cb85c']} style={styles.imageContainer}>
            {this.state.imageUri ? (
              <Image source={{ uri: this.state.imageUri }} style={styles.image} resizeMode="contain" />
            ) : (
              <Text style={styles.imagePlaceholderTxt}>Take a photo to analyze colors</Text>
            )}
            <Button bordered style={styles.cameraBtn} onPress={() => this.openCamera()}>
              <Icon type="FontAwesome" name="camera" />
            </Button>
          </LinearGradient>
          {this.state.imageUri && this.renderColors()}
        </Content>
        {!!this.state.swatches.length && (
          <Footer>
            <FooterTab>
              {this.renderPantoneButton()}
            </FooterTab>
          </Footer>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 228,
  },
  image: {
    height: 220,
    width: 220,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderTxt: {
    color: 'white',
    fontStyle: 'italic',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderColor: 'green',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  colorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  colorItem: {
    width: null,
    height: 150,
    flexDirection: 'row',
  },
  colorItemTitle: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    fontSize: 10,
    padding: 4,
  },
  defaultBtnTxt: {
    color: '#ffffff',
  },
  selectingIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    top: 4,
    left: 4,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  selectedIcon: {
    color: '#3F51B5',
  },
});
