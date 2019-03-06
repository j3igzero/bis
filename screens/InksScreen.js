import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Right, Button, Icon, Left, Text, Footer, FooterTab } from "native-base";

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
          <Title>Recommend Inks</Title>
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
          
        </Content>
        <Footer>
          <FooterTab>
            <Button full style={styles.defaultBtn}
              onPress={() => this.props.navigation.navigate("Contact")}
            >
              <Text style={styles.defaultBtnText}>Contact to quote</Text>
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
  defaultBtnText: {
    color: '#ffffff',
  },
});
