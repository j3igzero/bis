import React from "react";
import { Image, StyleSheet } from 'react-native';
import { Left, Button, Icon, Body, Title, Right, Header, Container, Content, Text, View } from "native-base";
import { getAllSwatches } from "react-native-palette";

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
    swatches: [],
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
    this.setState({ imageUri }, () => {
      console.log("this.state.imageUri " + this.state.imageUri);
      if (!this.state.imageUri) {
        return;
      }
      getAllSwatches({}, this.state.imageUri.substr(8), (error, swatches) => {
        if (error) {
          console.log(error);
        } else {
          swatches.sort((a, b) => {
            return b.population - a.population;
          });
          swatches.forEach((swatch) => {
            console.log(swatch.swatchInfo);
          });
          this.setState({ swatches });
        }
      });
    });
  };

  renderInkButton = () => (
    <Button full iconLeft success>
      <Icon type="FontAwesome" name="paint-brush" />
      <Text>Recommend Inks</Text>
    </Button>
  );

  renderColors = () => (
    <View padder style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      {this.state.swatches.map((swatch, i) => (
        <View key={i} style={{ width: 150, height: 100, flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
          <View style={{ width: 80, height: 80, backgroundColor: swatch.color }} />
          <Text style={{ fontSize: 10 }}>{swatch.titleTextColor}</Text>
        </View>
      ))}
    </View>
  );

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.imageContainer}>
            {this.state.imageUri ? (
              <Image source={{ uri: this.state.imageUri }} style={styles.image} resizeMode="contain" />
            ) : (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'grey', fontStyle: 'italic' }}>Take a photo to analyze colors</Text>
              </View>
            )}
            <Button bordered style={{ position: 'absolute', bottom: 4, right: 4, borderColor: 'green', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} onPress={() => this.goToCamera()}>
              <Icon type="FontAwesome" name="camera" />
            </Button>
          </View>
          {this.state.imageUri && (
            <View>
              {this.renderColors()}
              {this.renderInkButton()}
            </View>
          )}
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
