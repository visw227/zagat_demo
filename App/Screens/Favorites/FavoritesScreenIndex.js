import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import TextBox from '../../ReusableComponents/TextBox'
import RepoList from '../../ReusableComponents/RepoList'
import { store } from '../../StateManagement/store'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../utils/constant'
MaterialCommunityIcons.loadFont()

import { getFavorites, deleteFavorites } from '../../Services/RepoServer'
import { fetchRepos } from '../../Services/FetchRepos'

export default class FavoritesScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sort: 'dsc',
            data: [],
            filter: [],
            noFavs: true,
            textInputValue: ''

        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // do something
            this.getRepoFavs()
        });


    }


    componentDidUpdate(prevProps, prevState) {


        if (prevState.filter.length !== this.state.filter.length) {

            this.setState(state => {
                let bool = state.filter.length > 0;

                return {
                    noFavs: !bool
                }
            })

        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    getRepoFavs = (noApiCall) => {

        this.setState({ fetching: true })

        // Have to restrict too many api calls
        if (noApiCall && noApiCall !== null) {

            let repoList = this.state.filter.sort((a, b) => {
                //error cheeck for undefined values
                let aStars = a.stargazersCount && a.stargazersCount !== null ? a.stargazersCount : 0
                let bStars = b.stargazersCount && b.stargazersCount !== null ? b.stargazersCount : 0
                if (this.state.sort == 'asc') {
                    return bStars - aStars
                } else return aStars - bStars
            })
            this.setState({
                // data: repoList,
                filter: repoList,
                fetching: false
            })

        }
        else {
            getFavorites((resp) => {
                let repoList = resp.repos.sort((a, b) => {
                    let aStars = a.stargazersCount && a.stargazersCount !== null ? a.stargazersCount : 0
                    let bStars = b.stargazersCount && b.stargazersCount !== null ? b.stargazersCount : 0
                    if (this.state.sort == 'asc') {
                        return bStars - aStars
                    } else return aStars - bStars
                })
                this.setState({
                    data: repoList,
                    fetching: false,
                    filter: repoList
                }, () => this.context.dispatch({ type: 'ADD_FAVORITES', payload: this.state.filter }))
            })

        }

    }

    removeFromFavs = (item) => {

        // let _this = this
        //this.state.
        deleteFavorites(item, (response) => {

            if (response.status == 200) {


                this.setState(state => {
                    let _data = state.filter.filter((ele, index) => {
                        if (ele.id !== item.id) {

                            return ele
                        }
                    });

                    this.context.dispatch({ type: 'ADD_FAVORITES', payload: _data })
                    this.context.dispatch({ type: 'SET_FAVS_COUNT', payload: _data.length })



                    return {
                        // data: _data, // no need to set data because data is only access or store from API response. That will anyway reflet by DELETE api
                        filter: _data
                    }

                })


            }
        })
    }

    onPressButton = (item) => {

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
    }

    onFilterFavs = (text) => {
        this.setState(state => {
            let filtered = state.data.filter((ele, index) => {
                if (ele.fullName && ele.fullName.length > 0) {
                    if (ele.fullName.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                        return ele
                    }
                }

            });
            return {
                filter: filtered,
                textInputValue: text
            }
        })
    }


    render() {

        return (
            <View style={style.container}>

                <View style={{ flexDirection: 'row' }}>

                    <TextBox
                        disable={this.state.data.length > 0}
                        color={this.state.filter.length > 0 ? 'red' : 'red'}
                        onChangeText={(text) => this.onFilterFavs(text)}
                        placeholder='Filter'
                        style={style.textInput(this.state)}>
                    </TextBox>



                    <MaterialCommunityIcons
                        style={{ color: 'white', alignSelf: 'center', left: -12 }}
                        onPress={() => this.setState({ sort: this.state.sort == 'asc' ? 'dsc' : 'asc' },
                            () => {
                                this.getRepoFavs(true)
                            })}
                        size={22}
                        name={this.state.sort == 'asc' ? "sort-ascending" : "sort-descending"} />

                </View>


                {this.state.noFavs && !this.state.fetching && <Text style={style.welcomeText}>You have no favorites</Text>}

                {this.state.fetching && <ActivityIndicator size={35} color={colors.white} />}

                <RepoList
                    refreshControl={ <RefreshControl tintColor={colors.white} refreshing={this.state.fetching} onRefresh={() => this.getRepoFavs()} />}
                    data={this.state.filter}
                    button={'ios-remove-circle-outline'} // ionic names are preffeered
                    onPressButton={(item) => this.onPressButton(item)}
                    navigation={this.props.navigation} />
            </View>
        )
    }

}

FavoritesScreen.contextType = store;

const style = StyleSheet.create({
    container: {
        margin: 0,
        width: '100%',
        height: '100%'
    },
    textInput: (state) => {
        return {

            backgroundColor: state.filter.length > 0 ? 'white' : '#C8C8C8',
            borderRadius: 8,
            padding: 10,
            margin: 30,
            marginHorizontal: 15,
            marginHorizontal: 25,
            width: '90%',
            flex: 1

        }
    },
    welcomeText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '700'

    }

})
