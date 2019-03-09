import React from "react";
import { Dimensions, Image, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
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
  };

  componentDidMount = () => {
    Dimensions.addEventListener('change', this.onDimChange);
    this.onDimChange();

    const image = this.props.navigation.getParam('image');
    if (image) {
      this.onImageUpdate({ imageUri: image.path });
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

  openCamera = () => {
    ImagePicker.openCamera({
      cropperToolbarTitle: 'Select Area',
      width: 2000,
      height: 2000,
      cropping: true
    }).then((image) => {
      this.saveImage(image);
      this.onImageUpdate({ imageUri: image.path })
    }).catch((error) => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.warn(error);
      }
    });
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

  onImageUpdate = ({ imageUri }) => {
    this.setState({ imageUri }, () => {
      if (!this.state.imageUri) {
        return;
      }
      getAllSwatches({}, this.state.imageUri.substr(8), (error, swatches) => {
        if (error) {
          console.error(error);
        } else {
          swatches.sort((a, b) => {
            return b.population - a.population;
          });
          this.setState({ swatches });
        }
      });
    });
  };

  renderInkButton = () => {
    const { selectedColor } = this.state;
    
    return (
      <Button full success disabled={selectedColor == null}
        onPress={() => this.props.navigation.navigate("Inks", {
          color: selectedColor,
        })}
      >
        <Text style={styles.defaultBtnTxt}>
          {selectedColor != null ? 'Recommend Inks' : 'Tap the correct color to select'}
        </Text>
      </Button>
    );
  };

  selectColor = (swatch) => {
    this.setState({ selectedColor: swatch.color });
  };

  renderColors = () => {
    const { dim, swatches, selectedColor } = this.state;
    const minItemWidth = 150;
    const itemWidth = dim.width / Math.floor(dim.width / minItemWidth);

    return (
      <View style={styles.colorList}>
        {swatches.map((swatch, i) => {
          const isSelected = swatch.color === selectedColor;
          const color = new Color(swatch.color);

          return (
            <TouchableOpacity key={i} style={{ ...styles.colorItem, width: itemWidth, backgroundColor: color.hex() }}
              onPress={() => this.selectColor(swatch)}
            >
              {isSelected && (
                <View style={styles.selectingIconContainer}>
                  <Icon type="FontAwesome" name="check-circle" style={styles.selectedIcon} />
                </View>
              )}
              <Text style={styles.colorItemTitle}>{color.hex()}</Text>
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
