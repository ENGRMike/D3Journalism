d3.select(window).on("resize", handleResize);

createChart();

function handleResize() {
    var svgArea = d3.select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
        createChart();
    };
};

function createChart(){
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var svgWidth = 960;
    var svgHeight = 500;

    var margin={
        top: 20,
        right: 40,
        bottom: 60,
        left: 100
    }

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select(".chart")
        .append("svg")
        .attr("width", svgWidth).attr("height", svgHeight)
    
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("Data/PovertyVsActivity.csv", function(err, data){
        if (err) throw err;

        data.forEach(function(input) {
            input.poverty = +input.poverty;
            input.physicalActivity = +input.physicalActivity;
            input.Obesity = +input.Obesity
        });

        var xLinearScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.poverty)).range([0, width])
        
        var yLinearScale = d3.scaleLinear()
            .domain([55, d3.max(data, d => d.physicalActivity + 10 )]).range([height, 0])
        
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis)
        
        chartGroup.append("g").call(leftAxis)

        var dataCircles = chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.physicalActivity))
            .attr("r", "10")
            .attr("fill", "red")
            .attr("opacity", ".75")
        
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
                return (`${d.state}<br>Poverty: ${d.poverty}<br>Physical Activity: ${d.physicalActivity}`);
            });
        
        chartGroup.call(toolTip);

        dataCircles.on("mouseover", function(data){
            toolTip.show(data);
        })

        dataCircles.on("mouseout", function(data){
            toolTip.hide(data);
        });
        
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height / 2))
            .attr("dy", "len")
            .attr("class", "axisText")
            .text("Physical Activity (%)")
        
        chartGroup.append("text")
            .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("Poverty (%)")
    });
}