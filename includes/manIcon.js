   $(document).ready(function() {
   	// this 3 vars need to be change by the JSON file !!
   	var layout1 = 100;
   		var layout2 = 65;
   			var layout3 = 35;
   	// div position (text and line)
   	var layout1inpx = layout1*290/100;
   	var layout2inpx = layout2*290/100;
   	var layout3inpx = layout3*290/100;
   	var layoutRegion1 = (290 - layout2inpx);
   	var layoutRegion2 = (290 - layoutRegion1- layout3inpx);
   	var layoutRegion3 = (290 - layoutRegion2 -layoutRegion1 );
   	   
   	   var linePosition1 = 0 + (0.5*layoutRegion3);
   	   console.log(linePosition1);
   	   var linePosition2 = 0 + layoutRegion3+ (layoutRegion2*0.5);
   	   console.log(linePosition1);
   	   var linePosition3 = 0 +layoutRegion3+layoutRegion2+ (layoutRegion1*0.5);
   	   
   	   
   	    	
    var fill = 0;
    var fill2 = 0;
    var fill3 = 0;
    var update = setInterval(function() {
        fill += 5;
        fill2 +=5;
         fill3 +=5;
        if (fill <= layout1inpx) {
            $('#holdci').css('height', (fill+'px')); 
            if(fill2 <= layout2inpx){
            	$('#holdci2').css('height', (fill2+'px')); 
           	if(fill3 <= layout3inpx){
            	$('#holdci3').css('height', (fill3+'px'));
            	} 
            }
        } else {
        	$('#lineDiv1').css('top',linePosition1);
        	$('#lineDiv2').css('top',linePosition2);
        	$('#lineDiv3').css('top',linePosition3);
            clearInterval(update);        
        }
    }, 100);
    
});



