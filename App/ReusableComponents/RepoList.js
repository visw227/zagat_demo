import React, { useContext, useEffect } from 'react'
import { Text, TextInput, View, StyleSheet, FlatList, TouchableOpacity, Linking, Platform } from 'react-native'
import { fetchRepos, sampleData } from '../Services/FetchRepos'
import { store } from '../StateManagement/store';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { colors, fonts } from '../utils/constant'

Ionicon.loadFont()



const RepoList = props => {
    const {
        placeholder,
        onChangeText,
        data
    } = props;

    const globalState = useContext(store);
    const { dispatch } = globalState

    useEffect(() => {
    }, [])


    const renderItem = (item) => {



        return (
            <View 
          
            style
                ={{
                    borderRadius: 4,
                    backgroundColor: 'white',
                    padding: 10,
                    marginVertical: 2
                }}>
                <TouchableOpacity onPress={() => Linking.openURL(
                    // The html_url will make more sense to open. But thee prompt says to save repo url...
                    item.html_url ? item.html_url : item.url
                ).catch(err => {
                    Alert.alert('Link error' + '\n' + this.state.userDetails.business_website_url)
                })}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            numberOfLines={2}
                            style={style.titleText}
                        >{item.full_name ? item.full_name : "n/a"}</Text>

                        <View>
                            <Ionicon
                                testID="btn-button"
                                name={props.button ? item.saved ? 'ios-remove-circle-outline' : 'add-circle-outline' : null}
                                onPress={() => {
                                    props.onPressButton(item)
                                }}
                                style={{ color: !item.saved ? 'green' : 'red' }} size={24}
                            ></Ionicon>
                        </View>

                    </View>

                    <Text
                        numberOfLines={2}
                        style={style.subText}
                    >{item.description ? item.description : "n/a"}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 4,
                            justifyContent: 'flex-start'
                        }}>
                            <Ionicon
                                style={{ color: 'gold', marginRight: 10 }}
                                name='star'
                                size={17} />
                            <Text style={style.subText}>{item.stargazers_count ? item.stargazers_count : 0}</Text>
                        </View>

                        <Text style={style.subText}>Language : {item.language ? item.language : "n/a"}</Text>

                    </View>

                </TouchableOpacity>

            </View>
        )

    }

    return (
        <View style={{ flex: 1, marginTop: 0 }}>


            <FlatList

             refreshControl={props.refreshControl}
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    width: '85%',
                    alignSelf: 'center'
                }}
                data={props.data}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    );
};

export default RepoList;

const style = StyleSheet.create({

    textInput: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
        margin: 30
    },
    titleText: {
        fontWeight: '600',
        fontSize: 17,
        fontFamily: fonts.regular,
        maxWidth: '90%'
    },
    subText: {
        fontWeight: '500',
        fontSize: 13,
        margin: 1,
        maxWidth: '80%'
    }

})
