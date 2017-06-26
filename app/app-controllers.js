myApp.controller('mainCtrl', function($scope, $http, $sce, $interval, $rootScope, $timeout) {

	$scope.$watch('online', function(newStatus) { 
    	if($rootScope.online == false){
    		$scope.elOnline = "wifi OFF";
    	}
    	else{
            $scope.elOnline = "wifi ON";
    	}
    });

    this.setDates = function(){
    	$scope.earthquakesArray = [];
    	this.inicio = limitar(this.dateRange.startDate, 10);
    	this.fin =  limitar(this.dateRange.endDate, 10);
    }

    this.validarMag = function(){
    	if(this.minMag >= this.maxMag ){
    		alert("Rango de magnitudes inválido.");
    		this.minMag = 6;
    		this.maxMag = 10;
    	}
    }

    $scope.earthquakesArray = [];

    this.dateRange = {
        startDate: "",
        endDate: ""
    };

    this.magnitudes = [6,7,8,9,10];

    this.inicio = "";
    this.fin = "";
    this.minMag = 6;
    this.maxMag = 10;

});

myApp.controller('earthquakeAPICtrl', function($scope, $http, $timeout){

	this.flags  = {
		loading:0,
		status:"nada"
	};

	this.getEarthquakes = function(arrayObjects, date1, date2, mag1, mag2){

		flags = this.flags;

		flags.loading = 1;

		$http({
		  method: 'GET',
		  url: URL.host + '/listEarthquakes/'+date1+'/'+date2+'/'+mag1+'/'+mag2
		})
		.then(function successCallback(response) {

			for (var i = 0; i < response.data.earthquake.length; i++) {
		    	arrayObjects.push(response.data.earthquake[i]);
		    }
		    flags.loading = 0;
		    flags.status = "ok";
		}, function errorCallback(response) {
			flags.loading = 0;
			flags.status = "error";
		});

	}

	
});

myApp.controller("BarCtrl", function ($scope) {
  /*this.fechas = ['jun 12, 2017', 'jun 14, 2017', 'jun 14, 2017', 'jun 17, 2017', 'jun 22, 2017'];
  this.ubicaciones = ['6km S of Plomarion, Greece', '5km NNE of San Pablo, Guatemala', '125km NE of LEsperance Rock, New Zealand',
  					'South of the Fiji Islands', '23km SW of Puerto San Jose, Guatemala'];

  //i = fechas
  //j = ubicaciones
  this.magnitudes = [
    [9, 0, 0, 0, 0],
    [0, 5, 0, 0, 0],
    [0, 0, 7, 0, 0],
    [0, 0, 0, 8, 0],
    [0, 0, 0, 0, 7]
  ];*/

  this.options = { 
  		legend: { display: true },
  		scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        // Container for pan options
        pan: {
            // Boolean to enable panning
            enabled: true,

            // Panning directions. Remove the appropriate direction to disable 
            // Eg. 'y' would only allow panning in the y direction
            mode: 'x'
        },

        // Container for zoom options
        zoom: {
            // Boolean to enable zooming
            enabled: true,

            // Zooming directions. Remove the appropriate direction to disable 
            // Eg. 'y' would only allow zooming in the y direction
            mode: 'x',
        }
  	};

  
  this.tempArray = [];
  this.fechas1 = [];
  this.ubicaciones1 = [];
  this.magnitudes1 = [];

  this.graficar = function(){
  	if($scope.earthquakesArray.length > 0){

  		if( ! angular.equals(this.tempArray, $scope.earthquakesArray)){

  			this.fechas1 = [];
  			this.ubicaciones1 = [];
  			this.magnitudes1 = [];

  			for(var i = 0; i < $scope.earthquakesArray.length; i++){
  				this.fechas1.push( $scope.earthquakesArray[i].dateFormat );
  				this.ubicaciones1.push( $scope.earthquakesArray[i].location );

  				var helpArray = [];
  				for(var j=0; j<$scope.earthquakesArray.length; j++){
  					if(j == i)
  						helpArray[j] = $scope.earthquakesArray[i].magnitude;
  					else
  						helpArray[j] = 0;
  				}
  				this.magnitudes1.push(helpArray);
  			}

  			angular.copy($scope.earthquakesArray, this.tempArray);
  			
  		}
  		return true;
  	}
  	else
  		return false;
  }

});