/*  Remember that declaring one object equal to another
    object sets the objects to refer to the same memory
    space. So modifying one object, modifies the other.
    Presumably this is useful when accessing objects within
    functions or something... 
    Maybe this could be used w/ matchList objects or something like it would automatically change one persons' match if the other person didn't match w/ them? I dunno...
*/

function newUser(ID, name, sex, preference) {
    this.ID = ID;
    this.name = name;
    this.sex = sex;
    this.pref = preference;
    this.location = [];
    this.lastActive = new Date;
    this.closeList = [];
    this.matchList = [];
    // Have to add in methods for updating location
    
    // swipeRight moves the first element of closeList
    // and makes it the last element of matchList
    this.swipeRight = function() { 
        matchList.push( closeList.shift() ); 
        return; 
    } 
    // swipeLeft removes the first element of closeList
    this.swipeLeft = function() {
        closeList.shift();
        return;
    }
}
var i = 0, userList = [], text = "";
for ( i=0; i<5; i++ ) {
    // generate randomly assigned UIDs, set names to Jen, sex to F, pref to M
    userList[i] = new newUser( Math.floor( Math.random() * 1001 ), "Jen", "F", "M" );
}
for ( i=0; i<5; i++ ) {
    //log the objects' UIDs
    text += "<br>User #" + userList[i].ID + 
        " was last active on " + userList[i].lastActive + "<br>";
}
document.getElementById("demo").innerHTML = text;