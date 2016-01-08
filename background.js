var words;

function getItems() {
  return chrome.storage.sync.get(null, function(items) {
    words = items;
  })
}

getItems();

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, words);
})
