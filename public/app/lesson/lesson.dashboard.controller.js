
//Creating LessonDashboardController to extend functions of LessonController

(function() {
    'use strict';

    angular
        .module('app')
        .controller('LessonDashboardController', LessonDashboardController);

    LessonDashboardController.$inject = ['LessonFactory', '$stateParams', 'localStorageService', 'StudentFactory', 'TeacherFactory'];

    /* @ngInject */
    function LessonDashboardController(LessonFactory, $stateParams, localStorageService, StudentFactory, TeacherFactory) {
        var vm = this;
        vm.title = 'LessonDashboardController';
        vm.deleteLesson = deleteLesson;
        vm.editLesson = editLesson;
        vm.searchLessons = searchLessons;
        vm.searchLessonsByUser = searchLessonsByUser;

        activate();

        ////////////////

        function activate() {

        }
        //Creating function to call LessonFactory's deleteLesson method to delete lessons
        function deleteLesson(data) {
            var index = vm.lessons.indexOf(data);
            LessonFactory.deletelesson(data.lessonId).then(function(response) {

                    vm.lessonDel = response.data;
                    toastr.success('Lesson Successfully Deleted!');


                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });

            return vm.lessons.splice(index, 1);

        }

        //Creating function to call LessonFactory's editLesson method to update lessons
        function editLesson(data) {

            LessonFactory.editLesson(data)
                .then(function(response) {

                        toastr.success('Lessons Updated!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call LessonFactory's searchLessons method to advanced search
        function searchLessons(cityName, minRent, maxRent, bedrooms, bathrooms) {

            var searchQuery = { city: cityName, minRent: minRent, maxRent: maxRent, bedrooms: bedrooms, bathrooms: bathrooms };

            LessonFactory.searchlessons(searchQuery)
                .then(function(response) {

                        vm.searchResults = (response.data);
                        toastr.success('Lessons Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call LessonFactory's searchLessonsByUser method to return lessons posted by current user
        function searchLessonsByUser(userName) {

            var searchQuery = { userName: userName };

            LessonFactory.searchLessonsByUser(searchQuery)
                .then(function(response) {

                        vm.lessons = (response.data);
                        toastr.success('Lessons Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }
    }


})();
