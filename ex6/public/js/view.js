function createPageContent(users, numberOfPages,
    currentPage, numberOfUsersPerPage,
    pageChangedCallback, deleteCallback,
    updateCallback, createCallback, newId) {
    createUsersPerPage(users, currentPage, numberOfUsersPerPage, deleteCallback, updateCallback)
    createPagination(numberOfPages, currentPage, pageChangedCallback)
    $('#new-user-btn').click(createBtnClick.bind(undefined, createCallback, newId))
}

function createUsersPerPage(users, currentPage, numberOfUsersPerPage, deleteCallback, updateCallback) {
    let usersContainer = $('#users-container');
    let usersContent = '';
    let start = (currentPage - 1) * numberOfUsersPerPage;
    let end = start + numberOfUsersPerPage;
    if (end > users.length) {
        end = users.length;
    }
    let paginatedUsers = users.slice(start, end)
    paginatedUsers.forEach(user => {
        usersContent += `
        <div class="col-12 col-sm-6 col-lg-4 padding-20">
            <div class="card card-size centralize-text">
                <img class="card-img-top img-fluid card-img" src="${user.avatar}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">ID: ${user.id}</h5>
                    <p class="card-text">Email: ${user.email}</p>
                    <a id="${user.id}" class="btn btn-primary profile-btn" data-toggle="modal" data-target="#userModal">User Profile</a>
                </div>
            </div>
        </div>
        `
    });

    usersContainer.html(usersContent)

    $('.profile-btn').click(function() {
        profileBtnClick(this, deleteCallback, updateCallback)
    })
}

function createPagination(numberOfPages, currentPage, pageChangedCallback) {
    let paginationContainer = $('#pagination-container');
    let paginationContent = '';
    for (let i = 0; i < numberOfPages; i++) {
        paginationContent += `
            <li class="page-item ${i+1 === currentPage ? 'active' : ''}"><a id="${i+1}" class="page-link">${i+1}</a></li>
        `
    }
    paginationContainer.html(paginationContent)
    $('.page-link').click(function() {
        if (+this.id !== currentPage) {
            currentPage = +this.id;
            pageChangedCallback(currentPage)
        }
    })
}

function profileBtnClick(button, deleteCallback, updateCallback) {
    let user = users.find(user => user.id === +button.id)
    $('#userModalLabel').text('Read');
    $('.modal-body').html(`
        <div class="col-12 padding-20">
            <div class="card card-size centralize-text">
                <img class="card-img-top img-fluid card-img" src="${user.avatar}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">ID: ${user.id}</h5>
                    <p class="card-text">First Name: ${user.first_name}</p>
                    <p class="card-text">Last Name: ${user.last_name}</p>
                    <p class="card-text">Email: ${user.email}</p>
                </div>
            </div>
        </div>
    `)
    $('.modal-footer').html(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" id='delete-btn' data-toggle="modal" data-target="#userModal">Delete</button>
        <button type="button" class="btn btn-warning" id='update-btn'>Update</button>
    `)

    $('#delete-btn').click(function() {
        deleteCallback(user.id)
    })

    $('#update-btn').click(updateBtnClick.bind(undefined, user, updateCallback))
}


function updateBtnClick(user) {
    $('#userModalLabel').text('Update');
    $('.modal-body').html(`
        <div class="row">
        <div class="col"></div>
        <div class="col-11 col-sm-8 col-lg-6" id="update-inputs">
        </div>
        <div class="col"></div>
        </div>
    `)
    let updateInputsContent = '';
    Object.keys(user).forEach(key => {
        if (key !== 'avatar') {
            updateInputsContent += `
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">${key}</span>
                </div>
                <input id="${key}-update-input" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"  value="${user[key]}">
                </div>
            `
        }
    })
    updateInputsContent += `
        <div class="input-group mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text">Upload</span>
        </div>
        <div class="custom-file">
        <input type="file" class="custom-file-input" id="avatar-update-input" value="${user.avatar}" multiple='false' accept='image/*'>
        <label class="custom-file-label overflow-hidden" for="avatar-update-input"">${user.avatar}</label>
        </div>
        </div>
    `
    $('#update-inputs').html(updateInputsContent)
    $('#id-update-input').prop('disabled', 'true');

    $('#avatar-update-input').change(function() {
        if (this.files && this.files[0]) {
            console.log(this.value);
            console.log(this.files);
            $('.custom-file-label').text(this.files[0].name)
        }
    })
    $('.modal-footer').html(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id='save-btn'>Save Changes</button>
    `)

    $('#save-btn').click(saveUpdate.bind(undefined, updateCallback, user.id))
}

