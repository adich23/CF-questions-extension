
//for connecting to codeforces.com
var recent_url = "http://codeforces.com/api/user.status?handle=";
var valid_url = " http://codeforces.com/api/user.info?handles=";
var request_url="";
var start = 1;
var count  = 1000;


var link = "http://codeforces.com/contest/";
// var list = [];

// function getSubmission() {
var name='';
// function getname() {
browser.storage.sync.get("username", function(items) {
			if (!chrome.runtime.error) {
				console.log(items);
			// 	document.getElementById("data").innerText = items.data;
			name = items.username;
			console.log('name '+name);
			}
});
 browser.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
        name = changes['username'].newValue;
      });
// }
browser.runtime.onMessage.addListener(function(request, sender, callback) {
  if (request.action == "xhttp") {

  		// getname();
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            // list  = parseData(JSON.parse(xhttp.responseText));
            // callback(list);


            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            console.log("error");
            callback();
        };
        console.log("background user  "+request.usern);
        console.log("usename  "+name);
        if (method == "POST") {
        	console.log("check user  "+request.usern);
            // xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request_url = valid_url+request.usern;
            xhttp.open('GET', request_url, true);
        }
        else {
        
        request_url = recent_url+name+"&from="+start+"&count="+count;
        // var request_url = recent_url+request.usern+"&from="+start+"&count="+count;
        xhttp.open('GET', request_url, true);
        }
        xhttp.send();
        return true; // prevents the callback from being called too early on return
    }
});


 // window.setInterval(chrome.storage.sync.get, 10);

