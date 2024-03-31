// selected indicator is a global variable 
var GLOBALSelectedIndicator;
var GLOBALSelectedCountry = 'any';
var indicator; // string text of indicator without underscores (can be displayed as headlines for example)
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
    document.getElementById("dashboard-header").style.display = "flex";
    document.getElementById("indicator-dashboard-grid").style.display = "grid";
    document.getElementById("country-dashboard-grid").style.display = "none";
    document.getElementById("timeslider-and-navigation").style.display = "flex";
    document.getElementById("dahboard-heading").innerHTML = indicator;
    document.getElementById("next-btn").onclick = handleNextButton;
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
    document.getElementById("dashboard-header").style.display = "flex";
    document.getElementById("indicator-dashboard-grid").style.display = "none";
    document.getElementById("country-dashboard-grid").style.display = "grid";
    document.getElementById("timeslider-and-navigation").style.display = "flex";  
    document.getElementById("dahboard-heading").innerHTML = GLOBALSelectedCountry + " - " + indicator;
    console.log(GLOBALSelectedCountry); 
    displayPage();      
}

displayStartPage();

function optionSelected(value) {
    indicator = value;
    console.log(indicator + " selected");
    if (GLOBALSelectedCountry == 'any') {
        document.getElementById("dahboard-heading").innerHTML = indicator;
        displayFirstDashboard();
    } else {
        displaySecondDashboard();
    }
}

function updateGLOBALSelectedCountry() {
    GLOBALSelectedCountry = document.getElementById('country-dropdown').value;
    displaySecondDashboard();
}

function populateDropDownMenu() {
    // Initialize an empty array to hold the unique country names
    let uniqueCountries = [];

    // Load the CSV file
    d3.csv("reformatted_data/reformatted_all.csv").then(function(data) {
        // Loop over each row in the dataset
        data.forEach(function(row) {
            // Check if the country is already in the uniqueCountries array
            if (!uniqueCountries.includes(row.country)) {
                // If not, add it to the array
                uniqueCountries.push(row.country);
            }
        });

        // After processing all rows, populate the dropdown
        let dropdown = document.getElementById('country-dropdown');

        // Sort countries alphabetically if desired
        uniqueCountries.sort().forEach(function(country) {
            let option = document.createElement('option');
            option.value = option.textContent = country;
            dropdown.appendChild(option);
        });

    }).catch(function(error) {
        // Log any error that occurs during the loading of the CSV
        console.error('Error loading the CSV file:', error);
    });
}

function handleNextButton() {
    populateDropDownMenu();
    displayCountryPopup();
}


function showLifeExpectancyData(year=2009) {
    console.log("Life Expectancy Data Shown");
    let selectedData = 'reformatted_data/reformatted_life_expectancy.csv';
    GLOBALSelectedIndicator = 'life_expectancy'
    let yLabel = 'Life Expectancy (years)'
    let color = '#32CD32';
    const binSize = 1;
    document.getElementById("yearSlider").min = 1800;
    document.getElementById("yearSlider").max = 2024;
    document.getElementById("life_expectancy").style.display = "block";
    document.getElementById("gdp_per_capita").style.display = "none";
    document.getElementById("emissions_per_capita").style.display = "none";
    document.getElementById("education").style.display = "none";
    console.log(GLOBALSelectedCountry)
    if (GLOBALSelectedCountry == 'any'){
        loadAndUpdateWorldMap(selectedData, GLOBALSelectedIndicator, color, year);
        loadAndUpdateLineChart(selectedData, GLOBALSelectedIndicator, yLabel, color);
        loadAndUpdateTop5Chart(selectedData, GLOBALSelectedIndicator, yLabel, color, year);
        loadAndUpdateDistributionChart('reformatted_data/reformatted_life_expectancy.csv', GLOBALSelectedIndicator, yLabel, color, binSize, year, '#distribution')
        
    } else {
        console.log('dashboard2 only')
        loadAndUpdateDistributionChart('reformatted_data/reformatted_life_expectancy.csv', GLOBALSelectedIndicator, yLabel, color, binSize, year, GLOBALSelectedCountry)
        loadAndUpdateDistributionChartForSelectedCountry('reformatted_data/reformatted_life_expectancy.csv',GLOBALSelectedIndicator, yLabel, color, binSize, year, 'reformatted_data/reformatted_life_expectancy.csv')
        loadAndUpdateLineChartForSelectedCountry(selectedData, GLOBALSelectedIndicator, yLabel, color);
        loadAndUpdateWorldMapForSelectedCountry(selectedData, GLOBALSelectedIndicator, year);
    }
} 

function showGenderEqualityData(year=2009) {
    console.log("Education Data Shown");
    let selectedData = 'reformatted_data/reformatted_gender_equality.csv';
    GLOBALSelectedIndicator = 'mean_number_of_years_in_school'
    let yLabel = 'Mean Years in School'
    let color = '#FFA500';
    const binSize = 1;
    document.getElementById("yearSlider").min = 1970;
    document.getElementById("yearSlider").max = 2009;
    document.getElementById("life_expectancy").style.display = "none";
    document.getElementById("gdp_per_capita").style.display = "none";
    document.getElementById("emissions_per_capita").style.display = "none";
    document.getElementById("education").style.display = "block";
    if (GLOBALSelectedCountry == 'any'){
        loadAndUpdateWorldMap(selectedData, GLOBALSelectedIndicator, color, year);
        loadAndUpdateLineChart(selectedData, GLOBALSelectedIndicator, yLabel, color);
        loadAndUpdateTop5Chart(selectedData, GLOBALSelectedIndicator, yLabel, color, year);
        loadAndUpdateDistributionChart('reformatted_data/reformatted_gender_equality.csv', GLOBALSelectedIndicator, yLabel, color, binSize, year, '#distribution')
    } else {
        console.log('dashboard2 only')
        loadAndUpdateDistributionChartForSelectedCountry('reformatted_data/reformatted_gender_equality.csv',GLOBALSelectedIndicator, yLabel, color, binSize, year, 'reformatted_data/reformatted_gender_equality.csv')
        loadAndUpdateLineChartForSelectedCountry(selectedData, GLOBALSelectedIndicator, yLabel, color)
        loadAndUpdateWorldMapForSelectedCountry(selectedData, GLOBALSelectedIndicator, year)
    }
}

function showGdpPerCapitaData(year=2009) {
    console.log("GDP Per Capita Data Shown");
    let selectedData = 'reformatted_data/reformatted_gdp.csv';
    GLOBALSelectedIndicator = 'gdp_per_capita'
    let yLabel = 'GDP / capita (int. $)'
    let color = '#6495ED';
    const binSize = 300;
    document.getElementById("yearSlider").min = 1800;
    document.getElementById("yearSlider").max = 2024;
    document.getElementById("life_expectancy").style.display = "none";
    document.getElementById("gdp_per_capita").style.display = "block";
    document.getElementById("emissions_per_capita").style.display = "none";
    document.getElementById("education").style.display = "none";
    if (GLOBALSelectedCountry == 'any'){
        loadAndUpdateWorldMap(selectedData, GLOBALSelectedIndicator, color, year);
        loadAndUpdateLineChart(selectedData, GLOBALSelectedIndicator, yLabel, color);
        loadAndUpdateTop5Chart(selectedData, GLOBALSelectedIndicator, yLabel, color, year);
        loadAndUpdateDistributionChart('reformatted_data/reformatted_gdp.csv', GLOBALSelectedIndicator, yLabel, color, binSize, year, '#distribution')
    } else {
        console.log('dashboard2 only')
        loadAndUpdateDistributionChartForSelectedCountry('reformatted_data/reformatted_gdp.csv',GLOBALSelectedIndicator, yLabel, color, binSize, year, 'reformatted_data/reformatted_gdp.csv')
        loadAndUpdateLineChartForSelectedCountry(selectedData, GLOBALSelectedIndicator, yLabel, color)
        loadAndUpdateWorldMapForSelectedCountry(selectedData, GLOBALSelectedIndicator, year)
    }
}

