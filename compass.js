

var lat, long, i=0, htmlText = "", distance = null;
var demoRef = document.getElementById("demo");

let homeLat = 44.940601, homeLong = -93.156662;

function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(loc) { //Anonymous callback function that saves the position object to a property of the user class
                demoRef.innerHTML = getDistance(loc);
                }
            );
        } else {
            demoRef.innerHTML = "Error!";
        }
    return;
    }
    
function getDistance(locObj) {
        var dist, locObj0, locObj1, lat0, long0, lat1, long1, earthRadius = 6371000; //Meters
        //Get the location objects for current user and possible close user
        var homeLat = 
        var homeLong =                 
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
    }

