// Using Symbols and shapes
const width = window.innerWidth;
const height = window.innerHeight;
const n = 50; // Number of bars (reduced a bit for clarity)

// Select body, append SVG element
const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// --- Define reusable elements like masks in <defs> ---
// Create <defs> if it doesn't exist, otherwise select it
const defs = svg.select('defs').size() ? svg.select('defs') : svg.append('defs');

svg.append("g")
    .attr("class", "horizontal-bars")
    .selectAll("rect")
    .data(d3.range(n))
    .join('rect')
    .attr("y", d => d * (height / n))
    .attr("width", width)
    .attr("height", 10)
    .attr("fill", "black") 
    .attr("mask", "url(#mask-1)");

svg.append("g")
    .attr("class", "vertical-bars")
    .selectAll("rect")
    .data(d3.range(n))
    .join('rect')
    .attr("x", d => d * (width / n))
    .attr("width", 10)
    .attr("height", height)
    .attr("fill", "black")
    .attr("mask", "url(#mask-2)");

const generateMask = (selectionForDefs, id, inverted, symbolSize = 10000, gap = 20) => {
    // Define the symbol types you want to use in this mask
    const symbolTypes = [d3.symbolCross, d3.symbolCircle, d3.symbolSquare, d3.symbolTriangle];
    const N = symbolTypes.length; // Number of symbols

    // Append mask to <defs> passed in selectionForDefs
    const mask = selectionForDefs.append("mask")
        .attr("id", id);

    // Mask Background: Determines the base visibility
    // inverted=false: black background (hides everything initially)
    // inverted=true: white background (shows everything initially)
    mask.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", inverted ? "white" : "black");

    // Center the group where the *row* of symbols will be drawn
    const g = mask.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`); // Centering the container group

    // Create ONE reusable symbol generator
    const symbolGenerator = d3.symbol().size(symbolSize);

    // --- Calculate spacing for horizontal layout ---
    const symbolPlotSize = Math.sqrt(symbolSize);
    const spacing = symbolPlotSize + gap; 

    // Draw the symbols and position them individually
    g.selectAll('path')
        .data(symbolTypes)
        .join('path')
        .attr("d", symbolTypeFunction => { 
            symbolGenerator.type(symbolTypeFunction);
            return symbolGenerator();
        })
        .attr("transform", (d, i) => {
            // Calculate the x position for the center of the i-th symbol
            // This centers the entire row around the group's origin (0,0)
            const x = i * spacing - ((N - 1) * spacing) / 2;
            const y = 0; // Keep symbols vertically centered within the row
            return `translate(${x}, ${y})`;
        })
        .attr("fill", inverted ? "black" : "white");
};

// --- Calling the function to create the masks ---
// Create mask-1: Reveals content where symbols are
defs.call(generateMask, "mask-1", false, 50000, 150); 

// Create mask-2: Hides content where symbols are
// Example using smaller symbols and slightly larger gap:
// defs.call(generateMask, "mask-2", true, 5000, 30);
defs.call(generateMask, "mask-2", true, 50000, 150); 
