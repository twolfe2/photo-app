'use strict';

var app = angular.module('myApp');


app.service('Image', function($q, $http){

  this.getAll = () => {
    return $http.get('api/images')
      .then(res => {
        return res.data;
      })
      .catch(err => {
        if(err) console.log(err);
      })
  };
  
});

