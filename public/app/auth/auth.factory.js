
//Creating AuthFactory to handle user authentication related services

(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$http', '$q', 'localStorageService', 'apiUrl'];

    /* @ngInject */
    function AuthFactory($http, $q, localStorageService, apiUrl) {
        var service = {
            registerUser: registerUser,
            loginUser: loginUser,
            logoutUser: logoutUser
        };
        return service;

        ////////////////

        //Checks user confirm password and then uses POST HTTP call to register user in database
        function registerUser(userEmail, password, confirmPassword, firstName, lastName, phoneNumber) {

            var defer = $q.defer();

            if (password !== confirmPassword){
                defer.reject("Password must match Confirm Password.");

                return defer.promise;
            }

            var newUser = {emailAddress: userEmail, password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber};

            $http({
                    method: 'POST',
                    url: apiUrl + 'accounts/register',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: newUser
                }).then(function(response) {
                        if (response.status === 200) {
                            defer.resolve(response);
                        } else {
                            defer.reject("No data found!");
                        }
                    },
                    function(error) {
                        defer.reject("Email Address has already been used!");
                    });

                return defer.promise;
        }

        //Uses POST HTTP call to send login information to server and return authentication token
        function loginUser(loginEmail, loginPassword){
            var defer = $q.defer();

            var login = {email: loginEmail, password: loginPassword};

            $http({
                    method: 'POST',
                    url: apiUrl + 'authenticate',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: login
                }).then(function(response) {
                        if (response.status === 200) {

                            //Stores access token and username on successful login
                            localStorageService.set('access_token', response.data.token);
                            localStorageService.set('username', loginEmail);

                            defer.resolve(response);
                        } else {
                            defer.reject("No data found!");
                        }
                    },
                    function(error) {
                        defer.reject(error);
                    });

                return defer.promise;
        }

        //Defining method for logging users out by clearing out access token from local storage
        function logoutUser(){
            localStorageService.clearAll();

        }
    }
})();