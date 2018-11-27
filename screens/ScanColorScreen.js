import React from "react";
import { Container, Content, Text, Header, Body, Title, Right, Button, Icon, Left } from "native-base";

export default class ScanColorScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Scan Color</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate("Settings")}>
            <Icon name="setting" />
          </Button>
        </Right>
      </Header>
    ),
  });

  render() {
    return (
      <Container>
        <Content padder>
          <Text>Scan Color Screen</Text>
        </Content>
      </Container>
    );
  }
}
