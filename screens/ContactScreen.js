import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Right, Button, Icon, Left, Text, Footer, FooterTab, Form, Item, Label, Input, View } from "native-base";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={styles.header} androidStatusBarColor="#93c47d">
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
            <View style={{ ...styles.mainColor, backgroundColor: 'rgb(43,209,85)' }}></View>
            <Text>#2BD155</Text>
            <Text>(43,209,85)</Text>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button full style={styles.defaultBtn}
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
  header: {
    backgroundColor: '#93c47d',
  },
  defaultBtn: {
    backgroundColor: '#93c47d',
  },
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
