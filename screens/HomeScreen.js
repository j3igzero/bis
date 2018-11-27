import React from "react";
import { Container, Content, Text, Header, Body, Title, Right, Button, Icon } from "native-base";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Body>
          <Title>Home</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate("Settings")}>
            <Icon name="settings" />
          </Button>
        </Right>
      </Header>
    ),
  });

  render() {
    return (
      <Container>
        <Content padder>
          <Text>Home Screen</Text>
        </Content>
      </Container>
    );
  }
}
