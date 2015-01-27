   $(document).ready(function() {
   
    var fill = 0;
    var update = setInterval(function() {
        fill += 1;
        if (fill <= 100) {
            $('#holdci').css('height', (fill+'%')); 
        } else {
            clearInterval(update);        
        }
    }, 100);
    
});



