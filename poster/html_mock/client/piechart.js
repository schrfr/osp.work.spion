$(function () {
    var r = Raphael("graph", 256, 256);
    // Creates pie chart at with center at 320, 200,
    // radius 100 and data: [55, 20, 13, 32, 5, 1, 2]
    r.piechart(120, 120, 100, [55, 20, 13, 32, 5, 1, 2]);
});

$(function () {
    var r = Raphael("graph-2", 256, 256);
    // Creates pie chart at with center at 320, 200,
    // radius 100 and data: [55, 20, 13, 32, 5, 1, 2]
    r.piechart(120, 120, 100, [155, 12, 1, 3, 80, 1, 2]);
});

$(function () {
    var r = Raphael("graph-3", 256, 256);
    // Creates pie chart at with center at 320, 200,
    // radius 100 and data: [55, 20, 13, 32, 5, 1, 2]
    r.piechart(120, 120, 100, [155, 12,]);
});