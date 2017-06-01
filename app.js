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
    .accentPalette('red');
});
 roomApp.controller('EditCtrl',EditCtrl);
 roomApp.controller('AppCtrl', AppCtrl);
 function EditCtrl($scope,$stateParams){
  $scope.room = loadDetails($stateParams.id);
  $scope.tasks= new Array();
  $scope.tasks = $scope.room.todolist; // to assign values to edit models
  $scope.show = new Array();
  for(var ij=0;ij<$scope.room.todolist.length;ij++){
    $scope.show[ij]=false;
  }
//add task to specific room
  $scope.addTask = function(){
    var task = $scope.task;
    $scope.task="";
    if(task){
      $scope.room.todolist.push(task);
      saveDetails($scope.room.num,$scope.room);
    }
  }
  //edit task
  $scope.editTask = function(index){
    if($scope.tasks[index]!=undefined){
      $scope.show[index] = false;
      $scope.room.todolist[index] = $scope.tasks[index];
      saveDetails($scope.room.num,$scope.room);  
    }
  }
  //remove task from todolist
  $scope.taskDone = function(index){
    $scope.room.todolist.splice(index,1);
    saveDetails($scope.room.num,$scope.room);
  }
 }
  function AppCtrl($scope,$mdDialog) {
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
      var roomnums =JSON.parse(localStorage.getItem('roomnums'));
    	if(!(num==null || num==0 || roomnums.length==0))//check if localstorage is clear, also check if all the rooms are deleted
    		roomnum = parseInt(num)+1;
    	var myroom = new Object();
    	myroom.num = roomnum;
    	myroom.todolist=new Array();
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
