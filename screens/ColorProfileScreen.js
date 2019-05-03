import React from "react";
import {
  Platform, StyleSheet, Image, TouchableOpacity, Dimensions,
  ScrollView,
} from 'react-native';
import {
  Container, Content, Header, Body, Title, Right, Button,
  Icon, Left, View, Text, Input, Picker
} from "native-base";
import { AppStyles } from '../lib/AppStyle';
import Autocomplete from '../lib/AutoComplete';
const { width } = Dimensions.get('screen');
export default class ColorProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={styles.overLogo}>
        <Image
          source={require('../lib/Images/logo.png')}
        />
      </View>
    )
  });
  constructor() {
    super();
    this.state = {
      query: '',
      films: [
        { title: 'FloralWhite' },
        { title: 'ForestGreen' },
        { title: 'Fuchsia' },
        { title: 'Gold' },
        { title: 'GoldenRod' },
        { title: 'Gray' },
        { title: 'HotPink' },
        { title: 'HoneyDew' },
      ]
    }
  }
  _filterData(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => (film.title.charAt(0).toLowerCase().trim() === query.charAt(0).toLowerCase().trim() && film.title.search(regex) >= 0));
  }
  _keyExtractor = (item, index) => item.title;

  _gotoPage(page = 'Home') {
    const { navigation } = this.props;
    navigation.navigate(page);
  }
  render() {
    const { query } = this.state;
    const data = this._filterData(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <Container>
        <Content padder>
          <ScrollView>
            <View style={AppStyles.overInput}>
              <Icon type="FontAwesome" name="search" style={AppStyles.iconInput} />
              <Input style={styles.input}
                placeholder="Search..."
                placeholderTextColor='#333'
                onFocus={() => this._gotoPage('Search')}
              />
              <Icon type="FontAwesome" name="paperclip" style={AppStyles.iconInput} />
              <Icon type="FontAwesome" name="camera" style={[AppStyles.iconInput, { color: AppStyles.Color.icon, marginLeft: 8 }]} />
            </View>
            <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: AppStyles.Color.border, alignItems: 'center', marginVertical: 30 }}>
              <View style={{ height: 100, width: 100, backgroundColor: '#bf360c', marginRight: 20, }}></View>
              <View>
                <Text style={{ fontWeight: 'bold' }}>PMS 201 C</Text>
                <Text style={{ marginVertical: 3 }}>Hex: #9d2235</Text>
                <Text>rgb: (157, 34, 53)</Text>
              </View>
            </View>
            <View>
              <Text style={AppStyles.textLink}>Pantone Formula Guide - $160.00 | formula</Text>
            </View>
            <View style={[AppStyles.line, { marginTop: 25, }]}>
              <Text style={{ paddingTop: 15, paddingBottom: 10, color: '#9e9e9e' }}>Select Ink series to get <Text>Color matching formula</Text></Text>
            </View>

            <View style={[AppStyles.overDropdown]}>
              {/* <Icon type="FontAwesome" name="angle-down"
                style={{ paddingHorizontal: 15, borderRightWidth: 1, borderRightColor: '#000' }}
              /> */}
              <Picker mode="dropdown" note>
                <Picker.Item label="Bottom Industrial Solutions, Inc" value="key0" />
              </Picker>
            </View>
            <View style={[AppStyles.overDropdown]}>
              {/* <Icon type="FontAwesome" name="angle-down"
                style={{ paddingHorizontal: 15, borderRightWidth: 1, borderRightColor: '#000' }}
              /> */}
              <Picker mode="dropdown" note>
                <Picker.Item label="SE Series" value="key0" />
                <Picker.Item label="MG Series" value="key1" />
                <Picker.Item label="Nxt Series" value="key2" />
              </Picker>
            </View>
            <View style={styles.footerBottom}>
              <Button full transparent={true} style={[AppStyles.MainButton, { marginVertical: 10 }]}
                onPress={() => this._gotoPage('Formul')}>
                <Text style={AppStyles.TextButton}>GET COLOR MATCHING FORMUILA</Text>
              </Button>
              <View style={{ flexDirection: 'row' }}>
                <Left>
                  <Text style={[AppStyles.textLink, { fontSize: 14, }]}
                    onPress={() => this.props.navigation.navigate('Formul')}
                  >Disclaimer</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 14, fontStyle: 'italic' }}>Feedback/ update formula</Text>
                </Right>
              </View>
            </View>
          </ScrollView>

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
  itemList: {
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.Color.border,
    paddingVertical: 10
  },
  footerBottom: {
    marginTop: 30,
    zIndex: 0
  },
  list: {
    flex: 1,
    zIndex: 1,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: AppStyles.Color.border,
    // marginLeft: 50,
    paddingHorizontal: 10,
    position: 'absolute',
    width: width - 70,
    right: 0,
  },

});
