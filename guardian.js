function highlightStuff( tab ) {
  chrome.storage.sync.get(null, function(items) {
    for (var property in items) {
      if (items.hasOwnProperty(property)) {
        console.log(getIndicesOf(property, document.documentElement.innerHTML, true))
      }
    }
  })
}

function getIndicesOf(searchStr, str, caseSensitive) {
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

// A function to use as callback
function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent);
}

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
})
