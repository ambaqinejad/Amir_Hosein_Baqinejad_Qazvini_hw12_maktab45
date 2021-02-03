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
        } else if (!password && username) {
            $('#usernameInput').removeClass('borderNecessary');
            $('#usernameNecessary').css('display', 'none');

            $('#passwordInput').addClass('borderNecessary');
            $('#passwordNecessary').css('display', 'inline-block');
        } else if (password && !username) {
            $('#passwordInput').removeClass('borderNecessary');
            $('#passwordNecessary').css('display', 'none');

            $('#usernameInput').addClass('borderNecessary');
            $('#usernameNecessary').css('display', 'inline-block');
        } else {
            $('#passwordInput').addClass('borderNecessary');
            $('#passwordNecessary').css('display', 'inline-block');

            $('#usernameInput').addClass('borderNecessary');
            $('#usernameNecessary').css('display', 'inline-block');
        }
        return false;
    })
})