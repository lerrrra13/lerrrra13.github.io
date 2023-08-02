let illo = new Zdog.Illustration({
    element: '.zdog-svg',
    dragRotate: true,
    resize: 'fullscreen',
    zoom: 2,
});

new Zdog.Shape({
    addTo: illo,
    path: [
        {x: 0, y: 0},   // start
        {
            bezier: [
                {x: 20, y: -20}, // start control point
                {x: 10, y: -40}, // end control point

                {x: 0, y: 0}, // end point
            ]
        },
        {x: 0, y: 0},   // start
        {
            bezier: [
                {x: -20, y: -20}, // start control point
                {x: -10, y: -40}, // end control point

                {x: 0, y: 0}, // end point
            ]
        },
    ],
    closed: true,
    stroke: 16,
    fill: true,
    color: '#fcd8d8'
});
new Zdog.Shape({
    addTo: illo,
    path: [
        {x: 0, y: 0},   // start
        {
            bezier: [
                {x: 20, y: -20}, // start control point
                {x: 10, y: -40}, // end control point

                {x: 0, y: 0}, // end point
            ]
        },
        {x: 0, y: 0},   // start
        {
            bezier: [
                {x: -20, y: -20}, // start control point
                {x: -10, y: -40}, // end control point

                {x: 0, y: 0}, // end point
            ]
        },
    ],
    closed: true,
    stroke: 10,
    color: '#fce5e5',
    translate: {z: 40},
});
let ticker = 0;
let cycleCount = 150;

function animate() {
    let progress = ticker / cycleCount;
    // apply easing to rotation
    let tween = Zdog.easeInOut(progress % 1, 3);
    illo.rotate.y = tween * Zdog.TAU;
    ticker++;

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

animate();
