   $(document).ready(function() {
   	
   
    var fill = 0;
    var fill2 = 0;
    var update = setInterval(function() {
        fill += 2;
        fill2 +=2;
        if (fill <= 100) {
            $('#holdci').css('height', (fill+'%')); 
            if(fill2 <= 25){
            	$('#holdci2').css('height', (fill2+'%')); 
            }
        } else {
            clearInterval(update);        
        }
    }, 100);
    
});



