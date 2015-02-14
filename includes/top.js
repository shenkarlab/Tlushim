$(document).ready(function() {
	var topInfo = [];
	var man = false;
	var currectYear;
	var chart;
	var small_chart;
	createView("./csv/highSalary2012.csv");
	createPie("./csv/highRatio2012.csv");

$(".slider")                    
    .slider({ 	
        min: 2002, 
        max: 2012,        	
        value:2012,
        orientation: "vertical",
        slide: function(event, ui) {
        	if (ui.value >2012){
        		ui.value=2012;
        	}
	        currectYear = ui.value;
	      setValue((ui.value));
	      changeViewByYear();
	    },
		create: function( event, ui ) {
			setSliderTicks(event.target);
		}
    })           
    .slider("pips", {
        rest: "label",
        step: "10"
    });
    
	  var mySlider = document.createElement('value');
	  $('.slider').append(mySlider);
	  mySlider.id = "mySlider";

	function setSliderTicks(el) {
		var $slider =  $(el);
		var max =  $slider.slider("option", "max");
		var min =  $slider.slider("option", "min");
		var temp_max=  $slider.slider("option", "max");
		var spacing =  100 / (max - min);

		$slider.find('.ui-slider-tick-mark').remove();
		for (var i = 0; i < max-min+1 ; i++) {
			$('<span class="ui-slider-tick-mark-top">'+temp_max+'</span>').css('top', (spacing * i) +  '%').appendTo($slider);
			temp_max--;
		}
	}
function setValue(myValue) {
	// myValue is the currect year!! 
    var mySlider = document.getElementById('mySlider');
    mySlider.value = myValue;
}


function changeViewByYear(){
	console.log(currectYear);
	var data = "./csv/highSalary"+currectYear+".csv";
	var pieData = "./csv/highRatio"+currectYear+".csv";
	console.log("Data File:"+ data);
	console.log("Before json");
    createView(data);
    createPie(pieData); 
}

	function toggle(id) {
    chart.toggle(id);
}

function createView(data){
	 topInfo = d3.csv(data)    .row(function(d) { return {AverageSalary: d.AverageSalary, Job: d.Job, Organization: d.Organization, Data:d.Data}; })
		 .get(function(error, rows) { console.log(rows); });


	console.log("this is row 0 " + topInfo.get(function(error, rows) { console.log(rows[1].Data.toSource()); }));
	console.log($("svg").length);
	if ( $("svg").length == 0){
		chart = c3.generate({
		bindto: '#chart',
    	data: {
       		url:  data,
        	type:'bar',
      		colors: {
				AverageSalary: '#b0b0b0'
	       },
	       onmouseover: function(id){
			   console.log(id);
	       		d3.select('#highSalaryData').style('display','block').style('background-color','blue').
	       		style('height','360px').style('width','350px').text(topInfo.get(function(error, rows) { (rows[id.x].Job.toString()) }));
	      	},
	      	onmouseout: function(id) {
	      		d3.select('#highSalaryData').style('display','none').text("");
	      	}
    	},
        bar: {
       		width: 11,
       		ratio: 10
        },
    	legend : {
    		position:'right',
        	show: false
   		},
    	grid: {
        	x: {
            	show: true
        	},
       	 	y: {
            	show: true
        	}
    	},
    	axis : {
    		x : {
          	  tick: {
                format: function (x) { return '•'; }
            	},
            	padding: {left: 0.2,right: 0.2},
          	},
        	y:{
        		padding: {top: 200, bottom: 0},
        	}   
     	}		
	});
d3.select('.top_legend_container').insert('div', '.chart').attr('class', 'legend').selectAll('span')
    .data(['Medical', 'Industrial','Electric','Ports','Education'])
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
        url: data
    });
  }
  
}

function createPie(pieData) {
	var chart = c3.generate({
		bindto:'#pieGraph',
    	data: {
    		url:pieData,
        	type : 'pie',
			colors: {
				Medical: '#b0b0b0',
				Industrial: '#b0b0b0',
				Electric: '#b0b0b0',
				Ports: '#b0b0b0',
				Education: '#b0b0b0'
			},
        	onclick: function (d, i) { console.log("onclick", d, i); },
        	onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        	onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    	}
	});
}



});