import { ProductFunctions } from "../Dashboard/Product/productFunctions.js";

const getAllOrders = async () => {
    try {
        const response = await $.ajax({
            url: '/dashboard/orders', 
            type: 'GET',
        });
        return response;
    }
    catch(error) {
        console.log("AJAX error occured when retrieving all orders", error);
    }
} 
const products = await ProductFunctions.getAllProducts()
const orders = await getAllOrders();
const uniqueDays = Array.from(new Set(orders.map(order => order.date.slice(0, 10))));
const uniqueProducts = Array.from(new Set(orders.flatMap(order => order.products_info.map(product => product.product_name))));

const productBarChart = () => {
    const margin = { top: 20, right: 80, bottom: 80, left: 100 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#product-bar-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom + 100)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const productData = products.map(product => ({
        name: product.name,
        amount: product.amount_purchased
    }));

    const x = d3.scaleBand()
        .domain(productData.map(d => d.name))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(productData, d => d.amount)])
        .nice()
        .range([height, 0]);

    svg.selectAll('.bar')
        .data(productData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.amount))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.amount));

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "0.7em")
        .attr("transform", "rotate(-45)");

    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)  
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Amount Ordered");

    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + 90) 
        .style("text-anchor", "middle")
        .text("Product Name");
};

const additionPieChart = () => {
    const capitalizeWords = (str) => {
        return str.replace(/\w+/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
    }

    const width = 450;
    const height = 450;
    const margin = 20;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#addition-pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const additionData = {};

    orders.forEach(order => {
        order.products_info.forEach(product => {
            Object.keys(product.additions).forEach(addition => {
                const formattedAddition = capitalizeWords(addition.replace(/_/g, ' '));
                const additionCount = product.additions[addition] ? product.amount : 0;
                additionData[formattedAddition] = (additionData[formattedAddition] || 0) + additionCount;
            });
        });
    });

    const data_ready = Object.entries(additionData).map(([addition, count]) => ({
        addition,
        count
    }));

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet2);

    const pie = d3.pie()
        .value(d => d.count);

    const pie_data = pie(data_ready);

    const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    svg.selectAll('mySlices')
        .data(pie_data)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d) { return color(d.data.addition); })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    svg.selectAll('mySlices')
        .data(pie_data)
        .enter()
        .append('text')
        .text(function(d) { return `${d.data.addition} (${d.data.count})`; }) 
        .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`; })
        .style("text-anchor", "middle")
        .style("font-size", 17);
};

const salesHeatmap = () => {
    const margin = { top: 0, right: 25, bottom: 30, left: 150 },
    width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    const svg = d3
        .select("#sales-heatmap")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const aggregatedSalesData = {};

    orders.forEach(order => {
        const date = order.date; 
        const products = order.products_info;

        products.forEach(product => {
            const productName = product.product_name;
            console.log(date);
            const timeInterval = 'day'; 
        
            const timeValue = timeInterval === 'day' ? date.slice(0, 10) : date.getHours();
        
            if (!aggregatedSalesData[timeValue]) {
                aggregatedSalesData[timeValue] = {};
            }
        
            if (!aggregatedSalesData[timeValue][productName]) {
                aggregatedSalesData[timeValue][productName] = 0;
            }
        
            aggregatedSalesData[timeValue][productName]++;
        });
    });

    const heatmapData = [];
    uniqueDays.forEach(day => {
        uniqueProducts.forEach(product => {
            heatmapData.push({
                group: day,
                variable: product,
                value: aggregatedSalesData[day][product] || 0
            });
        });
    });
    
    const data = heatmapData;
    
    const myGroups = Array.from(new Set(data.map(d => d.group)))
    const myVars = uniqueProducts;

    const x = d3.scaleBand()
        .range([0, width])
        .domain(myGroups)
        .padding(0.1); 

    const y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.25)
        .round(true) 

    svg.append("g")
        .style("font-size", 15)
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    svg.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove();

    const minValue = 1;
    const maxValue = d3.max(data, d => d.value);
    
    const myColor = d3.scaleLog()
        .domain([minValue, maxValue])
        .range(["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"]);

    const tooltip = d3.select("#sales-heatmap")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")


    const mouseover = function(event,d) {
      tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "#C0C0C0")
        .style("opacity", 1)
    }

    const mousemove = function(event, d) {
        tooltip
          .html(`Product: ${d.variable}<br>Orders: ${d.value}`)
          .style("opacity", 1)
    };

    const mouseleave = function(event,d) {
      tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    svg.selectAll()
        .data(data, d => d.group + ':' + d.variable) 
        .join("rect")
        .attr("x", function(d) { return x(d.group); })
        .attr("y", function(d) { return y(d.variable); })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth())
        .attr("height", 15)
        .style("fill", function(d) {
            const salesValue = d.value;
            const normalizedSales = (salesValue - minValue) / (maxValue - minValue) || 0;
            return myColor(normalizedSales);
        })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
};

productBarChart();
additionPieChart();
salesHeatmap();