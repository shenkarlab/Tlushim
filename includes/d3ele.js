$(document).ready(function() {
var policedata=[];
var armydata=[];
var currectYear;

  $("#slider-background").slider({
    min: 2002,
    max: 2012,
    value: 2012,
        range: "min",
        animate: true,
    slide: function(event, ui) {
        currectYear = ui.value;
      setValue((ui.value));
      changeViewByYear();
    }});
 
  var mySlider = document.createElement('value');
  $('#slider-container').append(mySlider);
  mySlider.id = "mySlider";
	



function setValue(myValue) {
	// myValue is the currect year!! 
    var mySlider = document.getElementById('mySlider');
    mySlider.value = myValue;
    console.log(currectYear);
}


function changeViewByYear(){
	console.log(currectYear);
	
	var police = "../json/police"+currectYear+".json";
	var army = "../json/army"+currectYear+".json";
	console.log("police:"+ police);
	console.log("army:"+ army);
	console.log("Before json");
    d3.json(police,function(error,data){
        if (error) return console.warn(error);
        policedata = data;
        console.log("Dataset is: "+policedata);
        
    });
        d3.json(army,function(error,data){
        if (error) return console.warn(error);
        armydata = data;
        console.log("Dataset is: "+armydata);
        
    });
    
    createView();
	
};

function createView(){
				// SVG height and width
				var h = 600;
				var w = 1000;
				var padding = 120;
				
				//Create Scales
				var xScale = d3.scale.linear()
					.domain([0,d3.max(policedata, function(d,i) {return i*10 ;})])
					.range ([padding, w-padding]);				
				var yScale = d3.scale.linear()
				.domain([0,d3.max(policedata, function(d) {return d.AverageSalary * 5;})])
				.range ([h-padding, padding]);
				
				//Define x axis
				var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.ticks(15);

				//Define y axis
				var yAxis = d3.svg.axis()				
				.scale(yScale)
				.orient("left")  // the position of values on the axis
				.ticks(15);		// suggestion of the axis splits
				
				//Create the svg
				var svg = d3.select("body") 
				.append("svg")
				.attr("width",w)
				.attr("height",h)
				.attr("class","svg");
				
				// SVG first view
				svg.append("g")   // append new group of objects to svg
				.attr("id","circles")	// this is the group attribus
				.selectAll("circle")
				.data(policedata)	// insert the dataset to the imagening circles
				.enter()
				.append("circle")
				.attr("cx" , function (d,i) {return xScale(i*10);})
				.attr("cy" , function (d) {return yScale(d.AverageSalary*5);})
				.attr("r",  function (d) {return (d.AverageSalary/10000);});	
				
							
};

});
				

				

/*				
				svg.append("g")
					.attr("id","circleText")
					.selectAll("text")
					.data(data)	// insert the json data to the imagening circles
					.enter()
					.append("text")					
					.attr("dx", function (d,i) {return xScale(i*10);})
					.attr("dy", function (d) {return yScale(d.Births*5);})
					.text(function(d) { return d.Municipality; });		
		
		
// Button init		
d3.select("#death")		// we select the button id tag
	.on("click", function() { // on() used to bind an eventListener to an element
		
	//update the yScale and xScale
	xScale.domain([0,d3.max(data, function(d,i) { return i*10 ;})]);
	yScale.domain([0,d3.max(data, function(d) {return d.Deaths * 5;;})]);
	
	//update the SVG circles
	svg.selectAll("circle")
	.data(data)	// insert the dataset to the imagening circles
	.transition()
	.duration(2000)		// animation time in ms
	.attr("cx" , function (d,i) {return xScale(i*10);})
	.attr("cy" , function (d) {return yScale(d.Deaths * 5);});
	
	//Update the text location
	svg.selectAll("text")
		.data(data)
		.transition()
		.duration(2000)	
		.attr("dx", function (d,i) {return xScale(i*10);})
		.attr("dy", function (d) {return yScale(d.Deaths*5);});
		}); // finish death button	
		
			
d3.select("#birth")		// we select the <input> tag
	.on("click", function() { // on() used to bind an eventListener to an element
		
	//update the yScale and xScale
	xScale.domain([0,d3.max(data, function(d,i) { return i*10 ;})]);
	yScale.domain([0,d3.max(data, function(d) {return d.Births * 5;;})]);
	
	//update the SVG circles
	svg.selectAll("circle")
	.data(data)	// insert the dataset to the imagening circles
	.transition()
	.duration(2000)		// animation time in ms
	.attr("cx" , function (d,i) {return xScale(i*10);})
	.attr("cy" , function (d) {return yScale(d.Births * 5);});
	
		//Update the text location
	svg.selectAll("text")
		.data(data)
		.transition()
		.duration(2000)	
		.attr("dx", function (d,i) {return xScale(i*10);})
		.attr("dy", function (d) {return yScale(d.Births*5);});	
		
		}); // finish birth button	
		
d3.select("#multi")		// we select the button id tag
	.on("click", function() { // on() used to bind an eventListener to an element
		
	//update the yScale and xScale
	xScale.domain([0,d3.max(data, function(d,i) { return i*10 ;})]);
	yScale.domain([0,d3.max(data, function(d) {return d.Multi_For_1000 * 5;;})]);
	
	
	//update the SVG circles
	svg.selectAll("circle")
	.data(data)	// insert the dataset to the imagening circles
	.transition()
	.duration(2000)		// animation time in ms
	.attr("cx" , function (d,i) {return xScale(i*10);})
	.attr("cy" , function (d) {return yScale(d.Multi_For_1000 * 5);});

	svg.selectAll("text")
		.data(data)
		.transition()
		.duration(2000)	
		.attr("dx", function (d,i) {return xScale(i*10);})
		.attr("dy", function (d) {return yScale(d.Multi_For_1000*5);});			
		
		}); // finish multi button			
			
			});*/