(function() {
    'use strict';

    angular
        .module('app')
        .controller('TeacherProfileController', TeacherProfileController);

    TeacherProfileController.$inject = ['TeacherFactory', 'LessonFactory', 'StudentFactory', 'localStorageService'];

    /* @ngInject */
    function TeacherProfileController(TeacherFactory, LessonFactory, StudentFactory, localStorageService) {
        var vm = this;
        vm.title = 'TeacherProfileController';
        vm.editTeacher = editTeacher;

        activate();

        ////////////////

        function activate() {}

        //Creating function to call TeacherFactory's editTeacher method to update Teacher
        function editTeacher(data, newTeacher, newStudent, newDateTime, newDuration) {

            var updatedTeacher = { _id: data._id, teacher: newTeacher._id, student: newStudent._id, signedInDate: moment(newDateTime, 'MM-DD-YYYY HH:mm').toDate(), duration: newDuration.value, createdBy: vm.username };

            TeacherFactory.editTeacher(updatedTeacher)
                .then(function(response) {

                        vm.newTeacher = '';
                        vm.newStudent = '';
                        vm.newSignInDate = '';
                        vm.newDuration = '';

                        toastr.success('Teacher Profile Updated!');
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
