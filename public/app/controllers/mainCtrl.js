 angular.module('mainCtrl', [])

 .controller('mainController', function($location, Song){

 	var vm = this

 	vm.searchData = "";
 	vm.type = "";
 	vm.error="";
 	vm.songs = null;


 	vm.search = function(){

 		$location.path("/songs").search("type", vm.type).search("query", vm.searchData);

 	}

 });