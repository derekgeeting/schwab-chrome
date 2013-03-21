function getKey(row) {
  var tds = $(row).find('td');
  var key = null;
  if( tds && tds.length>5 ) {
    //date + description + amount withdrawal + amount deposit
    key = tds[0].innerHTML + '|' + tds[3].innerHTML + '|' + tds[4].innerHTML + '|' + tds[5].innerHTML;
  }
  return key;
}

$('.data-row').click(function() {
  var key = getKey(this);
  var isReconciled = $(this).hasClass('reconciled');
  $(this).toggleClass('reconciled',!isReconciled);
  var obj = {};
  obj[key] = !isReconciled;
  chrome.storage.sync.set( obj, function() {} );
});

$('.data-row').each(function(n,row) {
  var keys = [];
  var rowsByKey = [];
  var key = getKey(row);
  if(key) {
    keys.push(key);
    rowsByKey[key] = row;
  }

  //get values from storage
  chrome.storage.sync.get(keys, function(items) {
    for( var i in items ) {
      if( items[i] && rowsByKey[i] ) {
        $(rowsByKey[i]).toggleClass('reconciled',true);
      }
    }
  });

});
