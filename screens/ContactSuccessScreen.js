import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Right, Button, Icon, Left, Text, Footer, FooterTab, View } from "native-base";

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
          <Title>Thank you</Title>
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
          <View style={styles.textCenter}>
            <Text style={{ ...styles.strongTxt, ...styles.mxMd }}>CONGRATULATION !!!</Text>
            <Text>Your request is sent successfully !</Text>
            <Text>Our experts will contact us for more details</Text>
            <Text style={{ ...styles.strongTxt, ...styles.mxMd }}>THANK YOU !</Text>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button full success
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text style={styles.defaultBtnTxt}>Our products & services</Text>
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
  mxMd: {
    marginVertical: 20,
  },
});
