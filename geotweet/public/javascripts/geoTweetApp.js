var app = angular.module('geoTweetApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'homeController'
		});

});

app.controller('homeController', function($scope, $http) {

	// query to be submitted 
	$scope.query = '';
	$scope.topics = new Array();

	// sends query to the neo4j router
	$scope.runQuery = function() {
		$http({
			url: '/neo4j',
			method: 'POST',
			data: { query: $scope.query },
			headers: {'Content-Type': 'application/json'}
		});

		$scope.query = '';
	}

	// retrieves a limited number of topics from neo4j
	$scope.getTopics = function() {
		console.log("Sending Request");
		$http({
			url: '/neo4j/topics',
			method: 'GET'
		})
		.then(function successCallback(res) {
			// this callback will be called asynchronously
			// when the response is available

			console.log("Request Successful");

			$scope.topics = res.data;
			

		}, function errorCallback(res) {
			console.log("Request Failed");
			// called asynchronously if an error occurs
			// or server returns response with an error status 
		});
	}

});



