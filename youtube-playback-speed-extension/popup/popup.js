document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const slider = document.getElementById("beyond-2x-youtube-range-slider");

    slider.addEventListener('input', onSliderChangeHandler);

    if (activeTab.url.includes("youtube.com/watch")) {
        chrome.storage.local.get(['playbackSpeedValue'], function(result) {
            chrome.tabs.sendMessage(
                activeTab.id,
                {
                    type: "RE-STORE",
                    playbackSpeedValue: result.playbackSpeedValue
                },
                setScrollTextValue
            );
        });
    }
});

async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true,
    });

    return tabs[0];
}

const setScrollTextValue = (value) => {
    const output = document.getElementById("beyond-2x-youtube-range-slider-value");
    const slider = document.getElementById("beyond-2x-youtube-range-slider");
    output.innerHTML = value;
    slider.value = value;
}

const onSliderChangeHandler = async (e) => {
    const activeTab = await getActiveTabURL();

    chrome.tabs.sendMessage(
        activeTab.id,
        {
            type: "SCROLL",
            playbackSpeedValue: e.target.value
        },
        setScrollTextValue
    );
};

