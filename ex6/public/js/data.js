const PAGE1_URL = 'https://reqres.in/api/users?page=1';
const PAGE2_URL = 'https://reqres.in/api/users?page=2';
let users = [];


function sendGetRequest(url, dataArray,
    pageReadyCallback, usersReadyCallback) {
    $.get(url, function(response) {
        dataArray.push(...response.data);
        if (pageReadyCallback !== null) {
            pageReadyCallback()
        }

        if (usersReadyCallback !== null) {
            usersReadyCallback()
        }
    })
}

function _delete(id) {
    users = users.filter(user => user.id != id)
}

function _update(updateObj, id) {
    let user = users.find(user => user.id === id);
    let index = users.findIndex(user => user.id === id)
    updateObj = {
        ...users[index],
        ...updateObj
    }
    users[index] = updateObj
}

function _create(newObj) {
    users.push(newObj);
}