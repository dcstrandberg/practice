$(document).ready(function() { //Only execute once the document's loaded
    //jQuery methods go here... We wanna add in "swipe" functionality
    //userList[0].genCloseList();
    $("[id^='closeuser']").css('border','1px solid green');
    $("[id^='closeuser']").dblclick(function() {
        $(this).animate({
            left: '100%',
            opacity: 0,
            width: hide
        }, 500, function() {
           //After animating the slide right and hiding the element, remove the <p> element from the HTML page. We still need to figure out how to remove the user from closeList and/or add a user to matchList
           $(this).remove(); 
        });
    });
});