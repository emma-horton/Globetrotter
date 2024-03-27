// selected indicator is a global variable 
var selectedIndicator;
// Display different views
function displayStartPage() {
    document.body.classList.add("startpage-background");
    document.getElementById("header").style.display = "block";
    document.getElementById("choose-indicator-popup").style.display = "flex";
    document.getElementById("choose-country-popup").style.display = "none";
    document.getElementById("dashboard-header").style.display = "none";
    document.getElementById("indicator-dashboard-grid").style.display = "none";
    document.getElementById("country-dashboard-grid").style.display = "none";
    document.getElementById("timeslider-and-navigation").style.display = "none";       
}

function displayFirstDashboard() {
    document.body.classList.remove("startpage-background");
    document.getElementById("header").style.display = "none";
    document.getElementById("choose-indicator-popup").style.display = "none";
    document.getElementById("choose-country-popup").style.display = "none";
    document.getElementById("dashboard-header").style.display = "block";
    document.getElementById("indicator-dashboard-grid").style.display = "grid";
    document.getElementById("country-dashboard-grid").style.display = "none";
    document.getElementById("timeslider-and-navigation").style.display = "flex";
    
    document.getElementById("next-btn").onclick = displayCountryPopup;
}

function displayCountryPopup() {
    document.getElementById("header").style.display = "none";
    document.getElementById("choose-indicator-popup").style.display = "none";
    document.getElementById("choose-country-popup").style.display = "flex";
    document.getElementById("dashboard-header").style.display = "none";
    document.getElementById("indicator-dashboard-grid").style.display = "none";
    document.getElementById("country-dashboard-grid").style.display = "none";
    document.getElementById("timeslider-and-navigation").style.display = "none";        
}

function displaySecondDashboard() {
    document.getElementById("header").style.display = "none";
    document.getElementById("choose-indicator-popup").style.display = "none";
    document.getElementById("choose-country-popup").style.display = "none";
    document.getElementById("dashboard-header").style.display = "block";
    document.getElementById("indicator-dashboard-grid").style.display = "none";
    document.getElementById("country-dashboard-grid").style.display = "flex";
    document.getElementById("timeslider-and-navigation").style.display = "flex";        
}

displayStartPage();

function optionSelected(value) {
    console.log(value + " selected");
    document.getElementById("dahboard-heading").innerHTML = value;
    displayFirstDashboard();
}

// add onclick event if a country is chosen on the map
// it should call this function to show the second dashboard:
// displaySecondDashboard();



function showLifeExpectancyData(year=2015) {
    console.log("Life Expectancy Data Shown");
    let selectedData = 'reformatted_data/reformatted_life_expectancy.csv';
    selectedIndicator = 'life_expectancy'
    let yLabel = 'Life Expectancy (years)'
    let color = '#32CD32';
    const binSize = 2.5;
    document.getElementById("yearSlider").min = 1800;
    document.getElementById("yearSlider").max = 2024;
    loadAndUpdateLineChart(selectedData, selectedIndicator, yLabel, color);
    loadAndUpdateTop5Chart(selectedData, selectedIndicator, yLabel, color, year);
    loadAndUpdateDistributionChart('reformatted_data/reformatted_life_expectancy.csv', selectedIndicator, yLabel, color, binSize, year)
}

function showGenderEqualityData(year=2015) {
    console.log("Gender Equality Data Shown");
    let selectedData = 'reformatted_data/reformatted_gender_equality.csv';
    selectedIndicator = 'gender_ratio_of_mean_years_in_school'
    let yLabel = 'Gender Ratio of Mean Years in School'
    let color = '#FFA500';
    const binSize = 2.5;
    document.getElementById("yearSlider").min = 1970;
    document.getElementById("yearSlider").max = 2015;
    loadAndUpdateLineChart(selectedData, selectedIndicator, yLabel, color);
    loadAndUpdateTop5Chart(selectedData, selectedIndicator, yLabel, color, year);
    loadAndUpdateDistributionChart('reformatted_data/reformatted_gender_equality.csv', selectedIndicator, yLabel, color, binSize, year)
}

