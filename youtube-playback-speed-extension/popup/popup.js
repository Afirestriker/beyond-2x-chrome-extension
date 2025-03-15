const slider = document.getElementById("beyond-2x-youtube-range-slider");
const output = document.getElementById("beyond-2x-youtube-range-slider-value");

slider.oninput = function() {
    output.innerHTML = this.value;
}
