import React from "react";
import { Platform, StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Right, Button, Icon, Grid, Col, Row, Left } from "native-base";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        {Platform.OS === 'ios' ? <Left /> : null}
        <Body>
          <Title>Home</Title>
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
          <Grid>
            <Row>
              <Col style={styles.col}>
                <Button bordered primary full style={styles.button}
                  onPress={() => this.props.navigation.navigate("Colors")}
                >
                  <Icon type="FontAwesome" name="camera" style={styles.icon} />
                </Button>
              </Col>
              <Col style={styles.col}>
                <Button bordered primary full style={styles.button}>
                  <Icon type="FontAwesome" name="shopping-cart" style={styles.icon} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col style={styles.col}>
                <Button bordered primary full style={styles.button}>
                  <Icon type="FontAwesome" name="newspaper-o" style={styles.icon} />
                </Button>
              </Col>
              <Col style={styles.col}>
                <Button bordered primary full style={styles.button}>
                  <Icon type="FontAwesome" name="comments" style={styles.icon} />
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  col: {
    height: 150,
    padding: 8,
  },
  button: {
    borderColor: 'green',
    height: 134,
  },
  icon: {
    fontSize: 50,
  }
});