function showCo2EmissionData(year=2009) {
    console.log("CO2 Emission Data Shown");
    let selectedData = 'reformatted_data/reformatted_CO2.csv';
    GLOBALSelectedIndicator = 'co2_per_capita'
    let yLabel = 'CO2 / capita (tonnes)'
    let color = '#BA55D3';
    const binSize = 0.25;
    document.getElementById("yearSlider").min = 1800;
    document.getElementById("yearSlider").max = 2022;
    document.getElementById("life_expectancy").style.display = "none";
    document.getElementById("gdp_per_capita").style.display = "none";
    document.getElementById("emissions_per_capita").style.display = "block";
    document.getElementById("education").style.display = "none";
    if (GLOBALSelectedCountry == 'any'){
        loadAndUpdateWorldMap(selectedData, GLOBALSelectedIndicator, color, year)
        loadAndUpdateLineChart(selectedData, GLOBALSelectedIndicator, yLabel, color);
        loadAndUpdateTop5Chart(selectedData, GLOBALSelectedIndicator, yLabel, color, year);
        loadAndUpdateDistributionChart('reformatted_data/reformatted_CO2.csv', GLOBALSelectedIndicator, yLabel, color, binSize, year, '#distribution')
    } else {
        console.log('dashboard2 only')
        loadAndUpdateDistributionChartForSelectedCountry('reformatted_data/reformatted_CO2.csv',GLOBALSelectedIndicator, yLabel, color, binSize, year, 'reformatted_data/reformatted_CO2.csv')
        loadAndUpdateLineChartForSelectedCountry(selectedData, GLOBALSelectedIndicator, yLabel, color)
        loadAndUpdateWorldMapForSelectedCountry(selectedData, GLOBALSelectedIndicator, year)
    }
}
// Adding event listeners to buttons

document.getElementById("lifeExpectancyBtn").addEventListener("click", function() {showLifeExpectancyData(); optionSelected("Life Expectancy")});
document.getElementById("genderEqualityBtn").addEventListener("click", function() {showGenderEqualityData(); optionSelected("Education")});
document.getElementById("gdpPerCapitaBtn").addEventListener("click", function() {showGdpPerCapitaData(); optionSelected("GDP per Capita")});
document.getElementById("co2EmissionBtn").addEventListener("click", function() {showCo2EmissionData(); optionSelected("CO2 Emissions per Capita")});

// ---------------------------------------------------------------- Line Graph ------------------------------------------------------------------------------

