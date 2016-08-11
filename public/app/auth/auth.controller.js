//Creating Auth Controller to pass user inputs to Auth factory

(function() {
    'use strict';

    angular
        .module('app')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['AuthFactory', '$state', 'localStorageService'];

    /* @ngInject */
    function AuthController(AuthFactory, $state, localStorageService) {
        var vm = this;
        vm.title = 'AuthController';
        vm.registerUser = registerUser;
        vm.loginUser = loginUser;
        vm.logoutUser = logoutUser;
        vm.showLogin = showLogin;
        vm.showRegister = showRegister;
        vm.username = localStorageService.get("username");

        //Checks to see if there is a stored username, if yes sets login status to true
        if (vm.username) {
            vm.userLoggedIn = true;
        }

        $(".nav a").on("click", function() {
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });

        activate();

        ////////////////

        function activate() {}

        //Creating function to call AuthFactory to register new users
        function registerUser(name, email, password, confirmPassword, teacherId, role) {

            if (name && email && password && confirmPassword && teacherId && role) {

                if (password === confirmPassword) {

                    var newUser = { name: name, email: email, password: password, confirmPassword: confirmPassword, teacherId: teacherId, role: role }

                    AuthFactory.registerUser(newUser).then(function(response) {

                            toastr.success('User successfully registered!');

                            vm.newName = '';
                            vm.newEmail = '';
                            vm.newPassword = '';
                            vm.newConfirmPassword = '';
                            vm.newTeacher = '';
                            vm.newRole = '';

                        },
                        function(error) {
                            if (typeof error === 'object') {
                                toastr.error('There was an error: ' + error.data);
                            } else {
                                toastr.error(error);
                            }
                        });
                } else{
                    toastr.error('Password and Confirm Password do not match!')
                }
            } else{
                toastr.error('Please enter all required fields!')
            }
        }

        //Creating function to call login user from AuthFactory and store login status
        function loginUser(loginEmail, loginPassword) {
            logoutUser();
            AuthFactory.loginUser(loginEmail, loginPassword).then(function(response) {
                    vm.userLoggedIn = true;
                    vm.username = loginEmail;
                    vm.loginData = response.data;

                    toastr.success('User successfully logged in!');

                    vm.loginEmail = '';
                    vm.loginPassword = '';

                    $state.go('signIns');
                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.error(error);
                    }
                });
        }

        //Defining logoutUser to call logoutUser method in AuthFactory and redirect user to home page upon clearing access_token from local storage
        function logoutUser() {
            vm.userLoggedIn = false;
            AuthFactory.logoutUser();
            $state.go('home');
        }

        //Defining methods to show either login or register form
        function showLogin() {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $("#login-form-link").addClass('active');
        }

        function showRegister() {
            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $('#register-form-link').addClass('active');
        }
    }
})();
