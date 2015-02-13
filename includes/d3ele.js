$(document).ready(function() {
	var man = false;
	var currectYear;
	var chart;
	var small_chart;
	createView("./csv/apdata2012.csv");
	changeManIcon("2012");

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
			$('<span class="ui-slider-tick-mark">'+temp_max+'</span>').css('top', (spacing * i) +  '%').appendTo($slider);
			temp_max--;
		}
	}

function setValue(myValue) {
	// myValue is the currect year!! 
    var mySlider = document.getElementById('mySlider');
    mySlider.value = myValue;
    console.log(currectYear);
}


function changeViewByYear(){
	console.log(currectYear);
	
	var data = "./csv/apdata"+currectYear+".csv";
	console.log("Data File:"+ data);
	console.log("Before json");

    
    createView(data);
    changeManIcon(currectYear);
	
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
       		url:  data,
        	type:'bar',
      		colors: {
       			Police: '#b0b0b0',
       			Army: '#ffffff'
	       },
	       onmouseover: function(id){
	       		createSmall(id.x);
	      	},
	      	onclick: function(id) {
	      		document.location.href = "apDegree.html?id="+(id.x+1);	
	      	} 
    },
        bar: {
       			 width: 11,
       			 ratio: 37
             },
    legend : {
    	position:'right',
        show: false
    },

    
    grid: {
        x: {
            show: true,
            lines: [{value: 0, text: 'מפכ"ל'} ,{value: 0.3, text: 'רמטכ"ל', class: 'gridNoLine'},
            		{value: 1, text: 'ניצב'} ,{value: 1.3, text: 'אלוף', class: 'gridNoLine'},
            		{value: 2, text: 'תת-ניצב'} ,{value: 2.3, text: 'תת-אלוף', class: 'gridNoLine'},
            		{value: 3, text: 'ניצב משנה'} ,{value: 3.3, text: 'אלוף משנה', class: 'gridNoLine'},
            		{value: 4, text: 'סגן ניצב'} ,{value: 4.3, text: 'סגן אלוף', class: 'gridNoLine'},
            		{value: 5, text: 'רב פקד'} ,{value: 5.3, text: 'רב סרן', class: 'gridNoLine'},
            		{value: 6, text: 'פקד'} ,{value: 6.3, text: 'סרן', class: 'gridNoLine'},
            		{value: 7, text: 'מפקח'} ,{value: 7.3, text: 'סגן', class: 'gridNoLine'},
            ]
                   
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
            padding: {left: 0.7,right: 0.7}
          },
        y:{
        	 padding: {top: 200, bottom: 0}
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
        url: data
    });
  }
   
}


function createSmall(id){
	var smalldata = "./csv/"+(id+1)+"Rank.csv";
	small_chart = c3.generate({
		bindto: '#small_graph1',
	   	data: {
	        url: smalldata,
	        type: 'line',
	        colors: {
	       		Police: '#b0b0b0',
	       		Army: '#ffffff'
	      	},

	    },
	    legend : {
    		position:'right',
        	show: false
    },
	    grid: {
	    	x: {
	        	show:true,
	        	lines:[{value: 0,text:2002},{value: 1,text:2003},{value: 2,text:2004},{value: 3,text:2005},{value: 4,text:2006},{value: 5,text:2007},
	        		{value: 6,text:2008},{value: 7,text:2009},{value: 8,text:2010},{value: 9,text:2011},{value: 10,text:2012}]
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
        	 padding: {top: 100, bottom: 0},
        } 
	    }
	
	});

}

function changeManIcon(currectYear){
	   var lineDiv1 = d3.select("#lineDiv1");
   	   var lineDiv2 = d3.select("#lineDiv2");
   	   var lineDiv3 = d3.select("#lineDiv3");
   	   var manLayout1 = d3.select("#holdci");
   	   var manLayout2 = d3.select("#holdci2");
   	   var manLayout3 = d3.select("#holdci3");
	var all;
	var police;
	var army;
	var ashdod;
	var haifa;
	d3.json("./json/avaregeSalary"+currectYear+".json",function(data) {
		police = data.Police;
		army = data.Army;

	police = (police/1000) * 4;
	army = (army/1000) *3;
	
	console.log(police);
	console.log(army);

	var layout1 = 100;
   	var layout2 = police;
   	var layout3 = army;
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

if (!man){
// first Creation
	manLayout1.style('height', (layout1inpx+'px'));
	manLayout2.style('height', (layout2inpx+'px'));
	manLayout3.style('height', (layout3inpx+'px'));
	lineDiv1.style('top', linePosition1+'px');
	lineDiv1.text(data.Police);
	lineDiv2.style('top', linePosition2+'px');
	lineDiv2.text(data.Army);
	lineDiv3.style('top', linePosition3+'px');
	lineDiv3.text(data.All);
	man = true;
  
}
   	   
else{
   	   	console.log("inside man transition");
   	   	manLayout1.transition().duration(2000).style('height', (layout1inpx+'px'));
   	   	manLayout2.transition().duration(2000).style('height', (layout2inpx+'px'));
   	   	manLayout3.transition().duration(2000).style('height', (layout3inpx+'px'));
   	   	lineDiv1.transition().duration(2000).style('top', linePosition1+'px').text('₪'+data.Police);
   	   	lineDiv2.transition().duration(2000).style('top', linePosition2+'px').text("₪"+data.Army);
   	   	lineDiv3.transition().duration(2000).style('top', linePosition3+'px').text("₪"+data.All);
  }
    	});
	
}
});