// Loading and processing the CSV data
function loadAndUpdateLineChart(selectedData, GLOBALSelectedIndicator, yLabel, color) { 

    console.log("inside linegraph");

    (async () => {
        const dataPath = selectedData;
        console.log("datapath", dataPath);

        const width = 800;					//specifies the width, height and margins of our SVG element
        const height = 160;
        const margin = 30;

        const data = await d3.csv(dataPath);

        // console.log(data);
        // console.table(data);		//loads table in a nice format - just to try it out (probably not super practical for this tutorial)

        const groupedData = d3.group(data, d => d.year); // groupss data for each year
        console.log(groupedData);

        // Calculate average life expectancy for each year
        const averageIndicatorPerYear = d3.rollup(data, 
            v => d3.mean(v, d => +d[GLOBALSelectedIndicator]), // Calculate average, convert life_expectancy to number
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
            .attr("y", height + margin * 1.2)
            .style("text-anchor", "middle")
            .text("Time");

        // Add the Y Axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin * 0.5)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(yLabel); // yLabel variable for dynamic labeling
    })();
}

function loadAndUpdateLineChartForSelectedCountry(selectedData, GLOBALSelectedIndicator, yLabel, color) {
    (async () => {
        const dataPath = selectedData;

        const width = 800;					//specifies the width, height and margins of our SVG element
        const height = 180;
        const margin = 50;

        const data = await d3.csv(dataPath);

        // console.log(data);
        // console.table(data);		//loads table in a nice format - just to try it out (probably not super practical for this tutorial)

        const groupedData = d3.group(data, d => d.year); // groupss data for each year


        // Filter data for the selected country
        const dataForSelectedCountry = data.filter(d => d.country === GLOBALSelectedCountry);
      

        // Calculate indicator per year for the selected country
        const indicatorPerYearForSelectedCountry = d3.rollup(dataForSelectedCountry, 
            v => d3.mean(v, d => +d[GLOBALSelectedIndicator]),
            d => d.year);

        // Convert into array of objects for further processing/visualizing
        const indicatorArrayForSelectedCountry = Array.from(indicatorPerYearForSelectedCountry, ([year, value]) => ({ year, value }));

        const maxValueSelectedCountry = Math.max(...indicatorArrayForSelectedCountry.map(obj => obj.value));
        const minValueSelectedCountry = Math.min(...indicatorArrayForSelectedCountry.map(obj => obj.value));

        // Calculate average life expectancy for each year
        const averageIndicatorPerYear = d3.rollup(data, 
            v => d3.mean(v, d => +d[GLOBALSelectedIndicator]),
            d => d.year); // Group by year

     

        // Convert into array of objects for further processing/visualising
        const averageIndicatorArray = Array.from(averageIndicatorPerYear, ([year, average]) => ({ year, average }));
        const maxMeanValue = Math.max(...averageIndicatorArray.map(obj => obj.average));
        const minMeanValue = Math.min(...averageIndicatorArray.map(obj => obj.average));
     

        // find range of values for y axis 
        let range = [minMeanValue, maxMeanValue, maxValueSelectedCountry, minValueSelectedCountry]


        const timeExtent = d3.extent(data, (d) => d.year);


        const xScale = d3.scaleLinear()
            .domain(d3.extent(averageIndicatorArray, d => +d.year)) // convert year to number
            .range([0, width]);
        
        const yScale = d3.scaleLinear()
            .domain([d3.min(range), d3.max(range)])
            .range([height, 0]);

        const x_axis = d3.axisBottom(xScale);
        const y_axis = d3.axisLeft(yScale);

        // Remove existing SVG before appending a new one to prevent overlap
        d3.select("#linegraph-specific-country").select("svg").remove();

        const svg = d3.select("#linegraph-specific-country")		//creates an SVG element
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

        // Plotting the line for the selected country
        const lineGeneratorForSelectedCountry = d3.line()
        .x((d) => margin + xScale(+d.year))
        .y((d) => yScale(d.value));

        // Add the line for the selected country
        svg.append("path")
            .datum(indicatorArrayForSelectedCountry)
            .attr("fill", "none")
            .attr("stroke", color) // Use a different color for distinction
            .attr("stroke-width", 2)
            .attr("d", lineGeneratorForSelectedCountry);
        
        // Plot line for world average
        const lineGenerator = d3.line()
            .x((d) => margin + xScale(+d.year))
            .y((d) => yScale(d.average));

        // Add the line for the world average
        svg.append("path")
        .datum(averageIndicatorArray)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "3,5")
        .attr("d", lineGenerator);

        // Add text label "[Country]"
        const firstDataPoint_country = indicatorArrayForSelectedCountry[0];
        svg.append("text")
            .attr("x", margin + xScale(+firstDataPoint_country.year)) // align with x value of the first data point
            .attr("y", yScale(firstDataPoint_country.value) - 13) // offset below line
            .attr("fill", color)
            .style("font-size", "10px")
            .style("text-anchor", "start") // text starts from starting point
            .text([GLOBALSelectedCountry]);
        
        // Add text label "world average"
        const firstDataPoint = averageIndicatorArray[0];
        svg.append("text")
            .attr("x", margin + xScale(+firstDataPoint.year))
            .attr("y", yScale(firstDataPoint.average) - 3)
            .attr("fill", "black")
            .style("font-size", "10px")
            .style("text-anchor", "start")
            .text("World Average");

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

function loadAndUpdateTop5Chart(selectedData, GLOBALSelectedIndicator, yLabel, color, selectedYear) { 
    d3.csv(selectedData).then(function(data) {
        d3.select("#top5").select("svg").remove();
        // Setting margins and dimensions for the SVG canvas
        const margin = {top: 10, right: 20, bottom: 50, left: 100},
              svgWidth = 800,
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
            d[GLOBALSelectedIndicator] = +d[GLOBALSelectedIndicator];
        });

        // if (GLOBALSelectedIndicator === "gender_ratio_of_mean_years_in_school") {
        //     // Sorting to get the top 5 countries closest to 100%
        //     data.sort(function(a, b) {
        //         return Math.abs(100-a[GLOBALSelectedIndicator]) - Math.abs(100-b)[GLOBALSelectedIndicator]; // I think this does not work https://stackoverflow.com/questions/26922131/sorting-an-array-by-which-value-is-closest-to-1
        //     });

        // Sorting data to get top five countries by indicator
        data.sort(function(a, b) {
            return b[GLOBALSelectedIndicator] - a[GLOBALSelectedIndicator];
        });

        let topFive = data.slice(0, 5);
        console.log("top5", topFive)

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
            let topFiveUpdated = updatedData.sort((a, b) => b[GLOBALSelectedIndicator] - a[GLOBALSelectedIndicator]).slice(0, 5);

            // let topFiveUpdated;
            // if (GLOBALSelectedIndicator === "gender_ratio_of_mean_years_in_school") {
            //     // Sorting to get the top 5 countries closest to 100%
            //     topFiveUpdated = updatedData.sort((a, b) => Math.abs(100-a[GLOBALSelectedIndicator]) - Math.abs(100-b)[GLOBALSelectedIndicator]).slice(0, 5)
            // } else {
            //     // Sorting data to get top five countries by indicator
            //     topFiveUpdated = updatedData.sort((a, b) => b[GLOBALSelectedIndicator] - a[GLOBALSelectedIndicator]).slice(0, 5)
            // }

            console.log(topFiveUpdated)
            // Defining the x-axis scale based on life expectancy data
            const x = d3.scaleLinear()
            .domain([0, d3.max(topFiveUpdated, d => +d[GLOBALSelectedIndicator])])
            .range([0, width]);

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

            const tooltipDiv = d3.select("body").append("div")
                .attr("id", "tooltip")
                .style("opacity", 0)
                .style("position", "absolute")
                .style("background", "#fff")
                .style("border", "1px solid #000")
                .style("padding", "10px")
                .style("border-radius", "5px")
                .style("pointer-events", "none");
        

            // Redraw bars for the top five countries
            svg.selectAll(".rect-top5")
                .data(topFiveUpdated)
                .enter()
                .append("rect")
                .attr("class", "rect-top5")
                .attr("x", 0)
                .attr("y", (d, i) => startY + i * (barHeight + barSpacing))
                .attr("width", d => x(+d[GLOBALSelectedIndicator]))
                .attr("height", barHeight)
                .style("fill", color)
                .on("mouseenter", function(event, d) {
                    tooltipDiv.html(`${yLabel}: ${d[GLOBALSelectedIndicator]}`) // Update tooltip content
                        .style("left", (event.pageX + 10) + "px") // Position tooltip to the right of the cursor
                        .style("top", (event.pageY - 10) + "px") // Position tooltip above the cursor
                        .style("opacity", 1); // Make tooltip visible

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("fill", "#D3D3D3"); // Highlight bar on hover
                })
                .on("mouseout", function() {
                    tooltipDiv.style("opacity", 0); // Hide tooltip

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("fill", color); // Revert bar color
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
function loadAndUpdateDistributionChart(selectedData, GLOBALSelectedIndicator, yLabel, color, binSize, selectedYear, idPlacement) { 
    d3.csv(selectedData).then(function(data) {
        console.log(data)
        d3.select(idPlacement).select("svg").remove();
        console.log(data)

        data.forEach(function(d) {
            d[GLOBALSelectedIndicator] = +d[GLOBALSelectedIndicator]; // '+' converts strings to numbers
        });
        const max = d3.max(data, d => d[GLOBALSelectedIndicator]);
        
        // Create bins
        const numBins = Math.ceil((max+1) / binSize);
        let bins = new Array(numBins).fill(0).map(() => []);
        
        // Assign data to bins
        data.forEach(function(d) {
            const index = Math.floor(d[GLOBALSelectedIndicator] / binSize);
            if (index >= 0 && index < bins.length) {
                bins[index].push(d);
            } else {
                console.log('error creating bin')
            }
        });
        console.log(bins);

        // Set the dimensions and margins of the graph
        const margin = {top: 10, right: 20, bottom: 50, left: 100},
            svgWidth = 800,
            svgHeight = 200,
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;

        // Append the svg object to the div called 'histogram'

        const svg = d3.select(idPlacement)
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
            // Clear existing bars
            svg.selectAll("rect")
            .remove();
            console.log(filteredData)
            updatedData = filteredData;
            //updatedData = filteredData;
            console.log('Updated data: ', updatedData)
        
            updatedData.forEach(function(d) {
                d[GLOBALSelectedIndicator] = +d[GLOBALSelectedIndicator]; // '+' converts strings to numbers
            });
            const max = d3.max(updatedData, d => d[GLOBALSelectedIndicator]);
            
            // Create bins
            const numBins = Math.ceil((max + 1) / binSize);
            let bins = new Array(numBins).fill(0).map(() => []);
            
            // Assign data to bins
            updatedData.forEach(function(d) {
                const index = Math.floor(d[GLOBALSelectedIndicator] / binSize);
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
                .attr("class", "rect") // Assign class for styling or selection
                .attr("x", (d, i) => x(`Bin ${i + 1}`))
                .attr("y", d => y(d.length))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.length))
                .style("fill", color) // Initial bar color
                .on("mouseenter", function(event, d) {
                    d3.select(this)
                        .transition() // Optional: smooth transition to hover color
                        .duration(200) // Transition duration in milliseconds
                        .style("fill", "#D3D3D3"); // Color when mouse enters the bar
                })
                .on("mouseout", function(event, d) {
                    d3.select(this)
                        .transition() // Optional: smooth transition back to original color
                        .duration(200)
                        .style("fill", color); // Revert to initial color when mouse leaves
                });
            
            y.domain([0, d3.max(bins, d => d.length)]);
            svg.select(".y-axis")
                .call(d3.axisLeft(y));

            x.domain(bins.map((d, i) => `Bin ${i + 1}`));
            svg.select(".x-axis")
                .call(d3.axisBottom(x));
            
            const maxValue = d3.min(updatedData, d => d[GLOBALSelectedIndicator]);
            const minValue = d3.max(updatedData, d => d[GLOBALSelectedIndicator]);
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

        }
    });
}

function loadAndUpdateDistributionChartForSelectedCountry(selectedData, GLOBALSelectedIndicator, yLabel, color, binSize, selectedYear, unmodifiedData, idPlacement='#distribution-specific-country'){   
    d3.csv(selectedData).then(function(data) {
            console.log(data)
            d3.select(idPlacement).select("svg").remove();
            console.log(data)

            data.forEach(function(d) {
                d[GLOBALSelectedIndicator] = +d[GLOBALSelectedIndicator];
            });
            const max = d3.max(data, d => d[GLOBALSelectedIndicator]);
            
            // Create bins
            const numBins = Math.ceil((max+1) / binSize);
            let bins = new Array(numBins).fill(0).map(() => []);
            
            // Assign data to bins
            data.forEach(function(d) {
                const index = Math.floor(d[GLOBALSelectedIndicator] / binSize);
                if (index >= 0 && index < bins.length) {
                    bins[index].push(d);
                } else {
                    console.log('error creating bin')
                }
            });
            console.log(bins);

            // Set the dimensions and margins of the graph
            const margin = {top: 10, right: 20, bottom: 50, left: 100},
                svgWidth = 800,
                svgHeight = 180,
                width = svgWidth - margin.left - margin.right,
                height = svgHeight - margin.top - margin.bottom;

            // Append the svg object to the div called 'histogram'

            const svg = d3.select(idPlacement)
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
                // Clear existing bars
                svg.selectAll("rect")
                .remove();
                console.log(filteredData)
                updatedData = filteredData;
                //updatedData = filteredData;
                console.log('Updated data: ', updatedData)
            
                updatedData.forEach(function(d) {
                    d[GLOBALSelectedIndicator] = +d[GLOBALSelectedIndicator]; // '+' converts strings to numbers
                });
                const max = d3.max(updatedData, d => d[GLOBALSelectedIndicator]);
                
                // Create bins
                const numBins = Math.ceil((max + 1) / binSize);
                let bins = new Array(numBins).fill(0).map(() => []);
                
                // Assign data to bins
                updatedData.forEach(function(d) {
                    const index = Math.floor(d[GLOBALSelectedIndicator] / binSize);
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
                    .attr("class", "rect") // Assign class for styling or selection
                    .attr("x", (d, i) => x(`Bin ${i + 1}`))
                    .attr("y", d => y(d.length))
                    .attr("width", x.bandwidth())
                    .attr("height", d => height - y(d.length))
                    .style("fill", color) // Initial bar color
                    .on("mouseenter", function(event, d) {
                        d3.select(this)
                            .transition() // Optional: smooth transition to hover color
                            .duration(200) // Transition duration in milliseconds
                            .style("fill", "#D3D3D3"); // Color when mouse enters the bar
                    })
                    .on("mouseout", function(event, d) {
                        d3.select(this)
                            .transition() // Optional: smooth transition back to original color
                            .duration(200)
                            .style("fill", color); // Revert to initial color when mouse leaves
                    });
                
                y.domain([0, d3.max(bins, d => d.length)]);
                svg.select(".y-axis")
                    .call(d3.axisLeft(y));
    
                x.domain(bins.map((d, i) => `Bin ${i + 1}`));
                svg.select(".x-axis")
                    .call(d3.axisBottom(x));
                
                const maxValue = d3.min(updatedData, d => d[GLOBALSelectedIndicator]);
                const minValue = d3.max(updatedData, d => d[GLOBALSelectedIndicator]);
                fakeXScale = d3.scaleLinear()
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
    
            }
        // Creates arrow pointing to specific position of a country on plot 
        if (GLOBALSelectedCountry !== 'any') {
            d3.csv(unmodifiedData).then(function(data) {
                const pointValue = findLifeExpectancyForYear(GLOBALSelectedCountry, selectedYear, data);
                console.log(pointValue)
                if (pointValue != null) {
                    const arrowXPosition = fakeXScale(pointValue);
                    const arrowYPosition = height; 
                    const arrowPath = "M0,0 L10,0 L5,10 L0,0"; 
                    svg.append("path")
                    .attr("d", arrowPath)
                    .attr("fill", "red") 
                    .attr("transform", `translate(${arrowXPosition - 5}, ${arrowYPosition})`); 
                }
            });
        }
        function findLifeExpectancyForYear(country, selectedYear, data) {
            const entry = data.find(d => d.country == country && d.year == selectedYear);
            return entry ? entry[GLOBALSelectedIndicator] : null;
        }
        });

}
     

// ---------------------------------------------------------------- Scatter Plot ------------------------------------------------------------------------------
function loadAndUpdateScatterPlotChart(selectedYear='2020', country) { 
    d3.csv('reformatted_data/reformatted_all_inc_education.csv').then(function(data) {
        console.log(data)
        d3.select("#scatter-plot").select("svg").remove();

        // function selects all countries in a given year and fin average of each metric 
        function calculateWorldAverages(year) {
            const filteredData = data.filter(d => d.year === year);
            console.log(filteredData)
            const updatedDataset = filteredData.map(item => {
                return {
                    ...item, // Spread operator to copy existing properties
                    gdp_per_capita: parseFloat(item.gdp_per_capita),
                    co2_per_capita: parseFloat(item.co2_per_capita),
                    life_expectancy: parseFloat(item.life_expectancy),
                    mean_number_of_years_in_school: item.mean_number_of_years_in_school ? parseFloat(item.mean_number_of_years_in_school) : null
                };
            });
            let educationNonNullCount = 0; // Counter for non-null education values
            const averages = updatedDataset.reduce((acc, cur) => {
                acc.gdp_per_capita += cur.gdp_per_capita;
                acc.co2_per_capita += cur.co2_per_capita;
                acc.life_expectancy += cur.life_expectancy;
                if (cur.mean_number_of_years_in_school !== null) { // Check if education value is non-null
                    acc.mean_number_of_years_in_school += cur.mean_number_of_years_in_school;
                    educationNonNullCount++; // Increment counter
                }
        
                return acc;
            }, { gdp_per_capita: 0, co2_per_capita: 0, life_expectancy: 0, mean_number_of_years_in_school: 0 });
        
            // Dividing each metric by the total number of entries
            averages.gdp_per_capita /= updatedDataset.length;
            averages.co2_per_capita /= updatedDataset.length;
            averages.life_expectancy /= updatedDataset.length;
            // Dividing education by the count of non-null education values
            averages.mean_number_of_years_in_school /= educationNonNullCount;
        
            return averages;
        }
        
        // function finds the value of each metric for a given country 
        function findMetricsByCountryYear(country, year) {
            const result = data.find(item => item.country == country && item.year == year);
            if (!result) {
              console.log(`No data available for ${country} in ${year}.`);
              return null;
            } else {
              return {
                country: country,
                year: year,
                gdp_per_capita: result.gdp_per_capita,
                co2_per_capita: result.co2_per_capita,
                life_expectancy: result.life_expectancy,
                mean_number_of_years_in_school: result.mean_number_of_years_in_school
              };
            }
        }

        // calculate percentage difference between countries metric and world average for each indicator
        world_average = calculateWorldAverages(selectedYear);
        console.log('world average: ', world_average)
        country_average = findMetricsByCountryYear(country, selectedYear);
        console.log('country average: ', country_average)

        gdp_percent_diff = ((parseFloat(country_average.gdp_per_capita) - world_average.gdp_per_capita) / world_average.gdp_per_capita) * 100
        co2_percent_diff = ((parseFloat(country_average.co2_per_capita)- world_average.co2_per_capita) / world_average.co2_per_capita) * 100
        life_expectancy_percent_diff = ((parseFloat(country_average.life_expectancy)- world_average.life_expectancy) / world_average.life_expectancy) * 100
        if (country_average.mean_number_of_years_in_school == ""){
            mean_number_of_years_in_school_percent_diff = null;
        } else{
            mean_number_of_years_in_school_percent_diff = ((parseFloat(country_average.mean_number_of_years_in_school)- world_average.mean_number_of_years_in_school) / world_average.mean_number_of_years_in_school) * 100
        }

        console.log(gdp_percent_diff)
        console.log(co2_percent_diff)
        console.log(life_expectancy_percent_diff)
        console.log(mean_number_of_years_in_school_percent_diff)


        // format data 
        const metricsData = [
                { metric: 'GDP per Capita', percentDiff: gdp_percent_diff },
                { metric: 'CO2 per Capita', percentDiff: co2_percent_diff },
                { metric: 'Life Expectancy', percentDiff: life_expectancy_percent_diff},
                { metric: 'Education', percentDiff: mean_number_of_years_in_school_percent_diff }
        ];
        // Setting margins and dimensions for the SVG canvas
        const margin = {top: 10, right: 20, bottom: 50, left: 100},
            svgWidth = 800,
            svgHeight = 200,
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;

        // Create an SVG element within the #top5 container
        const svg = d3.select("#scatter-plot")
                    .append("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);
        
        // X scale - Categorical
        const x = d3.scaleBand()
        .domain(metricsData.map(d => d.metric))
        .range([0, width])
        .padding(0.1);

        // scale y axis 
        const percentages = [gdp_percent_diff, co2_percent_diff, life_expectancy_percent_diff, mean_number_of_years_in_school_percent_diff ];
        const hasNegativeNumber = percentages.some(element => element < 0);
        const hasPositiveNumber = percentages.some(element => element > 0);
        let y;
        if (hasNegativeNumber === true) {
            if (hasPositiveNumber === true){
                y = d3.scaleLinear()
                        .domain([d3.min(percentages), d3.max(percentages)])
                        .range([height, 0]);
            } else {
                y = d3.scaleLinear()
                        .domain([d3.min(percentages), 0])
                        .range([height, 0]);
            }
        } else if (hasNegativeNumber === false) {
            y = d3.scaleLinear()
                        .domain([0, d3.max(percentages)])
                        .range([height, 0]);
        }

        svg.append("g")
        .call(d3.axisLeft(y));

        svg.append("text")
        .attr("text-anchor", "middle") 
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20) 
        .attr("x", -(height / 2)) 
        .text("%Difference from World Average");


        // Add x-axis
        svg.append("g")
        .attr("transform", `translate(0,${y(0)})`)
        .call(d3.axisBottom(x));

        const tooltipDiv = d3.select("body").append("div")
        .attr("class", "tooltip-div") // Use a class for styling
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "solid 1px #000")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("pointer-events", "none"); // Ignore pointer events

        

        // Plotting points with conditional fill colors
        svg.selectAll(".point")
        .data(metricsData.filter(d => d.percentDiff !== null)) // Continue filtering out null values
        .enter().append("circle")
        .attr("class", "point")
        .attr("cx", d => x(d.metric) + x.bandwidth() / 2)
        .attr("cy", d => y(d.percentDiff))
        .attr("r", 10)
        .attr("fill", d => {
            // Determine fill color based on the metric
            if (d.metric === 'GDP per Capita') return '#6495ED';
            else if (d.metric === 'CO2 per Capita') return '#BA55D3';
            else if (d.metric === 'Life Expectancy') return '#32CD32';
            else if (d.metric === 'Education') return '#FFA500';
            else return "steelblue";
        })
        .on("mouseenter", function(event, d) {
            tooltipDiv.html(`Indicator: ${d.metric}<br>% Difference: ${d.percentDiff.toFixed(2)}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .style("opacity", 1);
            
            d3.select(this)
                .attr("r", 12); // Optionally enlarge point on hover for emphasis
        })
        .on("mouseout", function() {
            tooltipDiv.style("opacity", 0);
            
            d3.select(this)
                .attr("r", 10); // Revert point size
        });



    })
}

// ---------------------------------------------------------------- World Map ---------------------------------------------------------------------------------------

function loadAndUpdateWorldMap(selectedData, GLOBALSelectedIndicator, color, year) {

    console.log("inside loadAndUpdateWorldMap");

    (async () => {

        console.log("inside async world map function");
        // token
        let token = "pk.eyJ1IjoibHNrNSIsImEiOiJjbHU5cDV4aWgwYmcyMnFudDMxNHdjOXhrIn0.ZE-NoOXAw8wF5hg2OCQlUw";

        const dataPath = selectedData;

        mapboxgl.accessToken = token;

        // replace later to account for slider interaction
        // let selectedYear = 2009;
        let selectedYear = year;

        const csvData = await d3.csv(dataPath);
        console.log("data:", csvData);
        const geoJSON = await d3.json("raw_data/countries.geo.json");
        // console.log("geoJSON data:", geoJSON);
        // console.log("Number of features in geoJSON:", geoJSON.features.length);

        // Extract country names from CSV data
        const csvCountryNames = new Set(csvData.map(d => d.country));

        // Extract country names from GeoJSON data
        const geoJsonCountryNames = new Set(geoJSON.features.map(feature => feature.properties.name));

        // Find country names in CSV that are not in GeoJSON
        const missingInGeoJson = Array.from(csvCountryNames).filter(name => !geoJsonCountryNames.has(name));

        // Find country names in GeoJSON that are not in CSV
        const missingInCsv = Array.from(geoJsonCountryNames).filter(name => !csvCountryNames.has(name));

        //console.log("Missing in GeoJSON:", missingInGeoJson);
        //console.log("Missing in CSV:", missingInCsv);

        const nameMapping = {
            "Andorra": "Andorra",
            "UAE": "United Arab Emirates",
            "Antigua and Barbuda": "Antigua and Barbuda",
            "Bahrain": "Bahrain",
            "Bahamas": "The Bahamas",
            "Barbados": "Barbados",
            "Cote d'Ivoire": "Ivory Coast",
            "Congo, Dem. Rep.": "Democratic Republic of the Congo",
            "Congo, Rep.": "Republic of the Congo",
            "Comoros": "Comoros",
            "Cape Verde": "Cape Verde",
            "Dominica": "Dominica",
            "Micronesia, Fed. Sts.": "Micronesia",
            "UK": "United Kingdom",
            "Guinea-Bissau": "Guinea Bissau",
            "Grenada": "Grenada",
            "Hong Kong, China": "Hong Kong",
            "Kyrgyz Republic": "Kyrgyzstan",
            "Kiribati": "Kiribati",
            "St. Kitts and Nevis": "Saint Kitts and Nevis",
            "Lao": "Laos",
            "St. Lucia": "Saint Lucia",
            "Liechtenstein": "Liechtenstein",
            "Maldives": "Maldives",
            "Marshall Islands": "Marshall Islands",
            "North Macedonia": "Macedonia",
            "Mauritius": "Mauritius",
            "Nauru": "Nauru",
            "Palau": "Palau",
            "Palestine": "West Bank",
            "Singapore": "Singapore",
            "Serbia": "Republic of Serbia",
            "Sao Tome and Principe": "Sao Tome and Principe",
            "Slovak Republic": "Slovakia",
            "Eswatini": "Swaziland",
            "Seychelles": "Seychelles",
            "Timor-Leste": "East Timor",
            "Tonga": "Tonga",
            "Tuvalu": "Tuvalu",
            "Tanzania": "United Republic of Tanzania",
            "USA": "United States of America",
            "St. Vincent and the Grenadines": "Saint Vincent and the Grenadines",
            "Samoa": "Samoa"
        };


        const mapBox = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/light-v10",
            center: [10, 30],
            zoom: 0.6
        })

        // Function to check if the map is loaded, then update it
        function ensureMapIsLoadedAndUpdate(mapBox, updateFunction) {
            if (mapBox.isStyleLoaded()) {
                updateFunction();
            } else {
                mapBox.on('load', updateFunction);
            }
        }

        // Function to update the map based on the selected year
        function updateMap(selectedYear, geoJSON, csvData) {
            // Filter CSV data for the selected year
            const filteredData = csvData.filter(d => +d.year == selectedYear);
            
            // Create a map from country name to its data for easier access
            let countryDataMap;

            if(GLOBALSelectedIndicator == 'life_expectancy') {
                countryDataMap = new Map(filteredData.map(d => [d.country, +d.life_expectancy]));
            } else if (GLOBALSelectedIndicator  == 'mean_number_of_years_in_school') {
                countryDataMap = new Map(filteredData.map(d => [d.country, +d.mean_number_of_years_in_school]));
            } else if (GLOBALSelectedIndicator  == 'gdp_per_capita') {
                countryDataMap = new Map(filteredData.map(d => [d.country, +d.gdp_per_capita]));
            } else if (GLOBALSelectedIndicator  == 'co2_per_capita') {
                countryDataMap = new Map(filteredData.map(d => [d.country, +d.co2_per_capita]));
            }
            

            if (!geoJSON.features) {
                console.error('The loaded geoJSON does not contain any features. Check the file structure.');
                return;
            }


            // Finding the min and max CO2 per capita values for the color scale domain
            const co2Values = Array.from(countryDataMap.values());
            const maxCo2 = Math.max(...co2Values);
            const minCo2 = Math.min(...co2Values);

            let colorScale;

            // Define a color scale dependent on the chosen indicator
            if(GLOBALSelectedIndicator == 'life_expectancy') {
                colorScale = d3.scaleSequential(d3.interpolateGreens)
                                    .domain([minCo2, maxCo2]); // Set the domain of the color scale to min and max values
            } else if (GLOBALSelectedIndicator  == 'mean_number_of_years_in_school') {
                colorScale = d3.scaleSequential(d3.interpolate("#FFF5EE", "orange"))
                                    .domain([minCo2, maxCo2]);
            } else if (GLOBALSelectedIndicator  == 'gdp_per_capita') {
                colorScale = d3.scaleSequential(d3.interpolateBlues)
                                    .domain([minCo2, maxCo2]);
            } else if (GLOBALSelectedIndicator  == 'co2_per_capita') {
                colorScale = d3.scaleSequential(d3.interpolatePurples)
                                    .domain([minCo2, maxCo2]);
            }
            
            
            geoJSON.features.forEach(feature => {
                let countryName = feature.properties.name;
                // If the GeoJSON country name is in the mapping, use the mapped name instead
                //const mappedName = Object.keys(nameMapping).find(key => nameMapping[key] === countryName);
                //countryName = mappedName || countryName; // Use the original name if no mapping exists
                
                const co2Value = countryDataMap.get(countryName);
                feature.properties.dataValue = co2Value || 0; // Use 0 if no data available
            });

            
            // Update Mapbox layer:
            // Function to run once the map is loaded or immediately if it's already loaded
            const updateFunction = () => {
                console.log("updateFunction is called");

                // Check if the 'countries-choropleth' layer exists and remove it if it does
                if (mapBox.getLayer('countries-choropleth')) {
                    mapBox.removeLayer('countries-choropleth');
                }

                if (mapBox.getSource('countries')) {
                    // If the source already exists, update its data
                    mapBox.getSource('countries').setData(geoJSON);
                } else {
                    // Remove water layers => does not have the desired effect unfortunately
                    // To make the water on the map transparent, the "land" layer has to be invisible, but then updating the map does not work properly anymore
                    const water_layers = ['water', 'water-shadow'] 
                    
                    // Other layers:
                    // "land", "landcover", "national-park", "landuse", "water-shadow","hillshade","land-structure-polygon", "land-structure-line", "aeroway-polygon", "aeroway-line",
                    // "building-outline", "building","tunnel-street-minor-low", "tunnel-street-minor-case", "tunnel-primary-secondary-tertiary-case", "tunnel-major-link-case", "tunnel-motorway-trunk-case", "tunnel-construction", "tunnel-path", "tunnel-steps", "tunnel-major-link", "tunnel-pedestrian",
                    // "tunnel-street-minor", "tunnel-primary-secondary-tertiary", "tunnel-motorway-trunk", "road-pedestrian-case", "road-minor-low",  "road-street-low", "road-minor-case", "road-street-case", "road-secondary-tertiary-case", "road-primary-case", "road-major-link-case", "road-motorway-trunk-case",
                    // "road-construction", "road-path", "road-steps", "road-major-link", "road-pedestrian", "road-minor", "road-street", "road-secondary-tertiary","road-primary", "road-motorway-trunk", "road-rail", "bridge-pedestrian-case", "bridge-street-minor-low", "bridge-street-minor-case", "bridge-primary-secondary-tertiary-case",
                    // "bridge-motorway-trunk-2", "admin-1-boundary-bg", "admin-0-boundary-bg", "admin-1-boundary", "admin-0-boundary", "admin-0-boundary-disputed", "road-label",
                    // "waterway-label", "natural-line-label", "natural-point-label", "water-line-label", "water-point-label", "poi-label", "airport-label", "settlement-subdivision-label", "settlement-label", "state-label", "country-label"
                    
                    // water_layers.forEach(layer => {
                    //     // mapBox.setPaintProperty(layer, 'fill-opacity', 0);
                    //     mapBox.setLayoutProperty(layer, 'visibility', 'none');})
                    
                    // Add source and layer
                    mapBox.addSource('countries', {
                        type: 'geojson',
                        data: geoJSON
                    });

                    mapBox.addLayer({
                        id: 'countries-choropleth',
                        type: 'fill',
                        source: 'countries',
                        layout: {},
                        paint: {
                            // dynamically set the fill-color based on 'dataValue'
                            'fill-color': [
                                'interpolate',
                                ['linear'],
                                ['get', 'dataValue'],
                                minCo2, colorScale(minCo2), // Mapping min CO2 to lighter green
                                maxCo2, colorScale(maxCo2)  // Mapping max CO2 to darker green
                            ],
                            'fill-opacity': 0.8
                        }
                    });
                    console.log("Layer added. Current layers:", mapBox.getStyle().layers.map(layer => layer.id));

                    // Add click event listener to the 'countries-choropleth' layer
                    mapBox.on('click', 'countries-choropleth', function(e) {
                        if (e.features.length > 0) {
                            const countryName = e.features[0].properties.name;
                            GLOBALSelectedCountry = countryName;
                            console.log("Clicked on " + GLOBALSelectedCountry);
                            displaySecondDashboard();
                        }
                    });

                    // Change the cursor to a pointer when the mouse is over the layer.
                    mapBox.on('mouseenter', 'countries-choropleth', function() {
                        mapBox.getCanvas().style.cursor = 'pointer';
                    });

                    // Change it back to a default cursor when it leaves.
                    mapBox.on('mouseleave', 'countries-choropleth', function() {
                        mapBox.getCanvas().style.cursor = '';
                    });

                    // Popup for more Information
                    const popup = new mapboxgl.Popup({
                        closeButton: false,
                        closeOnClick: false
                    });

                    // Function to get the value for a country, using the name mapping as a fallback
                    function getValueForCountry(countryName, countryDataMap, nameMapping) {
                        let value = countryDataMap.get(countryName); // Attempt to get the value directly

                        if (value === undefined) {
                            // If direct retrieval failed, attempt to use the alternative name
                            const alternativeName = Object.keys(nameMapping).find(key => nameMapping[key] === countryName);
                            if (alternativeName) {
                                value = countryDataMap.get(alternativeName); // Attempt with alternative name
                            }
                        }

                        return value;
                    }
                    
                    mapBox.on('mousemove', 'countries-choropleth', function(e) {
                        if (e.features.length > 0) {
                            const feature = e.features[0];
                            const countryName = feature.properties.name;
                            
                            // Use the new function to get the value for the country
                            const value = getValueForCountry(countryName, countryDataMap, nameMapping);
                            
                            // Check if the value is still undefined, it means there's no data available for this country
                            const displayValue = value !== undefined ? value : 'No data available';
                            const description = `${countryName} - ${indicator}: ${displayValue}`;
                            
                            // Populate the popup and set its coordinates based on the feature found.
                            popup.setLngLat(e.lngLat)
                                 .setHTML(description)
                                 .addTo(mapBox);
                        }
                    });
                    
                    

                    mapBox.on('mouseleave', 'countries-choropleth', function() {
                        mapBox.getCanvas().style.cursor = '';
                        popup.remove(); // hides the popup when the mouse leaves the country
                    });
                    
                }
        };
        
        // Check if the map is loaded and then update
        ensureMapIsLoadedAndUpdate(mapBox, updateFunction);

        }
        updateMap(selectedYear, geoJSON, csvData);
    })();

}

function loadAndUpdateWorldMapForSelectedCountry(selectedData, GLOBALSelectedIndicator, year) {
    console.log("inside loadAndUpdateWorldMapForSelectedCountry");

    document.getElementById("country-on-map").innerHTML = GLOBALSelectedCountry + " on the Map";
    document.getElementById("heading-infobox-country").innerHTML = "Welcome to " + GLOBALSelectedCountry + "!";

    (async () => {

        console.log("inside async world map function");
        // token
        let token = "pk.eyJ1IjoibHNrNSIsImEiOiJjbHU5cDV4aWgwYmcyMnFudDMxNHdjOXhrIn0.ZE-NoOXAw8wF5hg2OCQlUw";

        const dataPath = selectedData;

        mapboxgl.accessToken = token;

        // replace later to account for slider interaction
        // let selectedYear = 2009;
        let selectedYear = year;

        const csvData = await d3.csv(dataPath);
        console.log("data:", csvData);
        const geoJSON = await d3.json("raw_data/countries.geo.json");
        // console.log("geoJSON data:", geoJSON);
        // console.log("Number of features in geoJSON:", geoJSON.features.length);

        // Extract country names from CSV data
        const csvCountryNames = new Set(csvData.map(d => d.country));

        // Extract country names from GeoJSON data
        const geoJsonCountryNames = new Set(geoJSON.features.map(feature => feature.properties.name));

        // Find country names in CSV that are not in GeoJSON
        const missingInGeoJson = Array.from(csvCountryNames).filter(name => !geoJsonCountryNames.has(name));

        // Find country names in GeoJSON that are not in CSV
        const missingInCsv = Array.from(geoJsonCountryNames).filter(name => !csvCountryNames.has(name));

        //console.log("Missing in GeoJSON:", missingInGeoJson);
        //console.log("Missing in CSV:", missingInCsv);

        const nameMapping = {
            "Andorra": "Andorra",
            "UAE": "United Arab Emirates",
            "Antigua and Barbuda": "Antigua and Barbuda",
            "Bahrain": "Bahrain",
            "Bahamas": "The Bahamas",
            "Barbados": "Barbados",
            "Cote d'Ivoire": "Ivory Coast",
            "Congo, Dem. Rep.": "Democratic Republic of the Congo",
            "Congo, Rep.": "Republic of the Congo",
            "Comoros": "Comoros",
            "Cape Verde": "Cape Verde",
            "Dominica": "Dominica",
            "Micronesia, Fed. Sts.": "Micronesia",
            "UK": "United Kingdom",
            "Guinea-Bissau": "Guinea Bissau",
            "Grenada": "Grenada",
            "Hong Kong, China": "Hong Kong",
            "Kyrgyz Republic": "Kyrgyzstan",
            "Kiribati": "Kiribati",
            "St. Kitts and Nevis": "Saint Kitts and Nevis",
            "Lao": "Laos",
            "St. Lucia": "Saint Lucia",
            "Liechtenstein": "Liechtenstein",
            "Maldives": "Maldives",
            "Marshall Islands": "Marshall Islands",
            "North Macedonia": "Macedonia",
            "Mauritius": "Mauritius",
            "Nauru": "Nauru",
            "Palau": "Palau",
            "Palestine": "West Bank",
            "Singapore": "Singapore",
            "Serbia": "Republic of Serbia",
            "Sao Tome and Principe": "Sao Tome and Principe",
            "Slovak Republic": "Slovakia",
            "Eswatini": "Swaziland",
            "Seychelles": "Seychelles",
            "Timor-Leste": "East Timor",
            "Tonga": "Tonga",
            "Tuvalu": "Tuvalu",
            "Tanzania": "United Republic of Tanzania",
            "USA": "United States of America",
            "St. Vincent and the Grenadines": "Saint Vincent and the Grenadines",
            "Samoa": "Samoa"
        };


        const mapBox2 = new mapboxgl.Map({
            container: "map-country",
            style: "mapbox://styles/mapbox/light-v10",
            center: [10, 30],
            zoom: 1
        })

        // Function to check if the map is loaded, then update it
        function ensureMapIsLoadedAndUpdate(mapBox2, updateFunction) {
            if (mapBox2.isStyleLoaded()) {
                updateFunction();
            } else {
                mapBox2.on('load', updateFunction);
            }
        }

        // Function to update the map based on the selected year
        function updateMap(selectedYear, geoJSON, csvData) {
            // Filter CSV data for the selected year
            const filteredData = csvData.filter(d => +d.year == selectedYear);
            
            // Create a map from country name to its data for easier access
            let countryDataMap;

            if(GLOBALSelectedIndicator == 'life_expectancy') {
                countryDataMap = new Map(filteredData.map(d => [d.country, +d.life_expectancy]));
            } else if (GLOBALSelectedIndicator  == 'mean_number_of_years_in_school') {
                countryDataMap = new Map(filteredData.map(d => [d.country, +d.mean_number_of_years_in_school]));
            } else if (GLOBALSelectedIndicator  == 'gdp_per_capita') {
                countryDataMap = new Map(filteredData.map(d => [d.country, +d.gdp_per_capita]));
            } else if (GLOBALSelectedIndicator  == 'co2_per_capita') {
                countryDataMap = new Map(filteredData.map(d => [d.country, +d.co2_per_capita]));
            }
            

            if (!geoJSON.features) {
                console.error('The loaded geoJSON does not contain any features => check file structure');
                return;
            }


            // Finding the min and max CO2 per capita values for the color scale domain
            const co2Values = Array.from(countryDataMap.values());
            const maxCo2 = Math.max(...co2Values);
            const minCo2 = Math.min(...co2Values);

            let colorScale;

            // Define a color scale dependent on the chosen indicator
            if(GLOBALSelectedIndicator == 'life_expectancy') {
                colorScale = d3.scaleSequential(d3.interpolateGreens)
                                    .domain([minCo2, maxCo2]); // Set the domain of the color scale to min and max values
            } else if (GLOBALSelectedIndicator  == 'mean_number_of_years_in_school') {
                colorScale = d3.scaleSequential(d3.interpolate("#FFF5EE", "orange"))
                                    .domain([minCo2, maxCo2]);
            } else if (GLOBALSelectedIndicator  == 'gdp_per_capita') {
                colorScale = d3.scaleSequential(d3.interpolateBlues)
                                    .domain([minCo2, maxCo2]);
            } else if (GLOBALSelectedIndicator  == 'co2_per_capita') {
                colorScale = d3.scaleSequential(d3.interpolatePurples)
                                    .domain([minCo2, maxCo2]);
            }
            

            
            geoJSON.features.forEach(feature => {
                let countryName = feature.properties.name;
                // If the GeoJSON country name is in the mapping, use the mapped name instead
                //const mappedName = Object.keys(nameMapping).find(key => nameMapping[key] === countryName);
                //countryName = mappedName || countryName; // Use the original name if no mapping exists
                
                const co2Value = countryDataMap.get(countryName);
                feature.properties.dataValue = co2Value || 0; // Use 0 if no data available
            });

            
            // Update Mapbox layer:
            // Function to run once the map is loaded or immediately if it's already loaded
            const updateFunction = () => {
                console.log("updateFunction is called");
                if (mapBox2.getSource('countries')) {
                    // If the source already exists, update its data
                    mapBox2.getSource('countries').setData(geoJSON);
                } else {
                    // Add source and layer
                    mapBox2.addSource('countries', {
                        type: 'geojson',
                        data: geoJSON
                    });

                    mapBox2.addLayer({
                        id: 'countries-choropleth',
                        type: 'fill',
                        source: 'countries',
                        layout: {},
                        paint: {
                            // dynamically set the fill-color based on 'dataValue'
                            'fill-color': [
                                'interpolate',
                                ['linear'],
                                ['get', 'dataValue'],
                                minCo2, colorScale(minCo2), // Mapping min CO2 to lighter green
                                maxCo2, colorScale(maxCo2)  // Mapping max CO2 to darker green
                            ],
                            'fill-opacity': 0.7
                        }
                    });
                    console.log("Layer added. Current layers:", mapBox2.getStyle().layers.map(layer => layer.id));

                    // Add click event listener to the 'countries-choropleth' layer
                    mapBox2.on('click', 'countries-choropleth', function(e) {
                        if (e.features.length > 0) {
                            const countryName = e.features[0].properties.name;
                            GLOBALSelectedCountry = 'any';
                            // console.log("back to " + GLOBALSelectedCountry);
                            displayFirstDashboard();
                        }
                    });

                    // Change the cursor to a pointer when the mouse is over the layer.
                    mapBox2.on('mouseenter', 'countries-choropleth', function() {
                        mapBox2.getCanvas().style.cursor = 'pointer';
                    });

                    // Change it back to a default cursor when it leaves.
                    mapBox2.on('mouseleave', 'countries-choropleth', function() {
                        mapBox2.getCanvas().style.cursor = '';
                    });

                    // Find the feature for GLOBALSelectedCountry
                    const countryFeature = geoJSON.features.find(feature => feature.properties.name === GLOBALSelectedCountry || feature.properties.name === nameMapping[GLOBALSelectedCountry]);
                    console.log("countryFeature", countryFeature)
                    if (countryFeature) {
                        // Calculate bounding box with Turf.js
                        const bbox = turf.bbox(countryFeature);

                        // Zoom to the bounding box, with some padding
                        mapBox2.fitBounds(bbox, { padding: 20 });
                    } else {
                        console.log("Selected country feature not found in GeoJSON.");
                    }

                    // Popup for more Information
                    const popup2 = new mapboxgl.Popup({
                        closeButton: false,
                        closeOnClick: false
                    });

                    // Function to get the value for a country, using the name mapping as a fallback
                    function getValueForCountry(countryName, countryDataMap, nameMapping) {
                        let value = countryDataMap.get(countryName); // Attempt to get the value directly

                        if (value === undefined) {
                            // If direct retrieval failed, attempt to use the alternative name
                            const alternativeName = Object.keys(nameMapping).find(key => nameMapping[key] === countryName);
                            if (alternativeName) {
                                value = countryDataMap.get(alternativeName); // Attempt with alternative name
                            }
                        }

                        return value;
                    }
                    
                    mapBox2.on('mousemove', 'countries-choropleth', function(e) {
                        if (e.features.length > 0) {
                            const feature = e.features[0];
                            const countryName = feature.properties.name;
                            
                            // Use the new function to get the value for the country
                            const value = getValueForCountry(countryName, countryDataMap, nameMapping);
                            
                            // Check if the value is still undefined, it means there's no data available for this country
                            const displayValue = value !== undefined ? value : 'No data available';
                            const description = `${countryName} - ${indicator}: ${displayValue}`;
                            
                            // Populate the popup and set its coordinates based on the feature found
                            popup2.setLngLat(e.lngLat)
                                 .setHTML(description)
                                 .addTo(mapBox2);
                        }
                    });
                    
                    mapBox2.on('mouseleave', 'countries-choropleth', function() {
                        mapBox2.getCanvas().style.cursor = '';
                        popup2.remove(); // hides the popup when the mouse leaves the country
                    });

                }

            };
        
        // Check if the map is loaded and then update
        ensureMapIsLoadedAndUpdate(mapBox2, updateFunction);

        }
        updateMap(selectedYear, geoJSON, csvData);
    })();

}

// ---------------------------------------------------------------- Filter by Year ------------------------------------------------------------------------------

document.getElementById("yearSlider").addEventListener("input", function() {
    let year = this.value;
    console.log(year);
    d3.select("#sliderValue").text(year); 

    displayPage(year);
})

function displayPage(year='2009') {
    // Call functions based on selected indicator
    if (GLOBALSelectedIndicator  == 'life_expectancy') {
        showLifeExpectancyData(year)
    } else if (GLOBALSelectedIndicator  == 'mean_number_of_years_in_school') {
        showGenderEqualityData(year)
    } else if (GLOBALSelectedIndicator  == 'gdp_per_capita') {
        showGdpPerCapitaData(year)
    } else if (GLOBALSelectedIndicator  == 'co2_per_capita') {
        showCo2EmissionData(year)
    }
    if (GLOBALSelectedCountry != 'any'){
        loadAndUpdateScatterPlotChart(year, GLOBALSelectedCountry);
    }
}

function redirectToFactbook() {
    d3.csv('reformatted_data/country_factbook_links.csv').then(function(data) {
        // Transform the array of objects into an object with country names as keys and URLs as values
        var countryURLMap = data.reduce(function(map, obj) {
            map[obj.country] = obj.link;
            return map;
        }, {});

        console.log(GLOBALSelectedCountry);
        // Use the country name to get the URL from the map
        var url = countryURLMap[GLOBALSelectedCountry];
        console.log(url);

        if (url) { // Make sure the url is not undefined
            window.open(url, 'Popup', 'width=600,height=400,resizable=yes');
        } else {
            console.log('URL not found for selected country');
        }
    });
}