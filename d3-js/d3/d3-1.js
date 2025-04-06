/* 
    import selection from "d3-selection".
    ​In D3.js, selections are a core concept used to select and manipulate DOM elements. 
    now we are using D3 to select elements from the DOM.
*/
// import { selection } from "d3-selection";

const width = window.innerWidth;
const height = window.innerHeight;

// append svg to body - means creating an svg element and appending it to body
// Set width and height using method chaining of D3
const svg = d3.selection("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// D3 need data to render elements. Data is an array of objects
const marks = [];

// Loop and create objects and push to marks array
const n = 100;
for(let i = 0; i < n; i++) {
    marks.push({
        y: i * 20,
        width: width,
        height: 10,
        msk: 'url(#circle-mask)'
    });
}

// Select all method will select all svg elements from dom.
// If the elements do not exist, they will be created.
const rects = svg.selectAll("rect")
    .data(marks)
    .join('rect')
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("mask", d => d.msk);