//Creating LessonController to pass user inputs to Lesson Factory

(function() {
    'use strict';

    angular
        .module('app')
        .controller('LessonController', LessonController);

    LessonController.$inject = ['LessonFactory', '$stateParams', 'localStorageService', 'StudentFactory', 'TeacherFactory'];

    /* @ngInject */
    function LessonController(LessonFactory, $stateParams, localStorageService, StudentFactory, TeacherFactory) {
        var vm = this;
        vm.title = 'LessonController';
        vm.getLessons = getLessons;
        vm.addLesson = addLesson;
        vm.getStudents = getStudents;
        vm.addStudent = addStudent;
        vm.getTeachers = getTeachers;

        vm.username = localStorageService.get("username");

        //Checks to see if there is a stored username, if yes sets login status to true
        if (vm.username) {
            vm.userLoggedIn = true;
        }

        vm.durationList = [{
            name: '45 minutes',
            value: 45
        }, {
            name: '1 hour 30 minutes',
            value: 90
        }, {
            name: '2 hours 15 minutes',
            value: 135
        }, {
            name: '3 hours',
            value: 180
        }];

        activate();

        ////////////////

        function activate() {
            getTeachers();
            getStudents();
            // getLessons();
        }

        //Creating function to call LessonFactory's getLessons method to get and store all lessons
        function getLessons() {

            LessonFactory.getLessons()
                .then(function(response) {

                        vm.lessons = response.data.lessons;
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

        //Creating function to call LessonFactory's addLesson method to add lesson
        function addLesson(teacherId, studentId, lessonDuration) {

            var newLesson = { teacher: teacherId, student: studentId, duration: lessonDuration }

            LessonFactory.addLesson(newLesson)
                .then(function(response) {

                        toastr.success('Thank you for signing in! Lesson created!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call StudentFactory's getStudents method to get and store all students
        function getStudents() {

            StudentFactory.getStudents()
                .then(function(response) {

                        vm.students = response.data.students;
                        toastr.success('Students Loaded!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call StudentFactory's addStudent method to add student
        function addStudent(name, email, phoneNumber, streetAddress, city, state, zip, gender) {

            var newStudent = { name: name, email, email, phoneNumber: phoneNumber, streetAddress: streetAddress, city: city, state: state, zip: zip, gender: gender }

            StudentFactory.addStudent(newStudent)
                .then(function(response) {

                        vm.students.push(response.data.student);
                        toastr.success('New Student Registered!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call TeacherFactory's getTeachers method to get and store all teachers
        function getTeachers() {

            TeacherFactory.getTeachers()
                .then(function(response) {

                        vm.teachers = response.data.teachers;
                        toastr.success('Teachers Loaded!');

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
