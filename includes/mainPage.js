   $(document).ready(function() {
   
 	var w = 1000;
    var h = 600;

    var svg = d3.select("#line")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("id", "visualization")
      .attr("xmlns", "http://www.w3.org/2000/svg");

	var x = d3.scale.linear().domain([0, 10]).range([0, 990]);
    var y = d3.scale.linear().domain([0, 10]).range([10, 590]);
    
    var data = d3.range(11).map(function(){return Math.random()*10;});
	var data2 = d3.range(11).map(function(){return Math.random()*10;});
	var data3 = d3.range(11).map(function(){return Math.random()*10;});
	var emptyline = d3.range(11).map(function(){return Math.random()*10;});
	var emptyline2 = d3.range(11).map(function(){return Math.random()*10;});
	var emptyline3 = d3.range(11).map(function(){return Math.random()*10;});
	var emptyline4 = d3.range(11).map(function(){return Math.random()*10;});
	
	var textPosition1 = data[3];
	var textPosition2 = data2[6];
	var textPosition3 = data3[9];
	
	console.log(textPosition1);
	console.log(textPosition2);
	console.log(textPosition3);
	
    var line= d3.svg.line()
      .interpolate("linear")
      .x(function(d,i) {return x(i);})
      .y(function(d) {return y(d);});
	

	
	var link1 = d3.select('#link1').style('top',y(data[3])+'px').style('left',3*100+'px').style('display','block');
	var link2 = d3.select('#link2').style('top',y(data2[6])+'px').style('left',6*100+'px').style('display','block');
	var link3 = d3.select('#link3').style('top',y(data3[9])+'px').style('left',9*100+'px').style('display','block');
	
    var path = svg.append("path")
      .attr("d", line(data))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", "2")
      .attr("fill", "none");

      		
	var path2 = svg.append("path")
      .attr("d", line(data2))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", "2")
      .attr("fill", "none");
   	var path3 = svg.append("path")
      .attr("d", line(data3))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", "2")
      .attr("fill", "none"); 
    var pathempty = svg.append("path")
      .attr("d", line(emptyline))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", "2")
      .attr("fill", "none");
     var pathempty2 = svg.append("path")
      .attr("d", line(emptyline2))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", "2")
      .attr("fill", "none");
    var pathempty3 = svg.append("path")
      .attr("d", line(emptyline3))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", "2")
      .attr("fill", "none");
     var pathempty4 = svg.append("path")
      .attr("d", line(emptyline4))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", "2")
      .attr("fill", "none");   
    var totalLength = path.node().getTotalLength();
	var totalLength2 = path2.node().getTotalLength();
	
	var totalLengthempty = pathempty.node().getTotalLength();
	var totalLengthempty2 = pathempty2.node().getTotalLength();
	var totalLengthempty3 = pathempty3.node().getTotalLength();
	var totalLengthempty4 = pathempty4.node().getTotalLength();
	
	path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", 0);

	path2
      .attr("stroke-dasharray", totalLength2 + " " + totalLength2)
      .attr("stroke-dashoffset", 0);
      
	pathempty
      .attr("stroke-dasharray", totalLengthempty + " " + totalLengthempty)
      .attr("stroke-dashoffset", 0);
	pathempty2
      .attr("stroke-dasharray", totalLengthempty2 + " " + totalLengthempty2)
      .attr("stroke-dashoffset", 0);
	pathempty3
      .attr("stroke-dasharray", totalLengthempty3 + " " + totalLengthempty3)
      .attr("stroke-dashoffset", 0);
	pathempty4
      .attr("stroke-dasharray", totalLengthempty4 + " " + totalLengthempty4)
      .attr("stroke-dashoffset", 0);
            
      
      
      
   d3.select('#link1').on("mouseover", function() {
       	var pathOver = svg.append("path")
      .attr("d", line(data))
      .attr("stroke", "steelblue")
      .attr("stroke-width", "2")
      .attr("fill", "none") 
      .attr("stroke-dasharray", totalLength + " " + totalLength)
 	  .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease("linear")
      .attr("stroke-dashoffset", 0);	
    	
    });  
    d3.select('#link2').on("mouseover", function() { 
    	    var pathOver2 = svg.append("path")
      .attr("d", line(data2))
      .attr("stroke", "#f2b852")
      .attr("stroke-width", "2")
      .attr("fill", "none") 
      .attr("stroke-dasharray", totalLength + " " + totalLength)
 	  .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease("linear")
      .attr("stroke-dashoffset", 0);   
     	 });   
     	 
    d3.select('#link3').on("mouseover", function() {   
    	    var pathOver3 = svg.append("path")
      .attr("d", line(data3))
      .attr("stroke", "red")
      .attr("stroke-width", "2")
      .attr("fill", "none") 
      .attr("stroke-dasharray", totalLength + " " + totalLength)
 	  .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease("linear")
      .attr("stroke-dashoffset", 0); 
     	 });  
 
});