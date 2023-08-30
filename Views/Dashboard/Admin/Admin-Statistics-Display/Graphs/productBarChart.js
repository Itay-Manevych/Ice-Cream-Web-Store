import { ProductFunctions } from "../../../Product/productFunctions.js";

const products = await ProductFunctions.getAllProducts();

if (products !== "undefined" && products.length === 0) {
    $("#no-data-product-bar-chart").removeClass("d-none");
} 
else {
    const margin = { top: 20, right: 80, bottom: 60, left: 100 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#product-bar-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right + 150)
        .attr('height', height + margin.top + margin.bottom + 200)
        .attr('id', 'product-bar-chart-svg')
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top}) translate(${width / 2}, 0)`);


    const product_data = products.map(product => ({
        name: product.name,
        amount: product.amount_purchased
    }));

    product_data.sort((a, b) => a.name.localeCompare(b.name));

    const x = d3.scaleBand()
        .range([0, width])
        .domain(product_data.map(d => d.name))
        .padding(0.1);

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(product_data, d => d.amount)]);

    svg.selectAll('.bar')
        .data(product_data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.amount))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.amount))
        .attr('fill', 'steelblue');

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.7em")
        .attr("transform", "rotate(-45)");

    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)  
        .attr("x", 0 - (height / 2))
        .style("text-anchor", "middle")
        .text("Amount Ordered");

    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2 - 20)
        .attr("y", height + 200)
        .style("text-anchor", "middle")
        .text("Product Name")
}


