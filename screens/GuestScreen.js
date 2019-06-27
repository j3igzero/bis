import React, { Component } from "react";
import { Platform, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Body, Footer, Title, Right, Button, Icon, Left, View, Text, Input } from "native-base";
import { AppStyles } from '../lib/AppStyle';

export default class GuestScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={styles.overLogo}>
        <Image
          source={require('../lib/Images/logo.png')}
        />
      </View>
    )
  });

  _gotoPage(page = 'Home') {
    const { navigation } = this.props;
    navigation.navigate(page);
  }

  render() {
    return (
      <Container>
        <Content padder>
          <View style={AppStyles.overInput}>
            <Icon type="FontAwesome" name="search" style={AppStyles.iconInput} />
            <Input style={styles.input}
              placeholder="Search..."
              placeholderTextColor='#333'
              onFocus={() => this._gotoPage('Search')}
            />
            <Icon type="FontAwesome" name="paperclip" style={AppStyles.iconInput} />
            <Icon type="FontAwesome" name="camera" style={[AppStyles.iconInput, { color: '#01579b', marginLeft: 8 }]} 
              onPress={() => this._gotoPage()}
            />
          </View>
          <View style={styles.actionList}>
            <View style={styles.actionItem}>
              <Button transparent={true} style={styles.actionButton}
                onPress={() => this._gotoPage()}
              >
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../lib/Images/color_picker.png')}
                />
                {/* <Icon type="Ionicons" name="md-color-palette" style={styles.actionIcon} /> */}
              </Button>
              <Text>Color Mixing</Text>
            </View>
            <View style={styles.actionItem}>
              <Button transparent={true} style={styles.actionButton}
                onPress={() => { }}
              >
                <Icon type="FontAwesome" name="shopping-cart" style={styles.actionIcon} />
              </Button>
              <Text>Products</Text>
            </View>
            <View style={styles.actionItem}>
              <Button transparent={true} style={styles.actionButton}>
                <Icon type="FontAwesome" name="group" style={styles.actionIcon} />
              </Button>
              <Text>Community</Text>
            </View>
            <View style={styles.actionItem}>
              <Button transparent={true} style={styles.actionButton}>
                <Icon type="FontAwesome" name="newspaper-o" style={styles.actionIcon} />
              </Button>
              <Text>News</Text>
            </View>

          </View>
          <Button full transparent={true} style={AppStyles.MainButton}>
            <Text style={AppStyles.TextButton}>Sign Up</Text>
          </Button>
          <View style={styles.footerPage}>
            <Text style={[AppStyles.textLink, { marginVertical: 20 }]}>Already have an account?</Text>
            <View>
              <Text style={styles.copyRight}>By signing up, you agree with the
              <Text style={AppStyles.textLink}> Terms of Service</Text> and
              <Text style={AppStyles.textLink}> Privacy Policy</Text>
              </Text>
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
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    alignSelf: 'center',
    // width: 100,
    // height: 100,
    // borderWidth: 2,
    backgroundColor: 'white',
    // borderColor: 'green',
    justifyContent: 'center',
  },
  actionIcon: {
    color: '#333',
    fontSize: 40,
  },

  // Thanh Nguyen
  overLogo: {
    alignItems: 'center',
    paddingVertical: 10
  },


  input: {
    // height: 30,
    // borderColor: 'red',
    // borderWidth: 1,
  },

  footerPage: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  copyRight: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
  },
  // 
});
