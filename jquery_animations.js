$(document).ready(function() { //Only execute once the document's loaded
    //jQuery methods go here... We wanna add in "swipe" functionality
    //userList[0].genCloseList();
    $("#closebutton").click(function() {
        userList[0].genCloseList();
        setTimeout(closeAnim,1000);
    });
    
    function closeAnim() {
    //$("[id ^= 'closeuser']").css('border','1px solid green');
    $("[id ^= 'closeuser']").hover(function() {
        $(this).css('box-shadow','5px 5px 10px #777777');
    }, function() {
        $(this).css('box-shadow','0 0 0');    
    });
    $("[id ^= 'closeuser']").click(function() {
        //set position to relative so that we can move it
        $(this).css('position','relative');
        $(this).animate({
            left: '100%',
            opacity: 0,
            width: 'hide'            
        }, 500/*, function() {
           //After animating the slide right and hiding the element, remove the <p> element from the HTML page. We still need to figure out how to remove the user from closeList and/or add a user to matchList
           $(this).remove(); 
        }*/);
    });
    }
});