import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAwareScrollView,
    Dimensions,
    ViewPropTypes as RNViewPropTypes
} from 'react-native';
import {
    Icon
} from "native-base";
import { AppStyles } from './AppStyle';
const ViewPropTypes = RNViewPropTypes || View.propTypes;
const { width, height } = Dimensions.get('screen');

class Autocomplete extends Component {
    static propTypes = {
        ...TextInput.propTypes,
        containerStyle: ViewPropTypes.style,
        data: PropTypes.array,
        hideResults: PropTypes.bool,
        inputContainerStyle: ViewPropTypes.style,
        keyboardShouldPersistTaps: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        listContainerStyle: ViewPropTypes.style,
        listStyle: ViewPropTypes.style,
        onShowResults: PropTypes.func,
        onStartShouldSetResponderCapture: PropTypes.func,
        renderItem: PropTypes.func,
        keyExtractor: PropTypes.func,
        renderSeparator: PropTypes.func,
        renderTextInput: PropTypes.func,
        flatListProps: PropTypes.object
    };

    static defaultProps = {
        data: [],
        defaultValue: '',
        keyboardShouldPersistTaps: 'always',
        onStartShouldSetResponderCapture: () => false,
        renderItem: ({ item }) => <Text>{item}</Text>,
        renderSeparator: null,
        renderTextInput: props => <TextInput {...props} />,
        flatListProps: {}
    };

    constructor(props) {
        super(props);
        this.state = { data: props.data };
        this.resultList = null;
        this.textInput = null;

        this.onRefListView = this.onRefListView.bind(this);
        this.onRefTextInput = this.onRefTextInput.bind(this);
        this.onEndEditing = this.onEndEditing.bind(this);
    }

    componentWillReceiveProps({ data }) {
        this.setState({ data });
    }

    onEndEditing(e) {
        this.props.onEndEditing && this.props.onEndEditing(e);
    }

    onRefListView(resultList) {
        this.resultList = resultList;
    }

    onRefTextInput(textInput) {
        this.textInput = textInput;
    }

    blur() {
        const { textInput } = this;
        textInput && textInput.blur();
    }

    focus() {
        const { textInput } = this;
        textInput && textInput.focus();
    }

    renderResultList() {
        const { data } = this.state;
        const {
            listStyle,
            renderItem,
            keyExtractor,
            renderSeparator,
            keyboardShouldPersistTaps,
            flatListProps,
            onEndReached,
            onEndReachedThreshold
        } = this.props;

        return (
            <FlatList
                ref={this.onRefListView}
                data={data}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                renderSeparator={renderSeparator}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                style={[styles.list, listStyle]}
                {...flatListProps}
            />
        );
    }

    renderTextInput() {
        const { renderTextInput, style, placeholder = 'Search...', autoFocus = false } = this.props;
        const props = {
            style: [styles.input, style],
            ref: this.onRefTextInput,
            placeholder: placeholder,
            autoFocus: autoFocus,
            onEndEditing: this.onEndEditing,
            ...this.props
        };

        return renderTextInput(props);
    }

    render() {
        const { data } = this.state;
        const {
            containerStyle,
            hideResults,
            inputContainerStyle,
            listContainerStyle,
            onShowResults,
            onStartShouldSetResponderCapture,
            lineVertical,
            renderIcon,
            renderIconClose,
            trendingText,
            showTrending,
        } = this.props;
        const showResults = data.length > 0;
        onShowResults && onShowResults(showResults);
        return (
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.inputContainer, inputContainerStyle]}>
                    <View style={[{
                        flexDirection: 'row', alignItems: 'center',
                    }]}>
                        {renderIcon}
                        {/* <Icon type="FontAwesome" name="angle-down"
                            style={{ paddingHorizontal: 15, borderRightWidth: 1, borderRightColor: '#000' }}
                        /> */}
                        {
                            (lineVertical) ?
                                <View style={AppStyles.lineVertical}></View>
                                : null
                        }
                        {this.renderTextInput()}
                        {renderIconClose}
                    </View>
                </View>
                {trendingText}
                {!hideResults && (
                    <View
                        style={[listContainerStyle]}
                        onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
                    >
                        {showResults && this.renderResultList()}
                    </View>
                )}
            </View>
        );
    }
}

const border = {
    borderColor: AppStyles.Color.border,
    borderRadius: 1,
    borderWidth: 1
};

const androidStyles = {
    container: {
        flex: 1
    },
    inputContainer: {
        // ...border,
        marginBottom: 0,
        // marginTop: 10
        // marginVertical:10
    },
    list: {
        // ...border,
        backgroundColor: 'white',
        borderTopWidth: 0,
        marginLeft: 0,
        // marginLeft: 50,
        // left:30,
        // paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 0
    }
};

const iosStyles = {
    container: {
        zIndex: 1
    },
    inputContainer: {
        ...border
    },
    input: {
        backgroundColor: 'white',
        // height: 40,
        // paddingLeft: 3
    },
    list: {
        ...border,
        backgroundColor: 'white',
        borderTopWidth: 0,
        left: 0,
        position: 'absolute',
        right: 0
    }
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        // height: 40,
        flex: 1
        // paddingLeft: 3
    },
    ...Platform.select({
        android: { ...androidStyles },
        ios: { ...iosStyles }
    })
});

export default Autocomplete;