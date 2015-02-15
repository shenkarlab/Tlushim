$(document).ready(function() {
	var correctDegree = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
};
	var man = false;
	var currentDegree;
	var chart;
	var correctValue = correctDegree("id");
		if (correctValue > 8 || correctValue < 1){
			correctValue = 8 ;
		}
		else if (correctValue == 1){correctValue = 8;}
		else if (correctValue == 2){correctValue = 7;}
		else if (correctValue == 3){correctValue = 6;}
		else if (correctValue == 4){correctValue = 5;}
		else if (correctValue == 5){correctValue = 4;}
		else if (correctValue == 6){correctValue = 3;}
		else if (correctValue == 7){correctValue = 2;}
		else if (correctValue == 8){correctValue = 1;}


	createView("./csv/ports"+correctDegree("id")+"Rank.csv");
	changeManIcon("2012");
$(".slider")                    
    .slider({ 
        min: 1, 
        max: 8,
        value: correctValue,
        orientation: "vertical",
        slide: function(event, ui) {
	        currentDegree = ui.value;
	      setValue((ui.value));
	      changeViewByDegree();
	    },
		create: function( event, ui ) {
			setSliderTicks(event.target);
		}
    })
                    
    .slider("pips", {
        rest: "label",
        step: "8"
    });
    
   
	 
	  var mySlider = document.createElement('value');
	  $('.slider').append(mySlider);
	  mySlider.id = "mySlider";

	function setSliderTicks(el) {
		var $slider =  $(el);
		var degreeArr =["אתת","מנכל","מנופאי","מכונאי","סדרן","נתב","קברניט","רענ"];

		var max =  $slider.slider("option", "max");
		var min =  $slider.slider("option", "min");
		var temp_max=  $slider.slider("option", "min");
		var spacing =  100 / (max - min);

		$slider.find('.ui-slider-tick-mark').remove();
		for (var i = 0; i < max-min+1 ; i++) {
			$('<span class="ui-slider-tick-mark-rank-ports">'+degreeArr[temp_max-1]+'</span>').css('top', (spacing * i) +  '%').appendTo($slider);
			temp_max++;
		}
	}


function setValue(myValue) {
    var mySlider = document.getElementById('mySlider');
    mySlider.value = myValue;
    console.log(currentDegree);
}


function changeViewByDegree(){
	console.log(currentDegree);
	if (currentDegree == 1){currentDegree = 8;}
	else if (currentDegree == 2){currentDegree = 7;}
	else if (currentDegree == 3){currentDegree = 6;}
	else if (currentDegree == 4){currentDegree = 5;}
	else if (currentDegree == 5){currentDegree = 4;}
	else if (currentDegree == 6){currentDegree = 3;}
	else if (currentDegree == 7){currentDegree = 2;}
	else if (currentDegree == 8){currentDegree = 1;}
	var data = "./csv/ports"+currentDegree+"Rank.csv";
	console.log("Data File:"+ data);
	console.log("Before json");
    createView(data);
	
};

	function toggle(id) {
    chart.toggle(id);
}

function createView(data){
	
	console.log($("svg").length);
	if ( $("svg").length == 3){
				chart = c3.generate({
					bindto: '#chart',
	   				data: {
	        			url: data,
	        			type: 'area',
	        			colors: {
	       					Ashdod: '#b0b0b0',
	       					Haifa: '#ffffff'
	      				}
	    			},
	    			legend : {
    					position:'right',
        				show: false
   					 },
	        		grid: {
	        			x: {
	        				show:true,
	        				lines:[{value: 1,text:2006},{value: 2,text:2007},{value: 3,text:2008},{value: 4,text:2009},{value: 5,text:2010},{value: 6,text:2011},
	        				{value: 7,text:2012}]
	        			},
	        			y: {
	        				show:true
	        			}
	        		},
	        		axis : {
	       				x : {
	            			tick: {
	               				format: function (x) { return '•'; }
	            			}
	            	},
	            		  y:{
        	 padding: {top: 200, bottom: 0},
        }
	            	}
	
				});


d3.select('.container').insert('div', '.chart').attr('class', 'legend').selectAll('span')
    .data(['Ashdod', 'Haifa'])
  .enter().append('span')
    .attr('data-id', function (id) { return id; })
    .attr('class',function(id){return id;})

    .on('mouseover', function (id) {
        chart.focus(id);
    })
    .on('mouseout', function (id) {
        chart.revert();
    })
    .on('click', function (id) {
        chart.toggle(id);
    });
  } // end if
  else {
  	    chart.load({
        url: data,
        type: 'area'
    });
  }
   
   
 } // close createView()

	function changeManIcon(currectYear){
		var lineDiv1 = d3.select("#lineDiv1");
		var lineDiv2 = d3.select("#lineDiv2");
		var lineDiv3 = d3.select("#lineDiv3");
		var lineDiv1Cotert = d3.select("#lineDiv1Cotert");
		var lineDiv2Cotert = d3.select("#lineDiv2Cotert");
		var lineDiv3Cotert = d3.select("#lineDiv3Cotert");
		var manLayout1 = d3.select("#holdci");
		var manLayout2 = d3.select("#holdci2");
		var manLayout3 = d3.select("#holdci3");
		var all;
		var police;
		var army;
		var ashdod;
		var haifa;
		d3.json("./json/avaregeSalary"+currectYear+".json",function(data) {
			haifa = data.Ashdod;
			ashdod = data.Haifa;

			haifa = (haifa/1000) * 3;
			ashdod = (ashdod/1000) *2;

			console.log(haifa);
			console.log(ashdod);

			var layout1 = 100;
			var layout2 = haifa;
			var layout3 = ashdod;
			// div position (text and line)
			var layout1inpx = layout1*290/100;
			var layout2inpx = layout2*290/100;
			var layout3inpx = layout3*290/100;
			var layoutRegion1 = (290 - layout2inpx);
			var layoutRegion2 = (290 - layoutRegion1- layout3inpx);
			var layoutRegion3 = (290 - layoutRegion2 -layoutRegion1 );

			var linePosition1 = 0 + (0.5*layoutRegion3)-40;
			console.log(linePosition1);
			var linePosition2 = 0 + layoutRegion3+ (layoutRegion2*0.5)-40;
			console.log(linePosition1);
			var linePosition3 = 0 +layoutRegion3+layoutRegion2+ (layoutRegion1*0.5)-40;
			var lineCotertPosition1 = linePosition1 - 37;
			var lineCotertPosition2 = linePosition2 ;
			var lineCotertPosition3 = linePosition3 + 75;

			if (!man){
// first Creation
				manLayout1.style('height', (layout1inpx+'px'));
				manLayout2.style('height', (layout2inpx+'px'));
				manLayout3.style('height', (layout3inpx+'px'));
				lineDiv1.style('top', linePosition1+'px').text("₪"+data.Ashdod);
				lineDiv2.style('top', linePosition2+'px').text("₪"+data.Haifa);
				lineDiv3.style('top', linePosition3+'px').text("₪"+data.All);
				lineDiv1Cotert.style('top', lineCotertPosition1+'px');
				lineDiv2Cotert.style('top', lineCotertPosition2+'px');
				lineDiv3Cotert.style('top', lineCotertPosition3+'px');
				man = true;

			}

			else{
				console.log("inside man transition");
				manLayout1.transition().duration(2000).style('height', (layout1inpx+'px'));
				manLayout2.transition().duration(2000).style('height', (layout2inpx+'px'));
				manLayout3.transition().duration(2000).style('height', (layout3inpx+'px'));
				lineDiv1.transition().duration(2000).style('top', linePosition1+'px').text("₪"+data.Ashdod);
				lineDiv2.transition().duration(2000).style('top', linePosition2+'px').text("₪"+data.Haifa);
				lineDiv3.transition().duration(2000).style('top', linePosition3+'px').text("₪"+data.All);
				lineDiv1Cotert.transition().duration(2000).style('top', lineCotertPosition1+'px');
				lineDiv2Cotert.transition().duration(2000).style('top', lineCotertPosition2+'px');
				lineDiv3Cotert.transition().duration(2000).style('top', lineCotertPosition3+'px');
			}
		});

	}

});