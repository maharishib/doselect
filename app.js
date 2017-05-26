 var roomApp = angular.module('RoomApp', ['ngMaterial','ui.router']);
roomApp.config(function($stateProvider) {
  var homeState = {
    name: 'home',
    url: '',
    templateUrl: 'home.html'
  }
  $stateProvider.state(homeState);
});
 roomApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .accentPalette('blue');
});
 roomApp.controller('AppCtrl', AppCtrl)
  function AppCtrl($scope) {
    $scope.currentNavItem = 'home';
    $scope.addRoom = function(){
    	var num = totalRoom();
    	var roomnum = 1;
    	if(!(num==null || num==0))
    		roomnum = parseInt(num)+1;
    	var myroom = new Object();
    	myroom.num = roomnum;
    	myroom.todolist=new Array();
    	myroom.totaltask=0;
    	localStorage.setItem('totalRooms',roomnum);
    	localStorage.setItem('room_'+roomnum,JSON.stringify(myroom));

    	alert(totalRoom());
    }

  };
  function addRoom($scope){
  	
  }
  function totalRoom(){
  	return localStorage.getItem('totalRooms');
  }
