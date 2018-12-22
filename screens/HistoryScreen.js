import React from "react";
import { AsyncStorage, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { Container, Content, Header, Left, Button, Icon, Body, Title, Right, View, Text } from "native-base";
import moment from "moment";

import constants from "../constants";

export default class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon android="md-arrow-back" ios="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>History</Title>
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
    dates: null,
    dim: {},
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.onDimChange);
    this.onDimChange();
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

  loadImages() {
    AsyncStorage.getItem(constants.IMAGES_STORAGE_KEY, (error, result) => {
      let dates = [];

      if (error) {
        console.warn('Get images error', error);
      } else if (result) {
        let images = JSON.parse(result).sort((a, b) => {
          return b.timestamp - a.timestamp;
        }).map((image) => {
          image.date = moment(image.timestamp).format('ll');
          return image;
        });
  
        images.forEach((image) => {
          if (!dates.length || image.date !== dates[dates.length - 1].date) {
            dates.push({
              date: image.date,
              images: [],
            });
          }
          dates[dates.length - 1].images.push(image);
        });
      }

      this.setState({ dates });
    });
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

    return (
      <View style={styles.imageList}>
        {images.map((image) => (
          <TouchableOpacity key={image.timestamp} style={imageItemStyle}
            onPress={() => this.props.navigation.navigate('Colors', { image })}
          >
            <Image source={{ uri: image.path }} style={styles.imageItemImg} resizeMode="contain" />
          </TouchableOpacity>
        ))}
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
});