function showGdpPerCapitaData(year=2015) {
    console.log("GDP Per Capita Data Shown");
    let selectedData = 'reformatted_data/reformatted_gdp.csv';
    selectedIndicator = 'gdp_per_capita'
    let yLabel = 'GDP per capita (international dollars)'
    let color = '#6495ED';
    const binSize = 300;
    document.getElementById("yearSlider").min = 1800;
    document.getElementById("yearSlider").max = 2024;
    loadAndUpdateLineChart(selectedData, selectedIndicator, yLabel, color);
    loadAndUpdateTop5Chart(selectedData, selectedIndicator, yLabel, color, year);
    loadAndUpdateDistributionChart('reformatted_data/OUTLIERS_REMOVED_reformatted_gdp.csv', selectedIndicator, yLabel, color, binSize, year)
}

function showCo2EmissionData(year=2015) {
    console.log("CO2 Emission Data Shown");
    'reformatted_data/reformatted_co2.csv'
    let selectedData = 'reformatted_data/reformatted_CO2.csv';
    selectedIndicator = 'co2_per_capita'
    let yLabel = 'CO2 per capita (tonnes)'
    let color = '#BA55D3';
    const binSize = 0.25;
    document.getElementById("yearSlider").min = 1800;
    document.getElementById("yearSlider").max = 2022;
    loadAndUpdateLineChart(selectedData, selectedIndicator, yLabel, color);
    loadAndUpdateTop5Chart(selectedData, selectedIndicator, yLabel, color, year);
    loadAndUpdateDistributionChart('reformatted_data/OUTLIERS_REMOVED_reformatted_co2.csv', selectedIndicator, yLabel, color, binSize, year)
}
// Adding event listeners to buttons
document.getElementById("lifeExpectancyBtn").addEventListener("click", function() {showLifeExpectancyData(); optionSelected("Life Expectancy")});
document.getElementById("genderEqualityBtn").addEventListener("click", function() {showGenderEqualityData(); optionSelected("Gender Equality")});
document.getElementById("gdpPerCapitaBtn").addEventListener("click", function() {showGdpPerCapitaData(); optionSelected("GDP per Capita")});
document.getElementById("co2EmissionBtn").addEventListener("click", function() {showCo2EmissionData(); optionSelected("CO2 Emissions per Capita")});

// ---------------------------------------------------------------- Line Graph ------------------------------------------------------------------------------

