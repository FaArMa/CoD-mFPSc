window.onload = function() {
    get_validfps();
    com_maxfps();
    btn_showmore();
};

let validfps = [];
let validpkt = [];

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
        // If the FPS value is changed the Max Packets value must be changed
        document.getElementById("pkt-range").value = "0";
        cl_maxpackets();
    };
    fpsRange.fpsValue();
}

function com_maxFrameTime(fps) {
    // Calculates and displays the frametime
    const ft = 1000 / fps;
    const frametime = document.getElementById("frame-time");
    frametime.innerHTML = (fps != 0) ? "Frametime: " + ft.toFixed(2) + " ms" : "Unlimited FPS";
}

function btn_showmore() {
    const btn = document.getElementById("btn-show");
    const collapse = document.getElementById("showmore");
    // This event fires immediately when the show instance method is called
    collapse.addEventListener("show.bs.collapse", function() {
        btn.classList.add("rounded-0");
        btn.classList.add("rounded-top");
        btn.innerHTML = "Show less";
    });
    // This event is fired when a collapse element has been hidden from the user (will wait for CSS transitions to complete)
    collapse.addEventListener("hidden.bs.collapse", function() {
        btn.classList.remove("rounded-0");
        btn.classList.remove("rounded-top");
        btn.innerHTML = "Show more";
    });
}

function cl_maxpackets() {
    const fpsValue = +document.getElementById("fps-val").innerHTML;
    const pktRange = document.getElementById("pkt-range");
    const pktValue = document.getElementById("pkt-val");
    const pktNotice = document.getElementById("pkt-notice");
    let pkt;
    validpkt = [fpsValue];
    let i = 2;
    // Stores all possible valid values in an array (no duplicates)
    while (validpkt[validpkt.length - 1] > 1)
        if (validpkt[validpkt.length - 1] != (pkt = ~~(fpsValue / i++) + 1))
            validpkt.push(pkt);
    // Set the max input attribute to the array size
    pktRange.pktValue = function() {
        pktValue.innerHTML = validpkt[this.value];
        pktRange.max = validpkt.length - 1;
    };
    pktRange.pktValue();
    // Change class and text accordingly
    if (+pktValue.innerHTML > 100 || +pktValue.innerHTML < 15) {
        pktValue.className = "text-warning";
        pktNotice.innerHTML = "Possibly out of range";
    } else {
        pktValue.className = "text-success";
        pktNotice.innerHTML = "";
    }
    if (fpsValue == 0) {
        pktValue.className = "text-danger";
        pktValue.innerHTML = "Unknown for Unlimited FPS";
        pktNotice.innerHTML = "";
    }
}

function cl_packetdup() {
    const rng = +document.getElementById("pktdup-range").value;
    const val = document.getElementById("pktdup-val");
    const ntc = document.getElementById("pktdup-notice");
    if (rng >= 1 && rng <= 20) {
        val.className = "text-success";
        val.innerHTML = 0;
    } else if (rng > 20 && rng <= 40) {
        val.className = "text-success";
        val.innerHTML = 1;
    } else if (rng > 40 && rng <= 60) {
        val.className = "text-warning";
        val.innerHTML = 2;
    } else if (rng > 60 && rng <= 80) {
        val.className = "text-warning";
        val.innerHTML = 3;
    } else if (rng > 80 && rng <= 100) {
        val.className = "text-danger";
        val.innerHTML = 4;
    } else {
        val.className = "text-danger";
        val.innerHTML = 5;
    }
    ntc.innerHTML = (rng == 120) ? "Ping: +" + rng + " ms" : "Ping: " + rng + " ms";
}
