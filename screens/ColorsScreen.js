import React from "react";
import { Dimensions, Image, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Left, Button, Icon, Body, Title, Right, Header, Container, Content, Text, View, Footer, FooterTab } from "native-base";
import { getAllSwatches } from "react-native-palette";
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import Color from "color";

import constants from "../constants";
import network from "../lib/network";

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
    color_display: null,
    image: null
  };

  componentDidMount = () => {
    Dimensions.addEventListener('change', this.onDimChange);
    this.onDimChange();

    const image = this.props.navigation.getParam('image');
    if (image) {
      // this.props.image = image;
      this.onImageUpdate(image);
    } else {
      this.openCamera();
    }
  };

  componentDidUpdate = async () => {
    if (this.state.imageUri) {
      // Get pantone colors from API
      const { swatches } = this.state;

      let aColors = [];
      swatches.map((swatch) => {
        if (swatch.pantone) {
          return;
        }
        const color = new Color(swatch.color);
        aColors.push(color.hex());
        swatch.hex = color.hex();
        return swatch;
      });
      if (aColors.length == 0) {
        return;
      }
      // console.log(aColors);

      let response = await network.post('https://bostonindustrialsolutions.com/convert.php', {
        action: 'rgb-to-pantone',
        params: {
          colors: aColors
        }
      });
      const aRes = await response.json();
      // console.log(aRes);
      swatches.map((swatch) => {
        swatch.pantone = aRes[swatch.hex];
        return swatch;
      });
      this.setState({ swatches });
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
      // this.saveImage(image);
      this.onImageUpdate(image)
    }
    catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.warn(error);
      }
    }
  };

  saveImage = (image) => {
    AsyncStorage.getItem(constants.IMAGES_STORAGE_KEY, (error, result) => {
      if (error) {
        console.warn('Get images error', error);
      }
      let images = result ? JSON.parse(result) : [];
      images.push({
        ...image,
        timestamp: +new Date(),
      });
      AsyncStorage.setItem(constants.IMAGES_STORAGE_KEY, JSON.stringify(images), (error) => {
        if (error) {
          console.warn('Save images error', error);
        }
      });
    });
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

  renderInkButton = () => {
    const { selectedColor, color_display } = this.state;
    
    return (
      <Button full success disabled={selectedColor == null}
        onPress={() => {
          const image = {...this.state.image, selectedColor: {pantone: color_display, hex: selectedColor.hex()}};
          this.saveImage(image);
          this.props.navigation.navigate("Inks", { selectedColor });
        }}
      >
        <Text style={styles.defaultBtnTxt}>
          {selectedColor != null ? 'Recommend Inks' : 'Tap the correct color to select'}
        </Text>
      </Button>
    );
  };

  selectColor = (color, color_display) => {
    this.setState({ selectedColor: color, color_display });
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
          const color_display = swatch.pantone ? swatch.pantone : null;

          return (
            <TouchableOpacity key={i} style={{ ...styles.colorItem, width: itemWidth, backgroundColor: color.hex() }}
              onPress={() => this.selectColor(color, color_display)}
            >
              {isSelected && (
                <View style={styles.selectingIconContainer}>
                  <Icon type="FontAwesome" name="check-circle" style={styles.selectedIcon} />
                </View>
              )}
              <Text style={styles.colorItemTitle}>{color_display || 'Analyzing...'}</Text>
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
              {this.renderInkButton()}
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
