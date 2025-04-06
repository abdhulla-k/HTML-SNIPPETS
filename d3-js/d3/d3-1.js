/* 
    import selection from "d3-selection".
    ​In D3.js, selections are a core concept used to select and manipulate DOM elements. 
    now we are using D3 to select elements from the DOM.
*/
// import { selection } from "d3-selection";

const width = window.innerWidth;
const height = window.innerHeight;
const n = 100;

// append svg to body - means creating an svg element and appending it to body
// Set width and height using method chaining of D3
const svg = d3.selection("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Select all method will select all svg elements from dom.
// If the elements do not exist, they will be created.
svg
    .append("g") // Make elements a group
    .selectAll("rect")  // Select all rect
    .data(d3.range(n))  // Create data. n times
    .join('rect')  // 
    .attr("y", d => d * 20)
    .attr("width", width)
    .attr("height", 10)
    .attr("fill", "black")
    .attr("mask", "url(#circle-mask)")

// Create a mask
// Mask is a way to apply a clip path to an element in D3.js or SVG.
const mask = svg.append("mask")
    .attr("id", `circle-mask`)

// Append rect to mask
mask.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "black");

// Append circle to mask
mask.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", 200)
    .attr("fill", "white");



// Horizontal bars
svg.append("g") // create a group
    .selectAll("rect")
    .data(d3.range(n))
    .join('rect')
    .attr("x", d => d * 20)
    .attr("width", 10)
    .attr("height", height)
    .attr("fill", "black")
    .attr("mask", "url(#circle-mask-2)");


const mask2 = svg.append("mask")
    .attr("id", "circle-mask-2")
    

mask2.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill" ,"white");

mask2.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", 200)
    .attr("fill", "black");



