// Données pour la pyramide des âges
const data = [
    { ageGroup: '0-4', male: 1000000, female: 950000 },
    { ageGroup: '5-9', male: 950000, female: 900000 },
    { ageGroup: '10-14', male: 900000, female: 850000 },
    { ageGroup: '15-19', male: 850000, female: 800000 },
    { ageGroup: '20-24', male: 800000, female: 780000 },
    { ageGroup: '25-29', male: 780000, female: 750000 },
    { ageGroup: '30-34', male: 750000, female: 730000 },
    { ageGroup: '35-39', male: 730000, female: 710000 },
    { ageGroup: '40-44', male: 710000, female: 700000 },
    { ageGroup: '45-49', male: 700000, female: 690000 },
    { ageGroup: '50-54', male: 690000, female: 680000 },
    { ageGroup: '55-59', male: 680000, female: 670000 },
    { ageGroup: '60-64', male: 670000, female: 660000 },
    { ageGroup: '65-69', male: 660000, female: 650000 },
    { ageGroup: '70-74', male: 650000, female: 640000 },
    { ageGroup: '75-79', male: 640000, female: 630000 },
    { ageGroup: '80-84', male: 630000, female: 620000 },
    { ageGroup: '85+', male: 620000, female: 610000 } ];

// Dimensions du graphique
const margin = { top: 20, right: 30, bottom: 40, left: 30 }; const width = 800 - margin.left - margin.right; const height = 600 - margin.top - margin.bottom;

// Création de l'élément SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Echelles des axes
const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => Math.max(d.male, d.female))])
    .range([0, width / 2]);

const y = d3.scaleBand()
    .domain(data.map(d => d.ageGroup))
    .range([height, 0])
    .padding(0.1);

// Ajout des barres pour la population masculine
svg.selectAll(".bar.male")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar male")
    .attr("x", d => width / 2 - x(d.male))
    .attr("y", d => y(d.ageGroup))
    .attr("width", d => x(d.male))
    .attr("height", y.bandwidth())
    .attr("fill", "blue");

// Ajout des barres pour la population féminine
svg.selectAll(".bar.female")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar female")
    .attr("x", width / 2)
    .attr("y", d => y(d.ageGroup))
    .attr("width", d => x(d.female))
    .attr("height", y.bandwidth())
    .attr("fill", "pink");

// Ajout des axes
svg.append("g")
    .attr("transform", `translate(${width / 2}, 0)`)
    .call(d3.axisLeft(y));

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x.copy().domain([0, d3.max(data, d => Math.max(d.male, d.female))])));

// Ajout des légendes
svg.append("text")
    .attr("x", width / 4)
    .attr("y", height + margin.bottom)
    .attr("text-anchor", "middle")
    .text("Hommes");

svg.append("text")
    .attr("x", (3 * width) / 4)
    .attr("y", height + margin.bottom)
    .attr("text-anchor", "middle")
    .text("Femmes");
