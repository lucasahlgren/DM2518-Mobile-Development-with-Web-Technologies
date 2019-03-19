var BeaconApp = function (model, element){

	// JavaScript code for the Arduino Beacon example app.

	// Application object.
	var app = {}


	// Regions that define which page to show for each beacon.
	app.beaconRegions =
	[
		{
			id: 'milk',
			uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			major: 56506,
			minor: 14941,

		},
		{
			id: 'bulgur',
			uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			major: 33349,
			minor: 27161
		}/*
		{
			id: 'page-feet',
			uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			major: 46146,
			minor: 34612
		}*/
	]

	// Currently displayed page.

	app.currentPage = 'page-default'


	app.initialize = function()
	{	
		document.addEventListener(
			'deviceready',
			app.onDeviceReady,
			false)
		app.gotoPage(app.currentPage)
	}

	// Called when Cordova are plugins initialised,
	// the iBeacon API is now available.
	app.onDeviceReady = function()
	{
		// Specify a shortcut for the location manager that
		// has the iBeacon functions.
		window.locationManager = cordova.plugins.locationManager

		// Start tracking beacons!
		app.startScanForBeacons()
	}

	app.startScanForBeacons = function()
	{

		//console.log('startScanForBeacons')

		// The delegate object contains iBeacon callback functions.
		var delegate = new cordova.plugins.locationManager.Delegate()

		delegate.didDetermineStateForRegion = function(pluginResult)
		{
			//console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
		}

		delegate.didStartMonitoringForRegion = function(pluginResult)
		{
			//console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
		}

		delegate.didRangeBeaconsInRegion = function(pluginResult)
		{
			//console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
			app.didRangeBeaconsInRegion(pluginResult)
		}

		// Set the delegate object to use.
		locationManager.setDelegate(delegate)

		// Start monitoring and ranging our beacons.
		for (var r in app.beaconRegions)
		{
			var region = app.beaconRegions[r]

			var beaconRegion = new locationManager.BeaconRegion(
				region.id, region.uuid, region.major, region.minor)

			// Start monitoring.
			locationManager.startMonitoringForRegion(beaconRegion)
				.fail(console.error)
				.done()

			// Start ranging.
			locationManager.startRangingBeaconsInRegion(beaconRegion)
				.fail(console.error)
				.done()
		}
	}

	// Display pages depending of which beacon is close.
	app.didRangeBeaconsInRegion = function(pluginResult)
	{
		//console.log('numbeacons in region: ' + pluginResult.beacons.length)

		// There must be a beacon within range.
		if (0 == pluginResult.beacons.length)
		{
			return
		}

		// Our regions are defined so that there is one beacon per region.
		// Get the first (and only) beacon in range in the region.
		var beacon = pluginResult.beacons[0]

		// The region identifier is the page id.
		var pageId = pluginResult.region.identifier
		//onsole.log('Bajs')
		//console.log(pageId)


		//console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)
		//if ((beacon.proximity == 'ProximityImmediate' )
		//&& app.currentPage == 'page-default')
		 //app.currentPage == pageId)

		// If the beacon is close and represents a new page, then show the page.
		if (beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear')
		{
			//app.gotoPage(pageId)
			//Milk id 49993
			//bulgur id 537176
			var productInfo = model.getScannedProduct(537176)
			console.log(productInfo)

			app.printPage(productInfo)
			//model.setPage()
			return
		}

	// If the beacon represents the current page but is far away,
	// then show the default page.
		if (beacon.proximity == 'ProximityFar')
		{
			//sapp.scanForNewProduct();

			//app.gotoPage('page-default')
			//console.log('Macka	')
			return
		}
	}

	app.printPage = function(g){
		console.log(g);
		if (g !== "") {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            var groceryNode = document.createElement("ons-card");

            //var string = "productInfoPage("+g+")";
            //groceryNode.setAttribute("onclick","productInfoPage("+g.id+")");
            var groceriesTitle = document.createElement("h4");
            var groceriesSection = document.createElement("h6");
            var groceriesDescription = document.createElement("h8");
            var addButton = document.createElement("button");
            addButton.className = "btn btn-outline-success";
            addButton.setAttribute("onclick", "model.addToCart("+g.id+")");
            //addButton.setAttribute("onclick", "catchAddToCart("+g.id+")");
            var successMessage = document.createElement("p");
            successMessage.setAttribute("id", "success-message");
            successMessage.className = "alert alert-success";
            successMessage.style.display = "none";
            
            var img = document.createElement("IMG")
      		img.className = "productImg"
      		img.setAttribute("src",g.img)

           	//var clearButton = document.createElement("button");
            //clearButton.className = "btn btn-outline-success";
            //clearButton.setAttribute("onclick", "model.restartScan(this)";


            //console.log("gid!! " + g.id)

            var textNodeTitle = document.createTextNode(g.title);
            var textNodeSection = document.createTextNode("Section: "+ g.section);
            var textNodeDescription = document.createTextNode(g.description);
            var textNodedeButton = document.createTextNode("Add to cart");


            groceriesDescription.appendChild(textNodeDescription);
            groceriesTitle.appendChild(textNodeTitle);
            groceriesSection.appendChild(textNodeSection);
            groceriesTitle.setAttribute("title", g.title);
            addButton.appendChild(textNodedeButton);

            groceryNode.appendChild(groceriesTitle);
            groceryNode.appendChild(groceriesSection);
            groceryNode.appendChild(img)
            groceryNode.appendChild(groceriesDescription);
            groceryNode.appendChild(addButton)
            groceryNode.appendChild(successMessage)
            //groceryNode.appendChild(clearButton)
            element.appendChild(groceryNode);
        }



	}

	app.temp = function(){
		var productInfo = model.getScannedProduct(537176)
		//console.log(productInfo)

		app.printPage(productInfo)

	}

	

	// Set up the application.

	this.startScanning = function(){
		window.locationManager = cordova.plugins.locationManager

		// Start tracking beacons!
		element.innerHTML = '<h5 class="center header"> Scan a product</h5>'
		//app.temp();
		app.startScanForBeacons()
		//app.initialize()
	}
}