// 数据
const data = [
    { x: 0, y: 30 },
    { x: 1, y: 40 },
    { x: 2, y: 20 },
    { x: 3, y: 50 },
    { x: 4, y: 10 }
];

// 设置图表的宽度和高度
const width = 500;
const height = 300;

// 创建SVG容器
const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// 创建缩放比例尺
const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)])
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([height, 0]);

// 创建折线生成器
const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

// 添加折线路径
svg.append("path")
    .data([data])
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("d", line);

// 添加X轴
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

// 添加Y轴
svg.append("g")
    .call(d3.axisLeft(yScale));

// 添加交互效果
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 5)
    .attr("fill", "red")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

// 鼠标移入事件处理函数
function handleMouseOver(event, d) {
    d3.select(this).attr("fill", "orange");
}

// 鼠标移出事件处理函数
function handleMouseOut(event, d) {
    d3.select(this).attr("fill", "red");
}
