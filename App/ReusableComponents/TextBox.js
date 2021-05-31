import React from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import { colors } from '../utils/constant';



const TextBox = props => {
    const {
        placeholder,
        onChangeText
    } = props;
    return (
        <TextInput

            autoCorrect={false}
            autoCapitalize={'none'}
            editable={props.disable}
            placeholder={placeholder}
            onChangeText={(text) => props.onChangeText(text)}
            style={props.style ? props.style : () => style.textInput(props)}>

        </TextInput>
    );
};

export default TextBox;

const style = StyleSheet.create({

    textInput: (props) => {
        return {
            backgroundColor: props.color ? props.color : colors.white,
            borderRadius: 8,
            padding: 10
        }
    }

})
