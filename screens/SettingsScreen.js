import React from 'react';
import { Container, Content } from 'native-base';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <Container>
        <Content padder>
        </Content>
      </Container>
    );
  }
}
