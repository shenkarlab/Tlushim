$(document).ready(function() {
	var currectYear;
	var chart;
	var small_chart;
	createView("./csv/portsdata2012.csv");


$(".slider")                    
    .slider({ 
        min: 2006, 
        max: 2013,
                	
        value:2012,
        orientation: "vertical",
        slide: function(event, ui) {
        	if (ui.value >2012){
        		ui.value=2012;
        	}
	        currectYear = ui.value;
	      setValue((ui.value));
	      changeViewByYear();
	    }
    })           
    .slider("pips", {
        rest: "label",
        step: "6"
    });
    
   
	 
	  var mySlider = document.createElement('value');
	  $('.slider').append(mySlider);
	  mySlider.id = "mySlider";
	



function setValue(myValue) {
	// myValue is the currect year!! 
    var mySlider = document.getElementById('mySlider');
    mySlider.value = myValue;
    console.log(currectYear);
}


function changeViewByYear(){
	console.log(currectYear);
	
	var data = "./csv/portsdata"+currectYear+".csv";
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
       		url:  data,
        	type:'bar',
      		colors: {
       			Ashdod: '#b0b0b0',
       			Haifa: '#ffffff'
	       },
	       onmouseover: function(id){
	       		createSmall(id.x);
	      	},
	      	onclick: function(id) {
	      		document.location.href = "portsDegree.html?id="+(id.x+1);	
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
            lines: [{value: 0, text: 'אתת'} ,
            		{value: 1, text: 'מנכ"ל'} ,
            		{value: 2, text: 'מנופאי'} ,
            		{value: 3, text: 'מכונאי'} ,
            		{value: 4, text: 'סגן ניצב'} ,
            		{value: 5, text: 'נתב'} ,
            		{value: 6, text: 'קברניט'} ,
            		{value: 7, text: 'רע"נ'} ,
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
            padding: {left: 0.7,right: 0.7},
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
        url: data
    });
  }
   
}


function createSmall(id){
	var smalldata = "./csv/ports"+(id+1)+"Rank.csv";
	small_chart = c3.generate({
		bindto: '#small_graph1',
	   	data: {
	        url: smalldata,
	        type: 'line',
	        colors: {
	       		Ashdod: '#b0b0b0',
	       		Haifa: '#ffffff'
	      	},

	    },
	    legend : {
    		position:'right',
        	show: false
    },
	    grid: {
	    	x: {
	        	show:true,
	        	lines:[{value: 0,text:2006},{value: 1,text:2007},
	        		{value: 2,text:2008},{value: 3,text:2009},{value: 4,text:2010},{value: 5,text:2011},{value: 6,text:2012}]
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
});