import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Body, Title, Right, Button, Icon, Left, Text, Footer, FooterTab, Form, Item, Label, Input, View } from "native-base";
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { actionCreators } from '../redux';
import { buildPMSData, postRequest } from '../redux/func';

const ContactSchema = Yup.object().shape({
  your_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  your_email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  your_telephone: Yup.string()
    .required('Required')
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
});


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
    loading: false,
  };

  formValues = {
    your_name: '', your_email: '', your_telephone: ''
  };

  componentWillMount() {
    const { your_name, your_email, your_telephone } = this.props;
    this.formValues = { your_name, your_email, your_telephone };
  }

  renderForm = ({ handleChange, handleSubmit, values, errors, touched }) => {

    // console.log(errors, touched);
    const { currentColor, colorData } = this.props;
    const err_name = (touched.your_name && !!errors.your_name);
    const err_email = (touched.your_email && !!errors.your_email);
    const err_telephone = (touched.your_telephone && !!errors.your_telephone);

    return (
      <Container>
        <Content padder>
          <Form style={styles.mbLg}>
            <Item fixedLabel error={err_name} >
              <Input  
                placeholder='Name *'
                onChangeText={handleChange('your_name')}
                value={values.your_name}
              />
              {err_name && <Icon name='close-circle' />}
            </Item>
            {err_name && <Text style={styles.errText}>{errors.your_name}</Text>}

            <Item fixedLabel error={err_email} >
              <Input 
                placeholder='Email *'
                onChangeText={handleChange('your_email')}
                value={values.your_email}
              />
              {err_email && <Icon name='close-circle' />}
            </Item>
            {err_email && <Text style={styles.errText}>{errors.your_email}</Text>}

            <Item fixedLabel error={err_telephone} last >
              <Input 
                placeholder='Telephone *'
                keyboardType='numeric'
                onChangeText={handleChange('your_telephone')}
                value={values.your_telephone}
              />
              {err_telephone && <Icon name='close-circle' />}
            </Item>
            {err_telephone && <Text style={styles.errText}>{errors.your_telephone}</Text>}
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
              onPress={handleSubmit}
            >
              <Text style={styles.defaultBtnTxt}>Send your request</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  };

  onContactRequest = async (values) => {
    this.setState({ loading: true });

    const { your_name, your_email, your_telephone } = values;
    const { currentColor } = this.props;
    this.props.dispatch(actionCreators.saveContactInfo({ your_name, your_email, your_telephone }));
    
    try {
      /** Waiting for backend... */
      const response = await postRequest('https://www.bostonindustrialsolutions.com/contact-to-quote/', {
        action: 'contact_to_quote',
        fields: { your_name, your_email, your_telephone, your_color: currentColor },
      });
      /** Fake api */
      // const response = await fetch('https://j3igzero-test.firebaseio.com/contact.json');  // temp for testing
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
    return (
      <Formik initialValues={this.formValues} onSubmit={this.onContactRequest} validationSchema={ContactSchema} >
        {this.renderForm}
      </Formik>
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
  errText: {
    color: 'red', fontSize: 11, marginLeft: 20
  },
});
