let numberOfPages;
let numberOfUsersPerPage = 6;
let currentPage = 1;
let newId;

$(document).ready(function() {
    sendGetRequest(PAGE1_URL, users,
        pageReadyCallback, null)
})

function pageReadyCallback() {
    sendGetRequest(PAGE2_URL, users,
        null, usersReadyCallback)
}

function usersReadyCallback() {
    numberOfPages = Math.ceil(users.length / numberOfUsersPerPage)
    newId = users.length + 1;
    createPageContent(users, numberOfPages,
        currentPage, numberOfUsersPerPage,
        pageChangedCallback, deleteCallback,
        updateCallback, createCallback, newId)
}

function pageChangedCallback(currentP) {
    currentPage = currentP;
    numberOfPages = Math.ceil(users.length / numberOfUsersPerPage)
    createPageContent(users, numberOfPages,
        currentPage, numberOfUsersPerPage,
        pageChangedCallback, deleteCallback,
        updateCallback, createCallback, newId)
}

function deleteCallback(id) {
    _delete(id);
    numberOfPages = Math.ceil(users.length / numberOfUsersPerPage)
    if (numberOfPages < currentPage) {
        currentPage = numberOfPages
    }

    if (users.length === 0) {
        currentPage = 1
    }
    createPageContent(users, numberOfPages,
        currentPage, numberOfUsersPerPage,
        pageChangedCallback, deleteCallback,
        updateCallback, createCallback, newId)
}

function updateCallback(updateObj, id) {
    _update(updateObj, id);
    createPageContent(users, numberOfPages,
        currentPage, numberOfUsersPerPage,
        pageChangedCallback, deleteCallback,
        updateCallback, createCallback, newId);
    hideModal()
}

function createCallback(obj) {
    _create(obj)
    newId++;
    numberOfPages = Math.ceil(users.length / numberOfUsersPerPage)
    createPageContent(users, numberOfPages,
        currentPage, numberOfUsersPerPage,
        pageChangedCallback, deleteCallback,
        updateCallback, createCallback, newId)
    hideModal()
}