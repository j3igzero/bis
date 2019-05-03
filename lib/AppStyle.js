
import { Platform, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export const AppStyles = {
    Color: {
        header:'#80cbc4',
        Main: '#01579b',
        textGray: '#616161',
        border: '#e0e0e0',
        icon: '#01579b'
    },
    line: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    overInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 5,
        borderRadius: 30
    },
    iconInput: {
        fontSize: 24,
        color: '#444',
        marginHorizontal: 10
    },
    textLink: {
        color: '#42a5f5',
        textDecorationLine: 'underline',
    },
    MainButton: {
        backgroundColor: '#80cbc4',
        borderWidth: 1,
        borderColor: '#757575',
        borderRadius: 4,
        height: 52
    },
    TextButton: {
        color: '#fff'
    },
    lineVertical: {
        height: 35,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginHorizontal: 5
    },
    overDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingRight: 10,
        marginVertical: 5
    },
    rowCenter:{
        flexDirection: 'row',
        alignItems: 'center'
    }
}
// export const AppStyles = StyleSheet.create({
//     MainColor: '#01579b'
// })