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
//add task to specific room
  $scope.addTask = function(){
    var task = $scope.task;
    $scope.task="";
    if(task){
      $scope.room.todolist.push(task);
      saveDetails($scope.room.num,$scope.room);
    }
  }
  //remove task from todolist
  $scope.taskDone = function(index){
    $scope.room.todolist.splice(index,1);
    saveDetails($scope.room.num,$scope.room);
  }
 }
  function AppCtrl($scope) {
  	var roomIndexs = roomIndex(); 
  	$scope.rooms = new Array();
    var roomnums =JSON.parse(localStorage.getItem('roomnums'));
    //create home page grid data
    if(roomnums)
  	for(var i=0;i<roomnums.length;i++)
  		$scope.rooms.push(loadDetails(roomnums[i]));
    //creata a new room object, increment roomIndexs
  	$scope.addRoom = function(){
    	var num = roomIndex();
    	var roomnum = 1;
    	if(!(num==null || num==0))
    		roomnum = parseInt(num)+1;
    	var myroom = new Object();
    	myroom.num = roomnum;
    	myroom.todolist=new Array();
    	myroom.totaltask=0;
    	localStorage.setItem('roomIndex',roomnum);
      addRoomNum(roomnum);
    	saveDetails(roomnum,myroom);
    	$scope.rooms.unshift(myroom);
    }
    //remove room details,roomnum from araay, details from home page
    $scope.removeRoom = function(id){
      var roomnums = JSON.parse(localStorage.getItem('roomnums'));
      var roomindex = roomnums.indexOf(id);
      roomnums.splice(roomindex,1);
      localStorage.setItem('roomnums',JSON.stringify(roomnums));
      $scope.rooms.splice(roomindex,1);
      localStorage.removeItem('room_'+id);
    }
  };
  //save data for individual room
  function saveDetails(id,data){
      localStorage.setItem('room_'+id,JSON.stringify(data));
  }
  //add room number to an array used to retrive data on home page
  function addRoomNum(id){
    var roomnums = new Array(); 
     if(localStorage.getItem('roomnums'))
        roomnums = JSON.parse(localStorage.getItem('roomnums'));
        roomnums.unshift(id);
        localStorage.setItem('roomnums',JSON.stringify(roomnums));
  }
  //to load details of single room
  function loadDetails(id){
    	return JSON.parse(localStorage.getItem('room_'+id)); 
  }
  //to get new room id
  function roomIndex(){
  	return localStorage.getItem('roomIndex'); 
  }
