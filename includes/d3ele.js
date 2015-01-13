$(document).ready(function() {
var policedata=[];
var armydata=[];
var currectYear;
var svg = null;
var xScale;
var yScale;
	// create the first view on when page loaded first time
	createView("./json/police2012.json","./json/army2012.json");

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
	
	var police = "./json/police"+currectYear+".json";
	var army = "./json/army"+currectYear+".json";
	console.log("police:"+ police);
	console.log("army:"+ army);
	console.log("Before json");

    
    createView(police,army);
	
};



function createView(police,army){
	
	
	 // SVG height and width
				var h = 600;
				var w = 1000;
				var padding = 120;
				var barWidth = 20; 
				
				
	    d3.json(police,function(policeError,policedata){
       				 if (policeError) return console.warn(policeError);
       		 		
					        console.log("Police dataset is: "+policedata);
        
    
       		d3.json(army,function(armyError,armydata){
        				if (armyError) return console.warn(armyError);
        	
        					console.log("Army dataset is: "+armydata);
        					
        		d3.json("./json/ranks.json",function(ranksError,ranks){
        					if (ranksError) return console.warn(ranksError);
        					
        					console.log("Rank dataset is: "+ranks);
  		
        
   if (svg == null){
   
				
				console.log("Create View - svg is null");

				
				//Create Scales
				xScale = d3.scale.ordinal()
					.domain(ranks.map(function(d) {return d.Rank;}))
					.rangeBands([padding,w-padding]);
				
				yScale = d3.scale.linear()
				.domain([0,d3.max(policedata, function(d) {return d.AverageSalary  + 20000;})])
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
				svg = d3.select("body") 
				.append("svg")
				.attr("width",w)
				.attr("height",h)
				.attr("class","svg");
				
				
				//Create X axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (h - padding + 5) + ")")
					.call(xAxis);
			
				//Create Y axis
				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + (padding - 5) + ",0)")
					.call(yAxis);


				// SVG first view
				svg.append("g")   // append new group of objects to svg
				.attr("id","policeBars")	// this is the group attribus
				
				.selectAll("rect")				
				.data(policedata)	// insert the dataset to the imagening circles
				.enter()
				.append("rect")
				.attr("class","policeBar")
				.attr("width", barWidth)
				.attr("y", function(d) {return yScale(d.AverageSalary);})
				.attr("height", function(d) {return h - yScale(d.AverageSalary)-padding;})
				.data(ranks)
				.attr("x",function(d) {return xScale(d.Rank)+barWidth+8;});
											
				svg.append("g")
				.attr("id","armyBars")				
				.selectAll("rect")
				.data(armydata)
				.enter()
				.append("rect")
				.attr("class","armyBar")
				.attr("width",barWidth)
				.attr("y", function(d) {return yScale(d.AverageSalary);})
				.attr("height", function(d) {return h - yScale(d.AverageSalary)-padding;})
				.data(ranks)
				.attr("x",function(d) {return xScale(d.Rank)+(2*barWidth)+8;});

				
				svg.append("g")
					.attr("id","policeBarsText")
					.selectAll("text")
					.data(policedata)	// insert the json data to the imagening circles
					.enter()
					.append("text")	
					.attr("fill", "white")
.attr("x", function(d,i) {
    return x(i)+x.rangeBand()/2;
})
.attr("y", function(d,i) {
    return height-y(d)+yTextPadding;
})
.text(function(d){
     return d;
});
					/*
					.text(function(d) { return d.AverageSalary; })				
					.attr("y", function(d) {return yScale(d.AverageSalary);})
					.attr("height", function(d) {return h - yScale(d.AverageSalary)-padding;})
					.data(ranks)
					.attr("x",function(d) {return xScale(d.Rank)+barWidth+8;});*/
							
		
			}// close if svg == null
			else{
				console.log("Create View- update svg != null");
				// update value with transaction
				
				// first update the scales
				xScale.domain(ranks.map(function(d) {return d.Rank;}));
				yScale.domain([0,d3.max(policedata, function(d) {return d.AverageSalary  + 20000;})]);
				//update the SVG circles
				svg.selectAll(".policeBar")
					.data(policedata)	// insert the new police json to the rects
					.transition()
					.duration(2000)		// animation time in ms
					.attr("y", function(d) {return yScale(d.AverageSalary);})
					.attr("height", function(d) {return h - yScale(d.AverageSalary)-padding;});
					//.data(ranks)
					//.attr("x",function(d) {return xScale(d.Rank)+barWidth;});
				svg.selectAll(".armyBar")
				.data(armydata)	// insert the new army json to the rects
				.transition()
				.duration(2000)		// animation time in ms
				.attr("y", function(d) {return yScale(d.AverageSalary);})
				.attr("height", function(d) {return h - yScale(d.AverageSalary)-padding;});
				//.data(ranks)
				//.attr("x",function(d) {return xScale(d.Rank)+(2*barWidth);});

				
					//Update the text location
				/*	svg.selectAll("text")
						.data(policedata)
						.transition()
						.duration(2000)	
						.attr("dx", function (d,i) {return xScale(i*10);})
						.attr("dy", function (d) {return yScale(d.AverageSalary*5);});
				*/
			}
						});  // close rank database 
					});		// close army dataset
					});		//close police database 
 			};	// close create view			

});
				

/*				
		
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