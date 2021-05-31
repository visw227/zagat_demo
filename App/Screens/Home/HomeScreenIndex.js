import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Alert,RefreshControl } from 'react-native'
import TextBox from '../../ReusableComponents/TextBox'
import RepoList from '../../ReusableComponents/RepoList'
import { fetchRepos } from '../../Services/FetchRepos'
import { postFavorites, getFavorites, deleteFavorites } from '../../Services/RepoServer'
import { store } from '../../StateManagement/store'
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from '../../utils/constant'

import Ionicons from 'react-native-vector-icons/Ionicons'
Ionicons.loadFont()

export default class HomeScreen extends React.Component {
    // static contextType = store;
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            textInputValue: '',
            noData: true,
            fetching : false
        }
    }

    componentDidMount = () => {


        if(!__DEV__){
           
            Alert.alert(
                'Attention !',
                `I'm using ngrok(free version) for exposing local server. It will only make 40 connections in a min`)
        }

        AsyncStorage.getItem('favorites').then((value) => {
            if (value) {

                // Favs api is called in the Favorites screen.. 
                // this Heelps to get acess to the favs list and count before invoking the api ...
              

                this.context.dispatch({ type: 'ADD_FAVORITES', payload: JSON.parse(value) })
                this.context.dispatch({ type: 'SET_FAVS_COUNT', payload: JSON.parse(value).length })

                    // But I think of a edge case here. what of user logged in from a new device ? -----
                    // ----- Then it is good to get access to the favorites from the server..?


            }
        });

        this._unsubscribe = this.props.navigation && this.props.navigation.addListener('focus', () => {

            // This below tweak is important because, if you delete favorites in the favorites screnn -
            // - those list items should uppdate their saved status here in this screen ---

            // example :  I typed "doge coin" --> added to Favs [the repo iteem will change its "add" btn to "reemove" btn] ->
            // -- Navigated to FavsScreen. Removed "doge coin" reepo from Favs...
            // Then Came back here. Now the dogeCoin repo should have "add" button not "remove" btn


            // Another solution can be having a listner and dipatching it to Context, etc etc...
            // --- I felt this could be the easy and quick solution in this case

            if (this.state.textInputValue.length > 0) {
                this._fetchRepos(this.state.textInputValue)
            }
        });

    }

    componentWillUnmount() {
        this._unsubscribe && this._unsubscribe();
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.data && prevState.data) {
            if (prevState.data.length !== this.state.data.length) {

                this.setState(state => {
                    let bool = state.data.length > 0;

                    return {
                        noData: !bool
                    }
                })

            }
        }
    }
    _fetchRepos = (text) => {
        this.setState({fetching:true})
        fetchRepos(text, (res) => {

            // Here Context is helpful getting favs list without invoking the endpoint...

            let favs = this.context.state.favorites;

            // if the same reepo which is already added to Favs is populated, dont show ---
            // ---- add button again. Instead show remove button

            favs.length > 0 && favs.forEach(element => {

                res.items.forEach(ele => {
                    if (ele.id == element.id) {
                        // console.log("matched>>>>")
                        ele.saved = true
                    }
                })
            });

            res && this.setState({
                data: res.items,
                textInputValue: text,
                fetching:false
            })

        })
    }


    onChangeText = (text) => {



        if (text && text.length > 3) {
            this._fetchRepos(text)
        }
        else if (this.state.textInputValue == '') {
            this.setState({
                data: [],
                textInputValue: text
            })
        }
        else {
            this.setState({
                data: [],
                textInputValue: text
            })
        }




    }

    removeFromFavs = (item) => {


        try {
            deleteFavorites(item, (response) => {

                if (response.status == 200) {

                    this.context.dispatch({ type: 'DECR_FAVS' })



                    let favs = this.context.state.favorites.filter((ele, index) => {

                        if (ele.id.toString().trim() !== item.id.toString().trim()) {

                            return ele

                            // alert(ele.id)
                        }
                    })

                    // console.log("new favs>>>", _favs)
                    this.context.dispatch({ type: 'ADD_FAVORITES', payload: favs })
                    this.context.dispatch({ type: 'SET_FAVS_COUNT', payload: favs.length })


                    this.setState(state => {
                        let _data = state.data.map(ele => {
                            if (ele.id == item.id) {
                                ele.saved = false
                                return ele
                            } else return ele
                        });

                        return {
                            data: _data
                        }

                    })


                }
            })

        } catch (exp) {
            console.log("exception>>", exp)
        }
    }

    addToFavs = (item) => {

        if (this.context.state.favoritesCount < 10) {

            let data = {
                "id": item.id.toString(),
                "fullName": item.full_name ? item.full_name : "n/a",
                "createdAt": item.created_at ? item.created_at : "n/a",
                "stargazersCount": item.stargazers_count ? item.stargazers_count : 0,
                "language": item.language ? item.language : "n/a",
                "url": item.url ? item.url : "n/a",
                "description": item.description ? item.description : "n/a"
            }

            postFavorites(data, (res) => {

                if (res.status == 200) {

                    // this.context.dispatch({ type: 'INCR_FAVS' })

                    let favs = this.context.state.favorites;

                    favs.push(data);

                    this.context.dispatch({ type: 'ADD_FAVORITES', payload: favs })
                    this.context.dispatch({ type: 'SET_FAVS_COUNT', payload: favs.length })


                    this.setState(state => {
                        let _data = state.data.map((item, index) => {
                            if (item.id == res.data.id) {

                                item.saved = true;
                                return item

                            }
                            return item;
                        });
                        return {
                            data: _data
                        }
                    })
                }
            })

        }

        else {
            alert("You cannot add more than 10 items to favs. Delete unwanted favs and try adding new")
        }

    }

    onPressButton = async (item) => {

        if (item.saved) {



            Alert.alert(
                'Remove from Favorites',
                `do you want to remove ${item.name} from favorites?`,
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Yes', onPress: () => {

                            this.removeFromFavs(item)


                        }
                    },
                ],
                { cancelable: false },
            );

            return;
        }


        this.addToFavs(item)


    }


    render() {

        return (

            <View style={style.container}>

                <TextBox
                    placeholder='Search Github'
                    onChangeText={(text) => this.onChangeText(text)}
                    style={style.textInput}>
                </TextBox>
                {this.state && this.state.noData && (
                    <View style={{ alignSelf: 'center' }}>
                        <Ionicons style={style.searchIcon} name="search" color={'blue'} size={42} />
                        <Text style={style.welcomeText}>Search github for repositories</Text>
                    </View>
                )}
                <RepoList
                 refreshControl={ <RefreshControl tintColor={colors.white} refreshing={this.state.fetching} onRefresh={() => this._fetchRepos(this.state.textInputValue)} />}
                    data={this.state.data}
                    button={'add-circle-outline'} // ionicon names are preffeered
                    onPressButton={(item) => this.onPressButton(item)}
                    navigation={this.props.navigation} />
            </View>



        )
    }

}

HomeScreen.contextType = store;

const style = StyleSheet.create({
    container: {
        margin: 0,
        width: '100%',
        height: '100%'
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        margin: 30,
        marginBottom: 10
    },
    welcomeText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: '500'

    },
    searchIcon: {
        marginTop: 40,
        marginVertical: 30,
        alignSelf: 'center',
        color: 'white'
    }

})
