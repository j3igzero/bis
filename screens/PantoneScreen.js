import React from "react";
import { Dimensions, Image, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Left, Button, Icon, Body, Title, Right, Header, Container, Content, Text, View, Footer, FooterTab } from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import Color from "color";

import constants from "../constants";
import convert from '../lib/convert';

export default class PantoneScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon android="md-arrow-back" ios="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Scan Pantone Color</Title>
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
    dim: {},
    swatches: [],
    selectedColor: null,
    mainColor: null
  };

  componentDidMount = () => {
    Dimensions.addEventListener('change', this.onDimChange);
    this.onDimChange();

    const hex = this.props.hex || this.props.navigation.getParam('hex') || '#ffffff';   // #4fab2a
    const swatches = convert.getPMSList(hex.substr(1), 32);
    // console.log(swatches);

    this.setState({swatches, mainColor: hex});
  };

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this.onDimChange);
  };

  onDimChange = () => {
    this.setState({
      dim: Dimensions.get('window')
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

  renderInkButton = () => {
    const { selectedColor } = this.state;
    
    return (
      <Button full success disabled={selectedColor == null}
        onPress={() => {
          const image = {...this.props.navigation.getParam('image'), selectedColor};
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

  selectColor = (pantone, hex) => {
    const selectedColor = {pantone, hex};
    this.setState({ selectedColor });
  };

  renderColors = () => {
    const { dim, swatches, selectedColor } = this.state;
    const minItemWidth = 150;
    const itemWidth = dim.width / Math.floor(dim.width / minItemWidth);

    return (
      <View style={swatches.length ? styles.colorList : {alignItems: 'center', justifyContent: 'center'} }>
        {swatches.length ? (swatches.map((pantone, i) => {
          const hex = '#'+ convert.PMS2RGB(pantone);
          const isSelected = selectedColor != null && hex === selectedColor.hex;

          return (
            <TouchableOpacity key={i} style={{ ...styles.colorItem, width: itemWidth, backgroundColor: hex }}
              onPress={() => this.selectColor(pantone, hex)}
            >
              {isSelected && (
                <View style={styles.selectingIconContainer}>
                  <Icon type="FontAwesome" name="check-circle" style={styles.selectedIcon} />
                </View>
              )}
              <Text style={styles.colorItemTitle}>{pantone}</Text>
            </TouchableOpacity>
          );
        }, this)) : (
          <Text>No PMS color</Text>
        )}
      </View>
    );
  };

  render() {

    return (
      <Container>
        <Content>
          <LinearGradient colors={['#3F51B5', '#5cb85c']} style={styles.imageContainer}>
            {this.state.mainColor ? (
              <View style={{ ...styles.image, backgroundColor: this.state.mainColor }} />
            ) : (
              <Text style={styles.imagePlaceholderTxt}>Take a photo to analyze colors</Text>
            )}
          </LinearGradient>
          {this.state.mainColor && this.renderColors()}
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
