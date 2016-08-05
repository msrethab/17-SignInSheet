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
        activate();

        ////////////////

        function activate() {}

        //Creating function to call AuthFactory to register new users
        function registerUser(email, password, confirmPassword, firstName, lastName, phoneNumber) {
            AuthFactory.registerUser(email, password, confirmPassword, firstName, lastName, phoneNumber).then(function(response) {

                    toastr.success('User successfully registered!');

                    vm.newFirstName = '';
                    vm.newLastName = '';
                    vm.newEmail = '';
                    vm.newPhoneNumber = '';
                    vm.newPassword = '';
                    vm.newConfirmPassword = '';

                    $state.go("home");

                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.error(error);
                    }
                });
        }

        //Creating function to call login user from AuthFactory and store login status
        function loginUser(loginEmail, loginPassword) {
            logoutUser();
            AuthFactory.loginUser(loginEmail, loginPassword).then(function(response) {
                    vm.userLoggedIn = true;
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

        //Defining logoutUser to call logoutUser method in AuthFactory and redirect user to home pageupon clearing access_token from local storage
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
