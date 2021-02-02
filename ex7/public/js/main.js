$('document').ready(function() {
    $('#enter').click(function() {
        let password = $('#passwordInput').val();
        let username = $('#usernameInput').val();
        console.log(password, username);
        if (password && username) {
            $('#passwordInput').removeClass('borderNecessary');
            $('#passwordNecessary').css('display', 'none');

            $('#usernameInput').removeClass('borderNecessary');
            $('#usernameNecessary').css('display', 'none');
            return true;
        }

        if (!password) {
            $('#passwordInput').addClass('borderNecessary');
            $('#passwordNecessary').css('display', 'inline-block');
        }

        if (!username) {
            $('#usernameInput').addClass('borderNecessary');
            $('#usernameNecessary').css('display', 'inline-block');
        }

        return false;
    })
})