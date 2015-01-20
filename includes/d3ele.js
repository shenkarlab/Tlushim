$(document).ready(function() {
	var currectYear;
	var chart;
	createView("./csv/apdata2012.csv");


$(".slider")                    
    .slider({ 
        min: 2002, 
        max: 2012,
        orientation: "vertical",
        slide: function(event, ui) {
	        currectYear = ui.value;
	      setValue((ui.value));
	      changeViewByYear();
	    }
    })
                    
    .slider("pips", {
        rest: "label",
        step: "5"
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
	
	var data = "./csv/apdata"+currectYear+".csv";
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
       		Police: '#b0b0b0',
       		Army: '#ffffff'
       }
        
    },
        bar: {
       			 width: 11
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
                format: function (x) { return '*'; }
            }
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
});