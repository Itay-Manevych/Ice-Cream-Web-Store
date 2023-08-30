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

const orders = await getAllOrders();
const uniqueDays = Array.from(new Set(orders.map(order => order.date.slice(0, 10))));
const uniqueProducts = Array.from(new Set(orders.flatMap(order => order.products_info.map(product => product.product_name))));

if (orders !== "undefined" && orders.length === 0) {
    $("#no-data-sales-heatmap").removeClass("d-none");
} 
else {
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
        
            const timeValue = date.slice(0, 10);
        
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
      .style("padding", "5px");

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
}