var app = angular.module('wypok', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url : '/home',
		templateUrl : 'templates/home.html',
		controller : 'MainController',
		resolve : {
			postPromise : ['posts',
			function(posts) {
				return posts.getAll();
			}]

		}
	}).state('posts', {
		url : '/posts/:id',
		templateUrl : 'templates/posts.html',
		controller : 'PostsController',
		resolve : {
			post : ['$stateParams', 'posts',
			function($stateParams, posts) {
				return posts.get($stateParams.id);
			}]

		}
	}).state('login', {
		url : '/login',
		templateUrl : 'templates/login.html',
		controller : 'AuthenticationController',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]

	}).state('register', {
		url : '/register',
		templateUrl : 'templates/register.html',
		controller : 'AuthenticationController',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]
	});

	$urlRouterProvider.otherwise('home');
}]);

