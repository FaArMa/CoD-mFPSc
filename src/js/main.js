window.onload = function() {
    get_validfps();
    com_maxfps();
};

let validfps = [];

function get_validfps() {
    // Stores all possible valid values in an array (no duplicates)
    let fps;
    for (let i = 1; i <= 1000; ++i)
        if (validfps[validfps.length - 1] != (fps = ~~(1000 / i)))
            validfps.push(fps);
    validfps.push(0);
}

function com_maxfps() {
    let fpsRange = document.getElementById("fps-range");
    let fpsValue = document.getElementById("fps-val");
    fpsRange.fpsValue = function() {
        fpsValue.innerHTML = validfps[this.value];
        com_maxFrameTime(validfps[this.value]);
        if (validfps[this.value] > 333 || validfps[this.value] < 20)
            fpsValue.className = "text-danger";
        else if (validfps[this.value] <= 333 && validfps[this.value] >= 62)
            fpsValue.className = "text-success";
        else
            fpsValue.className = "text-warning";
    };
    fpsRange.fpsValue();
}

function com_maxFrameTime(fps) {
    // Calculates and displays the frametime
    const ft = 1000 / fps;
    const frametime = document.getElementById("frame-time");
    frametime.innerHTML = (fps != 0) ? "Frametime: " + ft.toFixed(2) + " ms" : "Unlimited FPS";
}
