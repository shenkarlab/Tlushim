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
	
	var currentDegree;
	var chart;
	createView("./csv/ports"+correctDegree("id")+"Rank.csv");

$(".slider")                    
    .slider({ 
        min: 1, 
        max: 8,
        value:8,
        orientation: "vertical",
        slide: function(event, ui) {
	        currentDegree = ui.value;
	      setValue((ui.value));
	      changeViewByDegree();
	    }
    })
                    
    .slider("pips", {
        rest: "label",
        step: "8"
    });
    
   
	 
	  var mySlider = document.createElement('value');
	  $('.slider').append(mySlider);
	  mySlider.id = "mySlider";
	



function setValue(myValue) {
    var mySlider = document.getElementById('mySlider');
    mySlider.value = myValue;
    console.log(currentDegree);
}


function changeViewByDegree(){
	console.log(currentDegree);
	
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
	if ( $("svg").length == 0){
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
    .data(['Police', 'Army'])
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
   
   
 }
});