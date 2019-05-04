import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Right, Button, Icon, Left, Text, Footer, FooterTab, View } from "native-base";
import Color from "color";
import { connect } from 'react-redux';

import { actionCreators } from '../redux';

class InksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon android="md-arrow-back" ios="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Recommend Inks</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate("Settings")}>
            <Icon android="md-settings" ios="ios-settings" />
          </Button>
        </Right>
      </Header>
    ),
  });

  state = {
    pantone: null,
    formulaData: [],
  };

  componentWillMount = () => {
    const { navigation, formula } = this.props;
    const pantone = 1;
  };

  renderFormula = () => {


    return (

      <View style={styles.textCenter}>
        <Text style={{ ...styles.strongTxt, ...styles.mxMd }}>HERE IS YOUR FORMULA</Text>
        <View style={styles.baseColorList}>
          
          <View style={styles.baseColorItem}>
            <View style={{ ...styles.baseColor, backgroundColor: 'rgb(255,237,0)' }}></View>
            <Text style={styles.strongTxt}>17%</Text>
            <Text style={styles.strongTxt}>Yellow</Text>
            <Text>(255,237,0)</Text>
          </View>
          <View style={styles.baseColorItem}>
            <View style={{ ...styles.baseColor, backgroundColor: 'rgb(0,237,255)' }}></View>
            <Text style={styles.strongTxt}>33%</Text>
            <Text style={styles.strongTxt}>Cyan</Text>
            <Text>(0,237,255)</Text>
          </View>
          <View style={styles.baseColorItem}>
            <View style={{ ...styles.baseColor, backgroundColor: 'rgb(0,181,0)' }}></View>
            <Text style={styles.strongTxt}>50%</Text>
            <Text style={styles.strongTxt}>Green</Text>
            <Text>(0,181,0)</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const selectedColor = navigation.getParam('selectedColor');
    const oColor = Color(selectedColor.hex);

    return (
      <Container>
        <Content padder>
          <View style={{ ...styles.textCenter, ...styles.mbSm }}>
            <Text style={{ ...styles.strongTxt, ...styles.mxMd }}>HOW TO MIX YOUR COLOR?</Text>
            <View style={{ ...styles.mainColor, backgroundColor: oColor.hex() }}></View>
            <Text>{selectedColor.pantone}</Text>
            <Text>{oColor.rgb().string().toUpperCase()}</Text>
          </View>
          {this.renderFormula()}           
        </Content>
        <Footer>
          <FooterTab>
            <Button full success
              onPress={() => this.props.navigation.navigate("Contact", { selectedColor })}
            >
              <Text style={styles.defaultBtnTxt}>Contact to quote</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    formula: state.formula
  };
};
export default connect(mapState)(InksScreen);

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
  mainColor: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  baseColorList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  baseColorItem: {
    flex: 1,
    alignItems: 'center',
  },
  baseColor: {
    width: 75,
    height: 75,
    marginBottom: 10,
  },
  mbSm: {
    marginBottom: 10,
  },
  mxMd: {
    marginVertical: 20,
  },
});
