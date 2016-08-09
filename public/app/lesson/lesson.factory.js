
//Creating LessonFactory to handle user Lesson related services

(function() {
    'use strict';

    angular
        .module('app')
        .factory('LessonFactory', LessonFactory);

    LessonFactory.$inject = ['$http', '$q', 'localStorageService', 'apiUrl'];

    /* @ngInject */
    function LessonFactory($http, $q, localStorageService, apiUrl) {
        var url = apiUrl + 'lessons/'

        var service = {
            getLessons: getLessons,
            addLesson: addLesson,
            deleteLesson: deleteLesson,
            editLesson: editLesson,
            searchLessons: searchLessons,
            searchLessonsByUser: searchLessonsByUser
        };
        return service;

        ////////////////

        //Uses GET HTTP call to retrieve all Lesson objects from database
        function getLessons() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                    if (typeof response.data === 'object') {
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

        //Uses POST HTTP call to add a new Lesson into the database
        function addLesson(newLesson) {

            var defer = $q.defer();

            $http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: newLesson
            }).then(function(response) {
                    if (typeof response.data === 'object') {
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

        //Uses DELETE HTTP call to delete Lesson from database
        function deleteLesson(LessonId) {

            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: url + LessonId,
            }).then(function(response) {
                    if (typeof response.data === 'object') {
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

        //Uses PUT HTTP call to update a Lesson in the database
        function editLesson(data) {

            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: url + data.LessonId,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: data
            }).then(function(response) {
                    if (response.status = 204) {
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

        //Uses POST HTTP call to send searchQuery object to database and returns results of advanced search
        function searchLessons(searchQuery) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: url + 'search',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: searchQuery
            }).then(function(response) {
                    if (typeof response.data === 'object') {
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

        //Uses POST HTTP call to send searchQuery to database and returns only Lessons posted by a particular username
        function searchLessonsByUser(searchQuery) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: url + 'search/username',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: searchQuery
            }).then(function(response) {
                    if (typeof response.data === 'object') {
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
    }
})();
