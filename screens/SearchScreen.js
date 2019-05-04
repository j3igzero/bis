import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Icon, Button, Input, Header, Body, Left, Right, Title } from 'native-base';
import { AppStyles } from '../lib/AppStyle';
import Autocomplete from '../lib/AutoComplete';
import { connect } from 'react-redux';

import { actionCreators } from '../redux';

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <Header
      noShadow
      style={{ backgroundColor: AppStyles.Color.header }}
    >
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon android="md-arrow-back" ios="ios-arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>Search...</Title>
      </Body>
    </Header>
  });

  constructor() {
    super();
    this.state = {
      query: '',
      datas: [
        {title: 'PMS Yellow C'},
        {title: 'PMS 106 C'},
        {title: 'PMS 108 C'},
        {title: 'PMS 123 C'},
        {title: 'PMS Bright Red C'},
        {title: 'PMS Rubine Red C'},
        {title: 'PMS 186 C'},
        {title: 'PMS 348 C'},
        {title: 'PMS 300 C'},
      ],
    }
  }

  _filterData(query) {
    const { datas } = this.state;
    const { dataTrending } = this.props;

    if (query === '') {
      return dataTrending;
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return datas.filter(film => (film.title.charAt(0).toLowerCase().trim() === query.charAt(0).toLowerCase().trim() && film.title.search(regex) >= 0));
  }
  _keyExtractor = (item, index) => item.title;

  _gotoPage(value) {
    const { navigation, dispatch } = this.props;
    dispatch(actionCreators.updateSearchQuery(value));
        
    navigation.navigate('ColorProfile');

    this.setState({
      query: value
    })
  }

  render() {

    const { query } = this.state;
    const data = this._filterData(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <Container>
        <Content padder>
          <View>
            <Autocomplete
              data={data.length === 1 && comp(query, data[0].title) ? [] : data}
              defaultValue={query}
              autoFocus={true}
              onChangeText={text => this.setState({ query: text })}
              keyExtractor={this._keyExtractor}
              inputContainerStyle={styles.overSearch}
              lineVertical={true}
              showTrending={true}
              trendingText={
                (query.length > 0) ?
                  null
                  :
                  <Text style={{ color: AppStyles.Color.border }}>TRENDING SEARCHES</Text>
              }
              renderIcon={
                <Image
                  resizeMode="contain"
                  source={require('../lib/Images/iconSearch.png')}
                />
              }
              renderItem={({ item, i }) => (
                <TouchableOpacity onPress={() => this._gotoPage(item.title)}
                  key={i}
                  style={styles.itemList}>
                  <View>
                    {
                      (query.length > 0) ?
                        <Icon type="FontAwesome" name="search" style={[AppStyles.iconInput, styles.iconClose]} />
                        :
                        <Icon type="MaterialCommunityIcons" name="trending-up" style={[AppStyles.iconInput, styles.iconClose]} />
                    }
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text key={item.title}>{item.title}</Text>
                  </View>
                  <View>
                    {
                      (query.length > 0) ?
                        <Icon type="Feather" name="arrow-up-left" style={[AppStyles.iconInput, styles.iconClose]} />
                        :
                        null
                    }
                  </View>
                </TouchableOpacity>
              )}
              renderIconClose={
                (query.length > 0) ?
                  <Icon type="EvilIcons" name="close" style={[AppStyles.iconInput, styles.iconClose]}
                    onPress={() => this.setState({ query: '' })}
                  />
                  :
                  <View style={[AppStyles.rowCenter]}>
                    <Icon type="FontAwesome" name="paperclip" style={[AppStyles.iconInput, styles.iconClose]}
                      onPress={() => this.setState({ query: '' })}
                    />
                    <Icon type="FontAwesome" name="camera" style={[AppStyles.iconInput, styles.iconClose]}
                      onPress={() => this.setState({ query: '' })}
                    />
                  </View>
              }
            />
          </View>

        </Content>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    dataTrending: state.search.dataTrending,
  };
}
export default connect(mapState)(SettingsScreen);

const styles = StyleSheet.create({
  overSearch: {
    // flexDirection: 'row',
    // alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.Color.border,
    paddingBottom: 5
  },
  iconClose: {
    // fontSize: 34,
    color: AppStyles.Color.icon
  },
  itemList: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.Color.border,
    margin: 0
  }
})