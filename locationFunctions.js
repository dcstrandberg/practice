/*This document is simply to try to get the distance function and all related functions working properly. Building the closeList should only require the functions contained herein. */

var geoInfo, i=0, j=0, userList=[], htmlText = "";

/*First we'll generate a list of 100 users*/
for (i=0; i<100; i++) {
    userList[i] = new newUser(i);
    userList[i].getLocation(); //We'll do this here first because it takes time to get the position info
}


//Then in the HTML we'll check location for the first user against all the rest


/*Include a stripped down user class that will contain ID and location*/
function newUser(ID) {
    this.ID = ID;
    this.pic = "images/user_icon.png";
    this.distance = undefined; //The distance should be part of the stripped down user class that we use to populate the closeList. Because at this point each user can modify each other user's distance, which will cause a whole bunch of problems. 
    
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
        var dist, locObj0, locObj1, lat0, long0, lat1, long1;
        var earthRadius = 6371000; //Meters
        //Get the location objects for current user and possible close user
        //this.getLocation();
        //user1.getLocation();
        //THERE NEEDS TO BE A WAIT HERE OR SOMETHING. The location isn't updated until a little later. For now we'll do it at the beginning of this script
        locObj0 = this.userLocation;
        locObj1 = user1.userLocation;
                
        //Get the location coordinates for each user
        lat0 = locObj0.coords.latitude;
        long0 = locObj0.coords.longitude;
        lat1 = locObj1.coords.latitude;
        long1 = locObj1.coords.longitude;
        
        //Get the differences in lat and long and convert to radians
        deltaLat = (lat1 - lat0) * Math.PI / 180;
        deltaLong = (long1 - long0) * Math.PI / 180;
        
        var a = 
            0.5 - Math.cos(deltaLat)/2 + 
            Math.cos(lat0 * Math.PI / 180) * Math.cos(lat1 * Math.PI / 180) * 
            (1 - Math.cos(deltaLong))/2;
        
        var dist = earthRadius * 2 * Math.asin(Math.sqrt(a));
        
        return dist;
    };
    this.genCloseList = function () {
        //First output a loading message
        document.getElementById("closelist").innerHTML = "Loading...";
        
        //Clear closeList of previous value
        this.closeList = [];
        var currentDist = undefined;
        //For every user in the "database"
        for (i=0; i < userList.length; i++) { 
        //in the future we'll check a database for the list of users instead.
        
            //Don't check distance for the current user
            if ( this !== userList[i] ) {
                
                //If the user is close enough...
                currentDist = this.getDistance(userList[i]); 
                if ( currentDist <= this.maxDistance ) {

                    //If the close User doesn't match the ID of a blocked user...
                    if ( this.blockList.indexOf( userList[i].ID ) < 0 ) {
                
                        //THEN we can add the current user to closeList
                        this.closeList.push(userList[i]); 
                        userList[i].distance = currentDist;
                    }      
                }
            }
        }
        //Once all the users are added to closeList, sort it with closest first
        this.closeList.sort( function(a,b) {return a-b} ); 
        //IF WE WANNA SORT IT BY USERS THAT HAVE POSITIVE RATINGS, THIS IS WHERE WE'D DO THAT. OR PERHAPS IN ANOTHER FUNCTION THAT GETS CALLED HERE
        
        //Temporarily add HTML display code
        var ref = document.getElementById("closelist");
        ref.innerHTML = "";
        //For each close user create a new <p> with the id of the userID
        //And the class of info that will float it right.  
        for (i=0; i < this.closeList.length; i++) {
            ref.innerHTML += "<p id='close" + this.closeList[i].ID +
                "'><img src='" + this.closeList[i].pic + 
                "'> User #" + this.closeList[i].ID + ":<span class='dist'>" + 
                this.closeList[i].distance.toFixed(1) + " km away</span></p>";
        }
        
        return;
    };
    this.sortCloseList = function() {
        //If users have a positive rating, put them at the top of the list
    };    
}    

