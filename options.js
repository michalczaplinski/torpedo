$(document).ready( function() {

  var template = document.querySelector('#template');

  function fillTableCell(content) {
    var record = template.content.querySelectorAll("#record");
    record[0].textContent = content;
    var tableBody = document.getElementsByTagName("tbody");
    var clone = document.importNode(template.content, true);
    tableBody[0].appendChild(clone);
  }

  function showItems() {
    chrome.storage.sync.get(null, function(items) {
      for (var property in items) {
        if (items.hasOwnProperty(property)) {
          fillTableCell(property)
        }
      }

      $('.remove').click(function(e) {
        var record = $(this).parent('tr');
        var item = $(this).siblings('#record').text();
        removeItem(item, function() {
          record.remove();
        })
      })
    })
  }

  function saveItem(theValue) {

      var obj = {}
      obj[theValue] = '';

      chrome.storage.sync.set( obj, function() {
        // Notify that we saved.
        fillTableCell(Object.getOwnPropertyNames(obj)[0])
      });
  }

  function removeItem(item, callback ) {
    chrome.storage.sync.remove( item, function() {
      callback();
    })
  }

  $('#my-form').submit(function(e) {
      e.preventDefault();
      var item = $(this).children('input').val();
      saveItem(item);
  });

  showItems();

});
