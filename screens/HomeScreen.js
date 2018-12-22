import React from "react";
import { Platform, StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Right, Button, Icon, Left, View, Text } from "native-base";

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
          <View style={styles.actionList}>
            <View style={styles.actionItem}>
              <Button style={styles.actionButton}
                onPress={() => this.props.navigation.navigate("Colors")}
              >
                <Icon type="FontAwesome" name="camera" style={styles.actionIcon} />
              </Button>
              <Text>Camera</Text>
            </View>
            <View style={styles.actionItem}>
              <Button style={styles.actionButton}
                onPress={() => this.props.navigation.navigate("History")}
              >
                <Icon type="FontAwesome" name="history" style={styles.actionIcon} />
              </Button>
              <Text>History</Text>
            </View>
            <View style={styles.actionItem}>
              <Button style={styles.actionButton}>
                <Icon type="FontAwesome" name="shopping-cart" style={styles.actionIcon} />
              </Button>
              <Text>Shop</Text>
            </View>
            <View style={styles.actionItem}>
              <Button style={styles.actionButton}>
                <Icon type="FontAwesome" name="newspaper-o" style={styles.actionIcon} />
              </Button>
              <Text>News</Text>
            </View>
            <View style={styles.actionItem}>
              <Button style={styles.actionButton}>
                <Icon type="FontAwesome" name="comments" style={styles.actionIcon} />
              </Button>
              <Text>Message</Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  actionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  actionItem: {
    width: 150,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: 'green',
    justifyContent: 'center',
  },
  actionIcon: {
    color: '#3F51B5',
    fontSize: 40,
  },
});
