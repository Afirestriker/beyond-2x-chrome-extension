(() => {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }

    window.hasRun = true;

    /**
     * Listen for messages from the background or popup script.
     */
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, playbackSpeedValue } = obj;
        const videoPlayer = document.getElementsByTagName("video")[0];

        if (type === "SCROLL") {
            videoPlayer.playbackRate = playbackSpeedValue;

            chrome.storage.local.set({
                playbackSpeedValue: playbackSpeedValue,
            });

            response(playbackSpeedValue);
        } else if (type === "RE-STORE") {
            chrome.storage.local.get(['playbackSpeedValue'], function(result) {
                console.log({cacheStoredValue: result.playbackSpeedValue});
                videoPlayer.playbackRate = result.playbackSpeedValue;
            });

            response(playbackSpeedValue);
        }
    });
})();
