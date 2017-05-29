 var roomApp = angular.module('RoomApp', ['ngMaterial','ui.router']);
roomApp.config(function($stateProvider) {
  var homeState = {
    name: 'home',
    url: '',
    templateUrl: 'home.html'
  }
  var editState = {
    name: 'edit',
    url: '/edit/:id',
    templateUrl: 'edit.html'
  }
  $stateProvider.state(homeState);
  $stateProvider.state(editState);
});
 roomApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .accentPalette('blue');
});
 roomApp.controller('EditCtrl',EditCtrl);
 roomApp.controller('AppCtrl', AppCtrl);
 function EditCtrl($scope,$stateParams){
  $scope.room = loadDetails($stateParams.id);

  $scope.addTask = function(){
    var task = $scope.task;
    $scope.task="";
    if(task){
      $scope.room.todolist.push(task);
      saveDetails($scope.room.num,$scope.room);
    }
  }
  $scope.taskDone = function(index){
    $scope.room.todolist.splice(index,1);
    saveDetails($scope.room.num,$scope.room);
  }
 }
  function AppCtrl($scope) {
  	$scope.currentNavItem = 'home';
  	var totalrooms = totalRoom(); 
  	$scope.rooms = new Array();
  	for(var i=totalrooms;i>0;i--)
  		$scope.rooms.push(loadDetails(i));
  	
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
    	saveDetails(roomnum,myroom);
    	$scope.rooms.unshift(myroom);
    }
  };
  function saveDetails(id,data){
      localStorage.setItem('room_'+id,JSON.stringify(data));
  }
  function loadDetails(id){
    	return JSON.parse(localStorage.getItem('room_'+id));
  }
  function totalRoom(){
  	return localStorage.getItem('totalRooms');
  }
