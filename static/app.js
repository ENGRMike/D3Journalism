d3.select(window).on("resize", handleResize);


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
            if (error) throw error;

            data.forEach(function(input) {
                input.poverty = +input.poverty;
                input.physicalActivity = +input.physicalActivity;
                input.Obesity = +inpuy.Obesity
            });
        })
}