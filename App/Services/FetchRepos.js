
import {SECRET_TOKENS} from '../utils/constant'

const github_url = 'https://api.github.com/search/repositories?q=doge&sort=stars'



export const sampleData = require('../Fixtures/gitRespos.json')



export function fetchRepos(text, callback) {

    let githubToken = SECRET_TOKENS.GIT_TOKEN


    fetch(`https://api.github.com/search/repositories?q=${text}&sort=stars&access_token=${githubToken}`, {

    }).then((response) => response.json()).then((res) => {

        // console.log("reponse>>", res)
        if(res.message == "Bad credentials"){
            alert("Git hub Token is invalid -- Please check documentation access token")
        }
        callback(res)

    }).catch((err) => {
        console.log("fetch err>>", err)
       
    
    })


}

