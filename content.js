// Listen for messages

var state = {
  highlighted: false
}

function highlightWords(words, page) {
  $(page).unhighlight();
  for (var word in words) {
    if (words.hasOwnProperty(word)) {
      console.log(word);
      $(page).highlight(word);
    }
  }
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  if (state.highlighted) {
    $(document.documentElement).unhighlight();
  } else {
    highlightWords(msg, document.documentElement)
  }

  state.highlighted = !state.highlighted;
  console.log(state.highlighted);

});
