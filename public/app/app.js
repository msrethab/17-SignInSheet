//Creating module for to handle ui-routing, localStorage, and Interceptor

(function() {
    'use strict';

    var app = angular.module('app', ['ui.router', 'LocalStorageModule', 'angular-jwt', 'ui.select', 'ngSanitize', 'moment-picker']);

    app.config(function(localStorageServiceProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.interceptors.push('AuthInterceptor');

        localStorageServiceProvider
            .setPrefix('app')
            .setStorageType('localStorage')
            .setNotify(true, true)

        $urlRouterProvider.otherwise('/home');

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
            url: '/home',
            templateUrl: '../partials/partial-home.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        })

        // MULTIPLE ADDITIONAL STATES AND NESTED VIEWS =========================
        .state('signIns', {
                url: '/signIns',
                templateUrl: '../partials/partial-signIns.html',
                controller: 'LessonController',
                controllerAs: 'vm'
        })
        .state('dashboard', {
                url: '/dashboard',
                templateUrl: '../partials/partial-dashboard.html',
                controller: 'LessonController',
                controllerAs: 'vm'
        })
        .state('profile', {
                url: '/profile',
                templateUrl: '../partials/partial-profile.html',
                controller: 'LessonController',
                controllerAs: 'vm'
        })
        .state('teachers', {
                url: '/teachers',
                templateUrl: '../partials/partial-teachers.html',
                controller: 'LessonController',
                controllerAs: 'vm'
        })

    });
    //Global variable 
    app.value("apiUrl", "http://localhost:3000/api/");
})();