// Loading and processing the CSV data
function loadAndUpdateLineChart(selectedData, selectedIndicator, yLabel, color) { 

    (async () => {
        const dataPath = selectedData;
        console.log("datapath", dataPath);

        const width = 600;					//specifies the width, height and margins of our SVG element
        const height = 300;
        const margin = 70;

        const data = await d3.csv(dataPath);

        // console.log(data);
        // console.table(data);		//loads table in a nice format - just to try it out (probably not super practical for this tutorial)

        const groupedData = d3.group(data, d => d.year); // groupss data for each year
        console.log(groupedData);

        // Calculate average life expectancy for each year
        const averageIndicatorPerYear = d3.rollup(data, 
            v => d3.mean(v, d => +d[selectedIndicator]), // Calculate average, convert life_expectancy to number
            d => d.year); // Group by year

        console.log(averageIndicatorPerYear);

        // Convert into array of objects for further processing/visualising
        const averageIndicatorArray = Array.from(averageIndicatorPerYear, ([year, average]) => ({ year, average }));
        console.log(averageIndicatorArray);

        const timeExtent = d3.extent(data, (d) => d.year);
        console.log("timeExtent", timeExtent);

        const xScale = d3.scaleLinear()
            .domain(d3.extent(averageIndicatorArray, d => +d.year)) // convert year to number
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(averageIndicatorArray, d => d.average), d3.max(averageIndicatorArray, d => d.average)])
            .range([height, 0]);

        const x_axis = d3.axisBottom(xScale);
        const y_axis = d3.axisLeft(yScale);

        // Remove existing SVG before appending a new one to prevent overlap
        d3.select("#linegraph").select("svg").remove();

        const svg = d3.select("#linegraph")		//creates an SVG element in the body
            .append("svg")
            .attr("width", width + margin *2)
            .attr("height", height + margin *2);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(${margin},${height})`) //make sure you get your brackets right!
            .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", `translate(${margin},0)`)
            .call(y_axis);

        const lineGenerator = d3.line()
            .x((d) => margin + xScale(+d.year))
            .y((d) => yScale(d.average));

        // Add the line
        svg.append("path")
        .datum(averageIndicatorArray)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);

        // Add the X Axis label
        svg.append("text")
            .attr("x", width / 2 + margin)
            .attr("y", height + margin * 0.7)
            .style("text-anchor", "middle")
            .text("Time");

        // Add the Y Axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(yLabel); // yLabel variable for dynamic labeling
    })();
}

// -------------------------------------------------------------- Top 5 Bar Chart -----------------------------------------------------------------------------

function loadAndUpdateTop5Chart(selectedData, selectedIndicator, yLabel, color, selectedYear) { 
    d3.csv(selectedData).then(function(data) {
        d3.select("#top5").select("svg").remove();
        // Setting margins and dimensions for the SVG canvas
        const margin = {top: 10, right: 20, bottom: 50, left: 100},
              svgWidth = 960,
              svgHeight = 250,
              width = svgWidth - margin.left - margin.right,
              height = svgHeight - margin.top - margin.bottom;

        // Create an SVG element within the #top5 container
        const svg = d3.select("#top5")
                      .append("svg")
                      .attr("width", svgWidth)
                      .attr("height", svgHeight)
                      .append("g")
                      .attr("transform", `translate(${margin.left},${margin.top})`);

        // Defining the x-axis scale based on life expectancy data
        const x = d3.scaleLinear()
                    .domain([0, d3.max(data, d => +d[selectedIndicator])])
                    .range([0, width]);

        // Adding the bottom axis to the SVG group
        svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
        
        // Adding label for the x-axis
        svg.append("text")             
        .attr("transform",
                "translate(" + (width/2) + " ," + 
                                (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text(yLabel);

        // Adding label for the y-axis
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Country"); 

        // Converting life expectancy data to numeric type
        data.forEach(function(d) {
            d[selectedIndicator] = +d[selectedIndicator];
        });

        // Sorting data to get top five countries by life expectancy
        data.sort(function(a, b) {
            return b[selectedIndicator] - a[selectedIndicator];
        });

        let topFive = data.slice(0, 5);
        console.log(topFive)

        // Calculating dimensions for bars in the bar chart
        const barHeight = 20;
        const barSpacing = 20; 
        const totalBarsHeight = topFive.length * (barHeight + barSpacing) - barSpacing;
        const startY = height - totalBarsHeight; 

        filterDataAndUpdateTop5Chart(selectedYear);
        // Filter the data for the selected year
        function filterDataAndUpdateTop5Chart(selectedYear) {
            let filteredData = data.filter(d => d.year == selectedYear);
            console.log(filteredData);
            updateTop5Timeline(filteredData);
        }


        function updateTop5Timeline(updatedData) {
            let topFiveUpdated = updatedData.sort((a, b) => b[selectedIndicator] - a[selectedIndicator]).slice(0, 5);
            console.log(topFiveUpdated)

            // Redraw bars for the top five countries
            svg.selectAll(".rect-top5")
            .data(topFiveUpdated)
            .enter()
            .append("rect")
            .attr("class", "rect-top5")
            .attr("x", 0)
            .attr("y", (d, i) => startY + i * (barHeight + barSpacing))
            .attr("width", d => x(+d[selectedIndicator]))
            .attr("height", barHeight) 
            .style("fill", color)
            .on("mouseenter", function(event, d) {
                d3.select(this)
                .transition()
                .duration(200)
                .style("fill", "#D3D3D3");

                d3.select(svg.node().parentNode)
                .append("text")
                .attr("class", "tooltip")
                .attr("x", event.x - margin.left - 50)
                .attr("y", event.y - margin.top - 50)
                .text(`${yLabel}: ${d[selectedIndicator]}`);
            })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .duration(200)
                .style("fill", color);

                d3.selectAll(".tooltip").remove();
            });
        
            // Adding country labels for the new bars
            svg.selectAll("text.label")
                .data(topFiveUpdated)
                .enter()
                .append("text")
                .attr("class", "label")
                .attr("x", -5)
                .attr("y", (d, i) => startY + i * (barHeight + barSpacing) + barHeight / 2 + 5)
                .attr("text-anchor", "end")
                .text(d => d.country);
        }   
    });
}

// ---------------------------------------------------------------- Distribution Plot ------------------------------------------------------------------------------
function loadAndUpdateDistributionChart(selectedData, selectedIndicator, yLabel, color, binSize, selectedYear) { 
    d3.csv(selectedData).then(function(data) {
        console.log(data)
        d3.select("#distribution").select("svg").remove();
        console.log(data)

        data.forEach(function(d) {
            d[selectedIndicator] = +d[selectedIndicator]; // '+' converts strings to numbers
        });
        const max = d3.max(data, d => d[selectedIndicator]);
        
        // Create bins
        const numBins = Math.ceil((max+1) / binSize);
        let bins = new Array(numBins).fill(0).map(() => []);
        
        // Assign data to bins
        data.forEach(function(d) {
            const index = Math.floor(d[selectedIndicator] / binSize);
            if (index >= 0 && index < bins.length) {
                bins[index].push(d);
            } else {
                console.log('error creating bin')
            }
        });
        console.log(bins);

        // Set the dimensions and margins of the graph
        const margin = {top: 10, right: 20, bottom: 50, left: 100},
            svgWidth = 960,
            svgHeight = 250,
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;

        // Append the svg object to the div called 'histogram'

        const svg = d3.select("#distribution")
          .append("svg")
          .attr("width", svgWidth)
          .attr("height", svgHeight)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        const yAxisGroup = svg.append("g")
                            .attr("class", "y-axis");

        // X axis: scale and draw
        const x = d3.scaleBand()
                    .range([0, width])
                    .domain(bins.map((d, i) => `Bin ${i + 1}`)) // Creating a label for each bin
                    .padding(0.1)
        
        // Y axis: scale and draw
        const y = d3.scaleLinear()
                    .domain([0, d3.max(bins, d => d.length)])
                    .range([height, 0]);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 50)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Number of Countries"); 

        // Add a fake X-axis to the chart
        const maxValue = d3.min(data, d => d[selectedIndicator]);
        const minValue = d3.max(data, d => d[selectedIndicator]);
        const fakeXScale = d3.scaleLinear()
            .domain([maxValue, minValue])
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(fakeXScale));
        svg.append("text")             
        .attr("transform",
                "translate(" + (width/2) + " ," + 
                                (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text(yLabel);

        // Plot bars
        svg.selectAll(".rect")
            .data(bins)
            .join("rect")
                .attr("x", (d, i) => x(`Bin ${i + 1}`))
                .attr("y", d => y(d.length))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.length))
                .style("fill", color);
        
        filterDataAndUpdateChart(selectedYear);
        
        // Filter the data for the selected year
        function filterDataAndUpdateChart(selectedYear) {
            let filteredData = data.filter(d => d.year == selectedYear);
            console.log(filteredData);
            updateTimeline(filteredData);
        }
        // set default year when indicator picked 
        filterDataAndUpdateChart(selectedYear);
        // Set the slider's value
        document.getElementById("yearSlider").value = selectedYear;
        document.getElementById("sliderValue").innerText = selectedYear;

        function updateTimeline(filteredData) {
            console.log(filteredData)
            updatedData = filteredData;
            console.log('Updated data: ', updatedData)
        
            updatedData.forEach(function(d) {
                d[selectedIndicator] = +d[selectedIndicator]; // '+' converts strings to numbers
            });
            const max = d3.max(updatedData, d => d[selectedIndicator]);
            
            // Create bins
            const numBins = Math.ceil((max + 1) / binSize);
            let bins = new Array(numBins).fill(0).map(() => []);
            
            // Assign data to bins
            updatedData.forEach(function(d) {
                const index = Math.floor(d[selectedIndicator] / binSize);
                if (index >= 0 && index < bins.length) {
                    bins[index].push(d);
                } else {
                    console.log('error creating bin')
                }
            });
            console.log('bins')
            console.log(bins);
        

            // Plot bars
            svg.selectAll(".rect")
                .data(bins)
                .join("rect")
                    .attr("x", (d, i) => x(`Bin ${i + 1}`))
                    .attr("y", d => y(d.length))
                    .attr("width", x.bandwidth())
                    .attr("height", d => height - y(d.length))
                    .style("fill", color);
            
            y.domain([0, d3.max(bins, d => d.length)]);
            svg.select(".y-axis")
                .call(d3.axisLeft(y));

        }

    });
        
}


document.getElementById("yearSlider").addEventListener("input", function() {
    let year = this.value;
    console.log(year);
    d3.select("#sliderValue").text(year); // Update the label with the current year

    // Call multiple functions within a single listener
    if (selectedIndicator  == 'life_expectancy') {
        showLifeExpectancyData(year)
    } else if (selectedIndicator  == 'gender_ratio_of_mean_years_in_school') {
        showGenderEqualityData(year)
    } else if (selectedIndicator  == 'gdp_per_capita') {
        showGdpPerCapitaData(year)

    } else if (selectedIndicator  == 'co2_per_capita') {
        showCo2EmissionData(year)
    }
});
