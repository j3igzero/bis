import React from "react";
import { AsyncStorage, StyleSheet, Image, Dimensions, TouchableOpacity, Alert } from "react-native";
import { Container, Content, Header, Left, Button, Icon, Body, Title, Right, View, Text } from "native-base";
import moment from "moment";

import constants from "../constants";

export default class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const selectedImages = params.selectedImages || [];
    const isSelecting = !!selectedImages.length;

    return {
      header: (
        <Header style={styles.header} androidStatusBarColor="#93c47d">
          <Left>
            {isSelecting ? (
              <Button transparent onPress={() => params.handleCancelSelect()}>
                <Icon android="md-close" ios="ios-close" />
              </Button>
            ) : (
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon android="md-arrow-back" ios="ios-arrow-back" />
              </Button>
            )}
          </Left>
          <Body>
            <Title>{isSelecting ? selectedImages.length : 'History'}</Title>
          </Body>
          <Right>
            {isSelecting ? (
              <Button transparent onPress={() => params.handleDeleteSelected()}>
                <Icon android="md-trash" ios="ios-trash" />
              </Button>
            ) : (
              <Button transparent onPress={() => navigation.navigate("Settings")}>
                <Icon android="md-settings" ios="ios-settings" />
              </Button>
            )}
          </Right>
        </Header>
      ),
    };
  };

  state = {
    dates: null,
    dim: {},
    selectedImages: [],
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.onDimChange);
    this.onDimChange();

    this.props.navigation.setParams({
      handleCancelSelect: this.handleCancelSelect.bind(this),
      handleDeleteSelected: this.handleDeleteSelected.bind(this),
    });

    this.loadImages();
  }

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this.onDimChange);
  };

  onDimChange = () => {
    this.setState({
      dim: Dimensions.get('window')
    });
  };

  imageToDates(images) {
    let dates = [];

    let _images = images.sort((a, b) => {
      return b.timestamp - a.timestamp;
    }).map((image) => {
      image.date = moment(image.timestamp).format('ll');
      return image;
    });

    _images.forEach((image) => {
      if (!dates.length || image.date !== dates[dates.length - 1].date) {
        dates.push({
          date: image.date,
          images: [],
        });
      }
      dates[dates.length - 1].images.push(image);
    });

    return dates;
  }

  loadImages() {
    AsyncStorage.getItem(constants.IMAGES_STORAGE_KEY, (error, result) => {
      let dates = [];

      if (error) {
        console.warn('Get images error', error);
      } else if (result) {
        let images = JSON.parse(result);
        dates = this.imageToDates(images);
      }

      this.setState({ dates });
    });
  }

  handleSelectedImagesChange() {
    this.props.navigation.setParams({
      selectedImages: this.state.selectedImages,
    });
  }

  deleteSelected() {
    const { dates, selectedImages } = this.state;
    const selectedTimestamps = selectedImages.map((i) => i.timestamp);
    let newImages = [];

    dates.forEach((date) => {
      const images = date.images.filter((i) => selectedTimestamps.indexOf(i.timestamp) === -1);
      newImages = newImages.concat(images);
    });

    const _dates = this.imageToDates(newImages);

    this.setState({
      dates: _dates,
      selectedImages: [],
    }, () => {
      this.handleSelectedImagesChange();
    });

    AsyncStorage.setItem(constants.IMAGES_STORAGE_KEY, JSON.stringify(newImages), (error) => {
      if (error) {
        console.warn('Save images error', error);
      }
    });
  }

  handleDeleteSelected() {
    Alert.alert('Delete selected photos?', 'Deleted photos can not be recovered', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: this.deleteSelected.bind(this) },
    ]);
  }

  handleCancelSelect() {
    this.setState({
      selectedImages: [],
    }, () => {
      this.handleSelectedImagesChange();
    });
  }

  handleLongPressImage(image) {
    if (this.state.selectedImages.length) { // isSelecting
      this.handlePressImage(image);
      return;
    }

    this.setState((state) => {
      const { selectedImages } = state;
      const foundImage = selectedImages.find((i) => i.timestamp === image.timestamp);
      if (!foundImage) {
        selectedImages.push(image);
      }
      return { selectedImages };
    }, () => {
      this.handleSelectedImagesChange();
    });
  }

  handlePressImage(image) {
    const { selectedImages } = this.state;
    if (selectedImages.length) { // isSelecting
      let isSelected = false;
      for (let i = selectedImages.length - 1; i >= 0; i--) {
        if (selectedImages[i].timestamp === image.timestamp) {
          isSelected = true;
          selectedImages.splice(i, 1);
          break;
        }
      }
      if (!isSelected) {
        selectedImages.push(image);
      }
      this.setState({ selectedImages }, () => {
        this.handleSelectedImagesChange();
      });
    } else {
      this.props.navigation.navigate('Colors', { image });
    }
  }

  renderImageList(images) {
    const { width } = this.state.dim;
    const minItemWidth = 100;
    const margin = 8;
    const itemsPerRow = Math.floor(width / (minItemWidth + margin));
    const itemWidth = (width - ((itemsPerRow + 1) * margin)) / itemsPerRow;
    const imageItemStyle = {
      ...styles.imageItem,
      width: itemWidth,
      height: itemWidth,
      marginRight: margin,
      marginBottom: margin,
    };

    const { selectedImages } = this.state;
    const isSelecting = !!selectedImages.length;

    return (
      <View style={styles.imageList}>
        {images.map((image) => {
          const isSelected = !!selectedImages.find((i) => i.timestamp === image.timestamp);

          return (
            <TouchableOpacity key={image.timestamp} style={imageItemStyle}
              onPress={() => this.handlePressImage(image)}
              onLongPress={() => this.handleLongPressImage(image)}
            >
              <Image source={{ uri: image.path }} style={styles.imageItemImg} resizeMode="contain" />
              {isSelecting && !isSelected && (
                <View style={styles.selectingIconContainer}>
                  <Icon type="FontAwesome" name="circle-o" style={styles.selectingIcon} />
                </View>
              )}
              {isSelected && (
                <View style={{ ...styles.selectingIconContainer, backgroundColor: 'white' }}>
                  <Icon type="FontAwesome" name="check-circle" style={styles.selectedIcon} />
                </View>
              )}
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }

  renderDateList() {
    if (this.state.dates == null) {
      return null;
    }
    if (!this.state.dates.length) {
      return (
        <View style={styles.notFound}>
          <Text style={styles.notFoundTxt}>You have not taked any photos</Text>
        </View>
      );
    }
    return (
      <View>
        {this.state.dates.map((date) => (
          <View key={date.date}>
            <Text style={styles.dateItemDate}>{date.date}</Text>
            {this.renderImageList(date.images)}
          </View>
        ))}
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          {this.renderDateList()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#93c47d',
  },
  notFound: {
    padding: 8,
    alignItems: 'center',
  },
  notFoundTxt: {
    color: 'gray',
    fontStyle: 'italic',
  },
  dateItemDate: {
    padding: 8,
    paddingBottom: 0,
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingLeft: 8,
  },
  imageItem: {
    backgroundColor: 'gray',
  },
  imageItemImg: {
    flex: 1,
  },
  selectingIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    top: 4,
    left: 4,
    justifyContent: 'center',
  },
  selectingIcon: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  selectedIcon: {
    color: '#93c47d',
  },
});
