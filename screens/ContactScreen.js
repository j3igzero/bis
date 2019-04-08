import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Right, Button, Icon, Left, Text, Footer, FooterTab, Form, Item, Label, Input, View } from "native-base";
import Color from "color";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon android="md-arrow-back" ios="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Contact to quote</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate("Settings")}>
            <Icon android="md-settings" ios="ios-settings" />
          </Button>
        </Right>
      </Header>
    ),
  });

  render() {
    const { navigation } = this.props;
    const selectedColor = navigation.getParam('selectedColor');
    const oColor = Color(selectedColor.hex);

    return (
      <Container>
        <Content padder>
          <Form style={styles.mbLg}>
            <Item inlineLabel>
              <Label>Your Name *</Label>
              <Input />
            </Item>
            <Item inlineLabel>
              <Label>Your Email *</Label>
              <Input />
            </Item>
            <Item inlineLabel last>
              <Label>Your Telephone *</Label>
              <Input />
            </Item>
          </Form>
          <View style={{ ...styles.textCenter, ...styles.mbSm }}>
            <Text style={{ ...styles.strongTxt, ...styles.mxMd }}>COLOR YOU WANT TO MIX</Text>
            <View style={{ ...styles.mainColor, backgroundColor: selectedColor.hex }}></View>
            <Text>{selectedColor.pantone}</Text>
            <Text>{oColor.rgb().string().toUpperCase()}</Text>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button full success
              onPress={() => this.props.navigation.navigate("ContactSuccess")}
            >
              <Text style={styles.defaultBtnTxt}>Send your request</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  defaultBtnTxt: {
    color: '#ffffff',
  },
  textCenter: {
    alignItems: 'center',
  },
  strongTxt: {
    fontWeight: 'bold',
  },
  mainColor: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  mbSm: {
    marginBottom: 10,
  },
  mbLg: {
    marginBottom: 30,
  },
  mxMd: {
    marginVertical: 20,
  },
});
