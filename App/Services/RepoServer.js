import axios from "axios";

export async function postFavorites(data, callback) {

    console.log("dataaa>>>", data)

    try {
        const response = await axios.post('https://cea19f94a753.ngrok.io/repo/',JSON.stringify(data),{headers:{"Content-Type" : "application/json"}});
        console.log("axios>>>",response);
        callback(response)
      } catch (error) {
        console.error("error>>>",error);
      }

    // fetch('http://localhost:8080/repo/', {
    //     method: 'POST', // or 'PUT'
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });

    

}

export  function getFavorites(callback) {

   

    fetch(`https://cea19f94a753.ngrok.io/repo/`, {
        method: 'GET'


    }).then((response) => response.json()).then((res) => {
        res.repos.forEach((ele) => {
            ele.stargazers_count = ele.stargazersCount ? ele.stargazersCount : 0 ,
            ele.full_name = ele.fullName,
            ele.created_at = ele.createdAt
            ele.saved = true
        })

        callback(res)

    }).catch((err) => console.log("fetch err>>", err))


}


export async function deleteFavorites(item, callback) {

    try {
        const response = await axios.delete(`https://cea19f94a753.ngrok.io/repo/${item.id.toString()}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        });
        callback(response)
      } catch (error) {
        console.error("error>>>",error);
      }


    // fetch(`http://localhost:8080/repo/${item.toString()}`, {
    //     method: 'DELETE'


    // }).then((response) => response.json()).then((res) => {

    //     callback(res)

    // }).catch((err) => console.log("fetch err>>", err))


}