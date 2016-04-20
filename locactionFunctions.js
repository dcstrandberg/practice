/*This document is simply to try to get the distance function and all related functions working properly. Building the closeList should only require the functions contained herein. */

var geoInfo, i=0, userList=[];

/*First we'll generate a list of 100 users*/
for (i=0; i<100; i++) {
    userList[i] = newUser(i);
}



/*Include a stripped down user class that will contain ID and location*/
function newUser(ID) {
    this.ID = ID;
    //Generate random maxDistance between .5 and 2.5 in .5 steps
    this.maxDistance = ( ( Math.floor( (Math.random() * 5 ) ) / 2) + 0.5);
    this.location = []; //Eventually we'll want to make location private somehow
    //this.lastActive = new Date;
    
    this.closeList = []; //Keep closeList because we'll generate it at the end

    // Have to add in methods for updating location
    //LOCATION SHOULDN'T BE DIRECTLY ACCESSIBLE. IT SHOULD BE ENCASED IN A FUNCTION BUT HOW DO YOU DO THAT WITH TWO USERS.
    //For now we'll just have it be a function
    this.showLocation = function(loc) {
        //return loc; //Returns a location object for passing to distance function
        /*document.getElementById("demo").innerHTML = 
            "Location: " + loc.coords.latitude + ", " + loc.coords.longitude;*/
        geoInfo = loc;
        return loc; //This should get getLocation to return the location object
    };
    this.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showLocation);
        } else {
            /*document.getElementById("demo").innerHTML =  
                "<p>Geolocation is not supported by this browser.</p>";*/
                console.log("Location information not available");
        }
    return;
    };
    
    this.distance = function(user1) {
        var distance, lat0, long0, lat1, long1, earthRadius = 6371000; //Meters
        //Get the location coordinates for each user
        lat0 = this.getLocation().coords.latitude;
        long0 = this.getLocation().coords.longitude;
        lat1 = user1.getLocation().coords.latitude;
        long1 = user1.getLocation().coords.longitude;
        
        //Convert lat and differences to radians
        lat0 = lat0.toRadians();
        lat1 = lat1.toRadians();
        deltaLat = (lat1 - lat0).toRadians();
        deltaLong = (long1 - long0).toRadians();
        
        var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                Math.cos(lat0) * Math.cos(lat1) *
                Math.sin(deltaLong/2) * Math.sin(deltaLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var distance = earthRadius * c;
        
        return distance;
    }
    this.genCloseList() = function () {
        //First clear closeList of previous value
        this.closeList = [];
        for (i=0; i < userList.length; i++) { //in the future we'll check a database for the list of users instead
            if ( this.distance(userList[i]) <= this.maxDistance ) {
                //Gotta add in code to block the blocked users
                this.closeList.push(userList[i]); //Add the current user to closeList if they're within maxDistance
            }
        }
        //Once all the users are added to closeList, sort it with closest first
        this.closeList.sort( function(a,b) {return a-b} ); 
        //IF WE WANNA SORT IT BY USERS THAT HAVE POSITIVE RATINGS, THIS IS WHERE WE'D DO THAT. OR PERHAPS IN ANOTHER FUNCTION THAT GETS CALLED HERE
        return;
    }
    this.sortCloseList() = function() {
        //If users have a positive rating, put them at the top of the list
    }    
}    

