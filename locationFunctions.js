/*This document is simply to try to get the distance function and all related functions working properly. Building the closeList should only require the functions contained herein. */

var geoInfo, i=0, j=0, userList=[], htmlText = "";

/*First we'll generate a list of 100 users*/
for (i=0; i<100; i++) {
    userList[i] = new newUser(i);
}

//Then in the HTML we'll check location for the first user against all the rest


/*Include a stripped down user class that will contain ID and location*/
function newUser(ID) {
    this.ID = ID;
    this.distance;
    //Generate random maxDistance between .5 and 2.5 in .5 steps
    this.maxDistance = ( ( Math.floor( (Math.random() * 5 ) ) / 2) + 0.5);
    
    //If we set getLocation() to watch for the geolocation, we could start watching as soon as a user logs in, then turn it off after an hour of inactivity. Then we could consistently update this.userLocation, which is how we could access the location object for the distance function -- Not currently used at all...
    this.userLocation = undefined; 
    
    this.blockList = []; //Add blockList of UIDs so we can check if the close user is blocked
    this.closeList = []; //Keep closeList because we'll generate it at the end

    // Have to add in methods for periodically updating location/closeList
    //LOCATION SHOULDN'T BE DIRECTLY ACCESSIBLE. IT SHOULD BE ENCASED IN A FUNCTION BUT HOW DO YOU DO THAT WITH TWO USERS.
    //For now we'll just have it be a function
    this.showLocation = function(loc) {
        //return loc; //Returns a location object for passing to distance function
        /*document.getElementById("demo").innerHTML = 
            "Location: " + loc.coords.latitude + ", " + loc.coords.longitude;*/
        
        //Save the location object to this.location
        this.userLocation.latitude = loc.coords.latitude;
        this.userLocation.longitude = loc.coords.longitude;
        
        //return loc; //This should get getLocation to return the location object
    };
    this.getLocation = function() {
        var tempParentObject = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(loc) { //Anonymous callback function that saves the position object to a property of the user class
                tempParentObject.userLocation = loc;
                }
            );
        } else {
            /*document.getElementById("demo").innerHTML =  
                "<p>Geolocation is not supported by this browser.</p>";*/
                document.getElementById("error").innerHTML = "Location information not available";
        }
    return;
    };
    
    this.getDistance = function(user1) {
        var dist, locObj0, locObj1, lat0, long0, lat1, long1, earthRadius = 6371000; //Meters
        //Get the location objects for current user and possible close user
        locObj0 = this.userLocation;
        locObj1 = user1.userLocation;
                
        //Get the location coordinates for each user
        lat0 = locObj0.coords.latitude;
        long0 = locObj0.coords.longitude;
        lat1 = locObj1.coords.latitude;
        long1 = locObj1.coords.longitude;
        
        //Convert lat and differences to radians
        lat0 = lat0.toRadians();
        lat1 = lat1.toRadians();
        deltaLat = (lat1 - lat0).toRadians();
        deltaLong = (long1 - long0).toRadians();
        
        var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                Math.cos(lat0) * Math.cos(lat1) *
                Math.sin(deltaLong/2) * Math.sin(deltaLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var dist = earthRadius * c;
        
        return dist;
    };
    this.genCloseList = function () {
        //First clear closeList of previous value
        this.closeList = [];
        var currentDist = undefined;
        //For every user in the "database"
        for (i=0; i < userList.length; i++) { 
        //in the future we'll check a database for the list of users instead.
        
            //If the user is close enough and NOT the user who's looking...
            currentDist = this.getDistance(userList[i]); 
            if ( currentDist <= this.maxDistance && this !== userList[i] ) {

                //If the close User doesn't match the ID of a blocked user...
                if ( this.blockList.indexOf( userList[i].ID ) < 0 ) {
                
                    //THEN we can add the current user to closeList
                    this.closeList.push(userList[i]); 
                    userList[i].distance = currentDist;
                }
            }
        }
        //Once all the users are added to closeList, sort it with closest first
        this.closeList.sort( function(a,b) {return a-b} ); 
        //IF WE WANNA SORT IT BY USERS THAT HAVE POSITIVE RATINGS, THIS IS WHERE WE'D DO THAT. OR PERHAPS IN ANOTHER FUNCTION THAT GETS CALLED HERE
        
        //Temporarily add HTML display code
        for (i=0; i < this.closeList.length; i++) {
            htmlText += "<p id='close" + i + "'>User #" + closeList[i].ID + 
            ": " + closeList[i].distance.toFixed(1) + " km away</p>";
        }
        
        return;
    };
    this.sortCloseList = function() {
        //If users have a positive rating, put them at the top of the list
    };    
}    

