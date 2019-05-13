import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Right, Button, Icon, Left, Text, Footer, FooterTab, Form, Item, Label, Input, View } from "native-base";
import { connect } from 'react-redux';

import { actionCreators } from '../redux';
import { buildPMSData, postRequest } from '../redux/func';

class ContactScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon android="md-arrow-back" ios="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Contact to quote</Title>
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
    your_name: null, your_email: null, your_telephone: null,
    loading: false,
  };

  componentWillMount() {
    const { your_name, your_email, your_telephone } = this.props;
    this.setState({ your_name, your_email, your_telephone });
  }

  onContactRequest = async () => {
    this.setState({ loading: true });

    const { your_name, your_email, your_telephone } = this.state;
    const { currentColor } = this.props;
    this.props.dispatch(actionCreators.saveContactInfo({ your_name, your_email, your_telephone }));
    
    try {
      // const response = await postRequest('https://j3igzero-test.firebaseio.com/contact.json', {
      //   action: 'contact_to_quote',
      //   fields: { your_name, your_email, your_telephone, your_color: currentColor },
      // });
      const response = await fetch('https://j3igzero-test.firebaseio.com/contact.json');  // temp for testing
      const response_json = await response.json();
      console.log(response_json);

      if (response_json.result) {
        this.props.navigation.navigate("ContactSuccess");
      }
      else {
        throw (`${response_json.message}\nPlease try again!`);
      }
    }
    catch (e) {
      alert('Failed to contact! Please try again!');
      // console.log('Contact failed!');
      console.log(e);
    }
    this.setState({ loading: false });
  };

  render() {
    const { currentColor, colorData } = this.props;

    return (
      <Container>
        <Content padder>
          <Form style={styles.mbLg}>
            <Item fixedLabel>
              <Label>Name *</Label>
              <Input  
                onChangeText={your_name => this.setState({ your_name })}
                value={this.state.your_name}
              />
            </Item>
            <Item fixedLabel>
              <Label>Email *</Label>
              <Input 
                onChangeText={your_email => this.setState({ your_email })}
                value={this.state.your_email}
              />
            </Item>
            <Item fixedLabel last>
              <Label>Telephone *</Label>
              <Input 
                keyboardType='numeric'
                onChangeText={your_telephone => this.setState({ your_telephone })}
                value={this.state.your_telephone}
              />
            </Item>
          </Form>
          <View style={{ ...styles.textCenter, ...styles.mbSm }}>
            <Text style={{ ...styles.strongTxt, ...styles.mxMd }}>COLOR YOU WANT TO MIX</Text>
            <View style={{ ...styles.mainColor, backgroundColor: colorData.hex }}></View>
            <Text>{colorData.short_name}</Text>
            <Text>{colorData.rgb.toUpperCase()}</Text>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button full success disabled={this.state.loading}
              onPress={this.onContactRequest}
            >
              <Text style={styles.defaultBtnTxt}>Send your request</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapState = state => {
  const { currentColor } = state.formula;

  if (!!currentColor) {
    return {
      ...state.contact,
      currentColor,
      colorData: buildPMSData(currentColor),
    };
  }
  return { ...state.contact, currentColor };
};
export default connect(mapState)(ContactScreen);

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
  mbSm: {
    marginBottom: 10,
  },
  mbLg: {
    marginBottom: 30,
  },
  mxMd: {
    marginVertical: 20,
  },
});
