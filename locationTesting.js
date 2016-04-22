/*
I should create some sort of renderList function that will output the updated closeList[] to the webpage. 
I also need to add the code to swipeLeft() to make it splice/split the user from the closeList[]. I also need to make closeList[] sort based on distance.
*/
var geoInfo;
function newUser(ID) {
    this.ID = ID;
    this.location = []; //Eventually we'll want to make location private somehow
    this.lastActive = new Date;
    this.closeList = [];
    //We want matchList to be private, so other functions can't access it (But do we actually care)
    //Is it possible to create this so two functions can access matchList[]?
    //Because eventually want to modify so matches can be removed as well

    this.addMatch = (function() { 
        //matchList is an array of user objects
        var matchList = []; 
        //matchList[] will only be accessible by the following function
        return function(user) {
            //If passed an object parameter add it to the end of the array
            if ( (typeof user) === "object" ) matchList.push(user);	
            return matchList; //addMatch returns the updated matchList
        }
    })();
    
    // Have to add in methods for updating location
    //LOCATION SHOULDN'T BE DIRECTLY ACCESSIBLE. IT SHOULD BE ENCASED IN A FUNCTION BUT HOW DO YOU DO THAT WITH TWO USERS.
    //For now we'll just have it be a function
    this.showLocation = function(loc) {
        //return loc; //Returns a location object for passing to distance function
        document.getElementById("demo").innerHTML = 
            "Location: " + loc.coords.latitude + ", " + loc.coords.longitude;
        geoInfo = loc;
        return;
    };
    this.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showLocation);
        } else {
            document.getElementById("demo").innerHTML =  
                "<p>Geolocation is not supported by this browser.</p>";
        }
    return;
    };
    
    this.distance = function(user1) {
        var distance, lat0, long0, lat1, long1;
        lat0 = this.getLocation().coords.latitude;
        long0 = this.getLocation().coords.longitude;
        lat1 = user1.getLocation().coords.latitude;
        long1 = user1.getLocation().coords.longitude;
        distance = Math.sqrt( Math.pow( (lat1 - lat2), 2 ) + 
        Math.pow( (long1 - long0) , 2) );
        return distance;
    }
    
    // swipeRight moves the first element of closeList
    // and makes it the last element of matchList
    this.swipeRight = function() { 
        var UID = document.getElementById("list").value;
        document.getElementById("demo").innerHTML = this.addMatch(UID); 
        return; 
    } 
    // swipeLeft removes the first element of closeList
    this.swipeLeft = function() {
        closeList.shift();
        return;
    }
}
