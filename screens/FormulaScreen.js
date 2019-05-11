import React from "react";
import { Platform, StyleSheet, Image, Dimensions } from 'react-native';
import {
  Container, Content, Header, Body, Title, Right, Button,
  Icon, Left, View, Text, Input, Picker
} from "native-base";
import { connect } from 'react-redux';
import { actionCreators } from '../redux';

const { width } = Dimensions.get('screen');
import { AppStyles } from '../lib/AppStyle';
import { buildPMSData } from '../redux/func';

class FormulaScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={styles.overLogo}>
        <Image
          source={require('../lib/Images/logo.png')}
        />
      </View>
    )
  });

  componentDidMount() {
    const { formulaData, dispatch } = this.props;
    if (!formulaData) {
      dispatch(actionCreators.getColorFormula);
    }
  }

  renderColorItems = ({ name, hex, percent }, i) => {
    return (
      <View style={styles.rowColor}>
        <View style={{ justifyContent: 'center', minHeight: 30, width: width/5 }}>
          <Text style={{ fontSize: 11, textAlign: 'center' }}>{name}</Text>
        </View>
        <View style={[styles.rowItem, { backgroundColor: hex }]}>
          <Text style={AppStyles.TextButton}>{percent}%</Text>
        </View>
        <Text>{percent*10}</Text>
      </View>
    );
  };

  renderFormula() {
    const { formulaData, loading } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {!formulaData ? 
          <Text>
            {loading ? 'Analyzing...' : 'No formula found!'}
          </Text> : 
          formulaData.map(this.renderColorItems)
        }

      </View>
    );
  }

  _gotoPage(page = 'Home') {
    const { navigation } = this.props;
    navigation.navigate(page);
  }

  render() {
    const { currentColor, data } = this.props;

    if (!data) {
      return (
        <Container>
          <Content padder>
            <View style={{}}>
              <Text style={{ color: '#bdbdbd', fontSize: 14 }}>No data found!</Text>
            </View>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content padder>
          <View style={{}}>
            <Text style={{ color: '#bdbdbd', fontSize: 14 }}>SE SERIES CUSTOM COLOR FORMULA | {data.name}</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            marginVertical: 15, alignItems: 'center', justifyContent: 'center'
          }}>
            <View style={{ width: width / 2, height: 80, backgroundColor: data.hex, alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', }}>
            </View>
          </View>

          <View>
            <Text style={{ color: 'red', fontStyle: 'italic' }}>Caution! <Text style={{ color: '#2196f3', fontStyle: 'italic' }}> Color Match 10 grams first to test the accuracy of formula before full mixing</Text></Text>
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
          {this.renderFormula()}

          <View style={styles.footerBottom}>
            <Button full transparent={true} style={[AppStyles.MainButton, { marginVertical: 10 }]}
              onPress={() => this._gotoPage('Contact')}
            >
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

const mapState = state => {
  // console.log(state);
  const { currentColor, data } = state.formula;

  if (!!currentColor) {
    return {
      loading: state.loading,
      currentColor,
      data: buildPMSData(currentColor),
      formulaData: data[currentColor],
    };
  }
  return { currentColor };
};
export default connect(mapState)(FormulaScreen);

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
    width: width / 5,
    height: width / 7,
    // marginVertical: 10,
    marginTop: 5,
    marginBottom: 10,
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
