import React from "react";
import { Dimensions, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Left, Button, Icon, Body, Title, Right, Header, Container, Content, Text, View } from "native-base";
import { getAllSwatches } from "react-native-palette";
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';

import constants from "../constants";

export default class ColorsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={styles.header} androidStatusBarColor="#93c47d">
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

  removeColor = (swatch) => {
    this.setState((state) => ({
      swatches: state.swatches.filter((s) => s.color !== swatch.color),
    }));
  };

  renderInkButton = () => {
    const { swatches } = this.state;
    
    return (
      <Button full iconLeft style={styles.inkBtn} disabled={swatches.length !== 1}>
        <Icon type="FontAwesome" name="paint-brush" />
        {swatches.length === 1 ? <Text>Recommend Inks</Text> : <Text>Keep only one main color</Text>}
      </Button>
    );
  };

  renderColors = () => {
    const { dim, swatches } = this.state;
    const minItemWidth = 150;
    const itemWidth = dim.width / Math.floor(dim.width / minItemWidth);

    return (
      <View style={styles.colorList}>
        {swatches.map((swatch, i) => (
          <View key={i} style={{ ...styles.colorItem, width: itemWidth, backgroundColor: swatch.color }}>
            {swatches.length !== 1 && (
              <Button small transparent style={styles.colorItemRemoveBtn}
                onPress={() => this.removeColor(swatch)}
              >
                <Icon type="Ionicons" name="close" style={styles.colorItemRemoveTxt} />
              </Button>
            )}
            <Text style={styles.colorItemTitle}>{swatch.color.toUpperCase()}</Text>
          </View>
        ), this)}
      </View>
    );
  };

  render() {
    return (
      <Container>
        <Content>
          <LinearGradient colors={['#eeeeee', '#eeeeee']} style={styles.imageContainer}>
            {this.state.imageUri ? (
              <Image source={{ uri: this.state.imageUri }} style={styles.image} resizeMode="contain" />
            ) : (
              <Text style={styles.imagePlaceholderTxt}>Take a photo to analyze colors</Text>
            )}
            <Button bordered style={styles.cameraBtn} onPress={() => this.openCamera()}>
              <Icon type="FontAwesome" name="camera" style={styles.cameraIcon} />
            </Button>
          </LinearGradient>
          {this.state.imageUri && this.renderColors()}
          {!!this.state.swatches.length && this.renderInkButton()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#93c47d',
  },
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
  cameraIcon: {
    color: '#93c47d',
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
  colorItemRemoveBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  colorItemRemoveTxt: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 6,
    paddingTop: 2,
  },
  inkBtn: {
    backgroundColor: '#93c47d',
  },
});