function saveUpdate(updateCallback, id) {
    let obj = {};
    if ($('#email-update-input').val()) {
        Object.assign(obj, { email: $('#email-update-input').val() })
    }
    if ($('#first_name-update-input').val()) {
        Object.assign(obj, { first_name: $('#first_name-update-input').val() })
    }
    if ($('#last_name-update-input').val()) {
        Object.assign(obj, { last_name: $('#last_name-update-input').val() })
    }
    if ($('#avatar-update-input')[0].files && $('#avatar-update-input')[0].files[0]) {
        let reader = new FileReader();
        reader.addEventListener('load', function() {
            Object.assign(obj, { avatar: this.result })
            updateCallback(obj, id)
        })
        reader.readAsDataURL($('#avatar-update-input')[0].files[0])
    } else {
        updateCallback(obj, id)
    }
}

function createBtnClick(createCallback, newId) {
    console.log('xx');
    $('#userModalLabel').text('Create');
    $('.modal-body').html(`
        <div class="row">
        <div class="col"></div>
        <div class="col-11 col-sm-8 col-lg-6" id="create-inputs">
        </div>
        <div class="col"></div>
        </div>
    `)
    let createInputsContent = '';
    let keys = ['id', 'email', 'first_name', 'last_name', 'avatar']
    keys.forEach(key => {
        if (key !== 'avatar') {
            createInputsContent += `
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">${key}</span>
                </div>
                <input id="${key}-create-input" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"  placeholder="${key}">
                </div>
            `
        }
    })
    createInputsContent += `
        <div class="input-group mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text">Upload</span>
        </div>
        <div class="custom-file">
        <input type="file" class="custom-file-input" id="avatar-create-input" multiple='false' accept='image/*'>
        <label class="custom-file-label overflow-hidden" for="avatar-create-input"">Choose a file</label>
        </div>
        </div>
    `
    $('#create-inputs').html(createInputsContent)
    $('#id-create-input').val(newId);
    $('#id-create-input').prop('disabled', true)

    $('#avatar-create-input').change(function() {
        if (this.files && this.files[0]) {
            $('.custom-file-label').text(this.files[0].name)
        }
    })
    $('.modal-footer').html(`
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success" id='save-create-btn'>Create</button>
    `)

    $('#save-create-btn').click(saveCreate.bind(undefined, createCallback, newId))
}

function saveCreate(createCallback, newId) {
    let obj = { id: newId };
    if ($('#email-create-input').val()) {
        Object.assign(obj, { email: $('#email-create-input').val() })
    } else {
        return alert('Some inputs are empty')
    }
    if ($('#first_name-create-input').val()) {
        Object.assign(obj, { first_name: $('#first_name-create-input').val() })
    } else {
        return alert('Some inputs are empty')
    }
    if ($('#last_name-create-input').val()) {
        Object.assign(obj, { last_name: $('#last_name-create-input').val() })
    } else {
        return alert('Some inputs are empty')
    }
    if ($('#avatar-create-input')[0].files && $('#avatar-create-input')[0].files[0]) {
        let reader = new FileReader();
        reader.addEventListener('load', function() {
            Object.assign(obj, { avatar: this.result })
            createCallback(obj)
        })
        reader.readAsDataURL($('#avatar-create-input')[0].files[0])
    } else {
        return alert('Some inputs are empty')
    }
}

function hideModal() {
    $('#userModal').modal('hide')
}