import React, { Component } from "react";
import { Platform, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Body, Footer, Title, Right, Button, Icon, Left, View, Text, Input } from "native-base";
import { connect } from 'react-redux';
import { actionCreators } from '../redux';

import { AppStyles } from '../lib/AppStyle';


class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={styles.overLogo}>
        <Image
          source={require('../lib/Images/logo.png')}
        />
      </View>
    )
  });

  componentWillMount() {
    this.props.dispatch(actionCreators.getColorFormula);
  }

  _gotoPage(name) {
    const { navigation } = this.props;
    navigation.navigate(name);
  }

  render() {
    return (
      <Container>
        <Content padder>
          <View style={styles.center}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../lib/Images/color_picker.png')}
            />
            <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>
              Ink Color matching assistant
            </Text>
            <Text style={{ color: AppStyles.Color.textGray, fontSize: 14, marginBottom: 15, textAlign: 'center' }}>
              To get mixing ratios, search colors by PMS #, or <Text style={{ fontWeight: 'bold' }}>
                Take a Photo
              </Text> for analysis, or attach an image to select which color to match
            </Text>
            <View style={AppStyles.overInput}>
              <Icon type="FontAwesome" name="search" style={AppStyles.iconInput} />
              <Input style={styles.input}
                placeholder="Search or take a photo..."
                placeholderTextColor='#333'
                onFocus={() => this._gotoPage('Search')}
              />
              <Icon type="FontAwesome" name="paperclip" style={AppStyles.iconInput} />
              <Icon type="FontAwesome" name="camera" style={[AppStyles.iconInput, { color: AppStyles.Color.Main, marginLeft: 8 }]} />
            </View>
            <Text style={{ fontSize: 24, marginVertical: 10 }}>Or</Text>
            <Text style={{ color: AppStyles.Color.textGray, fontSize: 14, marginBottom: 10 }}>Take a photo of a color on an item you'd like to match</Text>
            <Icon type="FontAwesome" name="camera" style={styles.actionIcon}
              onPress={() => this._gotoPage('Colors')} />
            <Icon type="FontAwesome" name="history" style={styles.actionIcon}
              onPress={() => this._gotoPage('History')} />
            <Text style={{ fontSize: 14, marginTop: -10 }}>History</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect()(HomeScreen);

const styles = StyleSheet.create({
  actionIcon: {
    color: '#01579b',
    fontSize: 40,
    marginVertical: 10
  },
  // Thanh Nguyen
  overLogo: {
    alignItems: 'center',
    paddingVertical: 10
  },
  textButton: {
    color: '#fff'
  },
  // overInput: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   paddingHorizontal: 5,
  //   borderRadius: 30
  // },
  // iconInput: {
  //   fontSize: 24,
  //   color: '#444',
  //   marginHorizontal: 10
  // },
  input: {
    // height: 30,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  center: {
    alignContent: 'center',
    alignItems: 'center'
  }
  // 
});
