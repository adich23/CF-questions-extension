// Saves options to chrome.storage
var defaultuser = "";

function save_options() {

  var val = user.value;
  val = val.trim();
  console.log('val  '+val);
  var status = document.getElementById('status');
  status.textContent = '';
  var flg =0;
  browser.runtime.sendMessage({
  
  method: 'POST',
  action: 'xhttp',
  
  usern: val,
  // username: 'webmasteradi',
	}, function(responseText) {
	    // console.log(responseText);  
	    console.log("true");
	    flg = checkUser((responseText));
	    setUser(flg,val,status);
	    
});
  
  console.log("flg 2 "+flg);
 
}


function restore_options() {
 
  
}

function checkUser(text) {
  
    var obj = JSON.parse(text);
    // console.log(obj);
    console.log("valid : "+obj.status);
 	if(obj.status == "OK") {
 		return true;
 	}
 	else {
 		return false;
 	}
    
}
function setUser(flg,val,status){
	 if(flg){
  browser.storage.sync.set({
    
    "username": val
    
  }, function() {
    // Update status to let user know options were saved.
    
    if (browser.runtime.error) {
			console.log("Runtime error.");
			status.textContent = 'Sorry options cannot be saved now.';
		}
		else {
    status.textContent = 'Options saved.';
    console.log('saved',val);
    // // message('Settings saved');
    // setTimeout(function() {
    //   status.textContent = '';
    // }, 750);
    
    }
  });
}
else{
  	console.log('Error: Invalid username');
  	status.textContent = 'Invalid username entered';
  	// return;
}
}

// document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);