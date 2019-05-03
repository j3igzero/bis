import React from "react";
import { Platform, StyleSheet, Image, Dimensions } from 'react-native';
import {
  Container, Content, Header, Body, Title, Right, Button,
  Icon, Left, View, Text, Input, Picker
} from "native-base";
const { width } = Dimensions.get('screen');
import { AppStyles } from '../lib/AppStyle';
export default class FormulaScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={styles.overLogo}>
        <Image
          source={require('../lib/Images/logo.png')}
        />
      </View>
    )
  });

  render() {
    return (
      <Container>
        <Content padder>
          <View style={{}}>
            <Text style={{ color: '#bdbdbd', fontSize: 14 }}>SE SERIES  CUSTOM COLOR FORMULA | PMS 201</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            marginVertical: 15, alignItems: 'center', justifyContent: 'center'
          }}>
            <View style={{ width: width / 2, height: 80, backgroundColor: '#bf360c', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', }}>
            </View>
          </View>

          <View>
            <Text style={{ color: 'red', fontStyle: 'italic' }}>Caution! <Text style={{ color: '#2196f3', fontStyle: 'italic' }}> Color Match 10 grams first   to test the accuracy offormula before full mixing</Text></Text>
          </View>
          <View style={[AppStyles.line, { marginTop: 10 }]}></View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 }}>
            <Text>Desired Qty:</Text>
            <View style={styles.overSelect}>
              <Picker>
                <Picker.Item label="Grams" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
              </Picker>
            </View>
            <View style={[styles.overInput]}>
              <Input placeholder={"1,000.000"}
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.rowColor}>
              <Text>351 RUBINE</Text>
              <View style={[styles.rowItem, { backgroundColor: '#bf360c' }]}>
                <Text style={AppStyles.TextButton}>90%</Text>
              </View>
              <Text>900</Text>
            </View>

            <View style={styles.rowColor}>
              <Text>315 YELLOW</Text>
              <View style={[styles.rowItem, { backgroundColor: '#fdd835' }]}>
                <Text style={AppStyles.TextButton}>9%</Text>
              </View>
              <Text>90</Text>
            </View>

            <View style={styles.rowColor}>
              <Text>300 BLACK</Text>
              <View style={[styles.rowItem, { backgroundColor: 'black' }]}>
                <Text style={AppStyles.TextButton}>1%</Text>
              </View>
              <Text>10</Text>
            </View>
          </View>

          <View style={styles.footerBottom}>
            <Button full transparent={true} style={[AppStyles.MainButton, { marginVertical: 10 }]}>
              <Text style={AppStyles.TextButton}>GET QUOTE</Text>
            </Button>
            <View style={{ flexDirection: 'row' }}>
              <Left>
                <Text style={[AppStyles.textLink, { fontSize: 14, }]}>Disclaimer</Text>
              </Left>
              <Right>
                <Text style={{ fontSize: 14, fontStyle: 'italic' }}>Feedback/ update formula</Text>
              </Right>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  // Thanh Nguyen
  overLogo: {
    alignItems: 'center',
    paddingVertical: 10
  },
  registerButton: {
    backgroundColor: '#80cbc4',
    borderWidth: 1,
    borderColor: AppStyles.Color.border,
    borderRadius: 4
  },
  rowColor: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowItem: {
    width: width / 4,
    height: width / 7,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: AppStyles.Color.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  overSelect: {
    flex: 0.4,
    borderWidth: 1,
    borderColor: AppStyles.Color.border,
    height: 40,
    alignContent: 'center',
    justifyContent: 'center'
  },
  overInput: {
    // flexDirection: 'row',
    // alignItems: 'center',
    flex: 0.5,
    borderWidth: 1,
    borderColor: AppStyles.Color.border,
    paddingHorizontal: 5,
    height: 40,

    alignContent: 'center',
    justifyContent: 'center'
    // borderRadius: 30
  },
  footerBottom: {
    marginTop: 15
  }
});
