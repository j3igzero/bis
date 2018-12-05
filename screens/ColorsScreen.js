import React from "react";
import { Image, StyleSheet } from 'react-native';
import { Left, Button, Icon, Body, Title, Right, Header, Container, Content, Text, View, Card, CardItem } from "native-base";

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
    imageUri: undefined
  };

  componentDidMount = () => {
    this.goToCamera();
  };

  goToCamera = () => {
    this.props.navigation.navigate("Camera", {
      onImageUpdate: this.onImageUpdate
    });
  };

  onImageUpdate = ({ imageUri }) => {
    this.setState({ imageUri });
  };

  renderInkButton = () => (
    <Button iconLeft success style={{ alignSelf: "center", marginBottom: 8 }}>
      <Icon type="FontAwesome" name="paint-brush" />
      <Text>Recommend Inks</Text>
    </Button>
  );

  renderCameraButton = (text) => (
    <Button iconLeft style={{ alignSelf: "center" }} onPress={() => this.goToCamera()}>
      <Icon type="FontAwesome" name="camera" />
      <Text>{text}</Text>
    </Button>
  );

  renderNoImage = () => this.state.imageUri === undefined ? null : (
    <Card>
      <CardItem>
        <Body style={{ alignItems: "center" }}>
          <Text>Take a photo to analyze colors.</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          {this.renderCameraButton("Take a Photo")}
        </Body>
      </CardItem>
    </Card>
  );

  renderImage = () => (
    <Card>
      <CardItem cardBody style={styles.imageContainer}>
        <Image source={{ uri: this.state.imageUri }} style={styles.image} resizeMode="contain" />
      </CardItem>
      <CardItem>
        <Body style={{ flexDirection: "column" }}>
          {this.renderInkButton()}
          {this.renderCameraButton("Take another Photo")}
        </Body>
      </CardItem>
    </Card>
  );

  render() {
    return (
      <Container>
        <Content padder>
          {this.state.imageUri ? this.renderImage() : this.renderNoImage()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "stretch",
    backgroundColor: "#eeeeee",
    flex: 1,
    height: 200,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
});
