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

if (orders !== "undefined" && orders.length === 0) {
    $("#no-data-addition-pie-chart").removeClass("d-none");
} 
else {
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
    
    const addition_data = {};

    orders.forEach(order => {
        order.products_info.forEach(product => {
            Object.keys(product.additions).forEach(addition => {
                const formatted_addition = capitalizeWords(addition.replace(/_/g, ' '));
                const addition_count = product.additions[addition] ? product.amount : 0;
                addition_data[formatted_addition] = (addition_data[formatted_addition] || 0) + addition_count;
            });
        });
    });
    console.log(Object.entries(addition_data));
    const data_ready = Object.entries(addition_data).map(([addition, count]) => ({
        addition: addition,
        count: count
    }));

    const color = d3.scaleOrdinal()
        .range(d3.schemeSet2);

    const pie = d3.pie()
        .value(d => d.count);

    const pie_data = pie(data_ready);
    const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    svg.selectAll()
        .data(pie_data)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d) { return color(d.data.addition); })
        .attr("stroke", "black")
        .style("stroke-width", "0.125rem")
        .style("opacity", 0.85);

    svg.selectAll()
        .data(pie_data)
        .enter()
        .append('text')
        .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`; })
        .style("text-anchor", "middle")
        .style("font-size", 17)
        .selectAll("tspan")
        .data(function(d) {
            const totalCount = pie_data.reduce((total, entry) => total + entry.data.count, 0);
            const percentage = ((d.data.count / totalCount) * 100).toFixed(2);
            return [
                { label: d.data.addition },
                { label: `${d.data.count} (${percentage}%)` }
            ];
        })
        .enter()
        .append("tspan")
        .attr("x", 0)
        .attr("dy", (d, i) => (i === 0) ? 0 : "1.2em")
        .text(d => d.label);
}