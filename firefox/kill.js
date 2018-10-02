// var name = 'webmasteradi';
var name = 'fallenverse';
var flg;
var prob_name = [];

browser.runtime.sendMessage({
  
  method: 'GET',
  action: 'xhttp',
  
  usern: name,
  // username: 'webmasteradi',
}, function(responseText) {
    // console.log(responseText);  
    console.log("true");
    flg = checkResponse(responseText);
    if(flg) {
    
    	list = parseData((responseText));
    	console.log(list.length);
    	console.log("flg ",flg);
    }
    else {
    	// bad response , boat down
    }
    

    
});

function parseData(text) {
  
    var obj = JSON.parse(text);
    // console.log(obj);
    console.log("len "+obj.result.length);
    var ok_set = [];
    var no_set = [];
    
    // window.alert(2);
    for(i=0,len =obj.result.length; i<len;i++) {
        var p_id = obj.result[i].problem.contestId+ obj.result[i].problem.index;
        var status = obj.result[i].verdict;
        prob_name[p_id] = obj.result[i].problem.name;
        if(status == "OK") {
            ok_set[p_id] = true;
        }
        else {
            // console.log(p_id+" NO ");
            no_set[p_id] = true;
        }
      }
      var x;
      for(x in ok_set) {
          if(no_set[x]) {
            delete no_set[x];
          }
      }
      var list =[];
      var j=0;
      for(x in no_set) {
         
          console.log(x+" check ");
           list[j] = x;
           j++;
          // console.log("check  ");
          
        
      }
      console.log(list[0]+" hi ");
      
      return list;
  }
function checkResponse(text) {
  
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
function blockAndDisplay() {
    var feed = $('[id^=topnews_main_stream], [id^=mostrecent_main_stream], [id^=pagelet_home_stream]');
    var message = $('#distracted');
    var message2 = $('#dis');
    if (feed.length == 0) {
        message.remove();
    } else if (message.length == 0) {
        feed.children().remove();
        var size
        if(typeof list == 'undefined') {
        	 // size =-1;
        	 console.log("waiting")
        	 // for(i=0;i<100000;i++);

        }
        else {
        size = list.length;
    	}
        if(size > 0) {
          var str = "These problems\nneed to be solved";
          var li = str.link("http://codeforces.com/contest/478/problem/C");
          message = $('<h1>')
                .attr('id', 'distracted')
                // .val( message.val()+"These problems\nneed to be solved")
                // .attr("href","http://codeforces.com/contest/478/problem/C")
                // .attr("target",'_blank')
                .text("These problems\n need to be solved")
                // .href("http://codeforces.com/contest/478/problem/C")
                .css('font-size', '30px')
                .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
                .css('position', 'relative')
                .css('top', '75px');
                // .href("http://codeforces.com/contest/574/problem/B");
           
          feed.append(message);
          // feed.append(li);
            // $('[data-location=maincolumn]').append(message);
          for(var i=0;i<size;i++) {
            var len = list[i].length;
            // console.log(prob_name[list[i]]);
            var contestNo = (list[i].substring(0,len-1));
            if(contestNo > 9999) {
            	// console.log("gym",contestNo);

            	 message = $('<a>')
                .attr('id', 'distracted')
                .text(list[i]+"\t   "+prob_name[list[i]]+"\n ")
                // .text("Codeforces!!"+list[i].slice(-1)+list[i].substring(0,len-1))
                .attr("href","http://codeforces.com/problemset/gymProblem/"+list[i].substring(0,len-1)+"/"+list[i].slice(-1))
                .attr("target",'_blank')
                .css('font-size', '25px')
                .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
                .css('position', 'relative')
                .css('top', '75px');
            
             newline = $('<br>')
                .attr('id', 'distracted');


            }
            else {
            	// console.log("nope",contestNo);
           
	            message = $('<a>')
	                .attr('id', 'distracted')
	                .text(list[i]+"\t   "+prob_name[list[i]]+"\n ")
	                // .text("Codeforces!!"+list[i].slice(-1)+list[i].substring(0,len-1))
	                .attr("href","http://codeforces.com/contest/"+list[i].substring(0,len-1)+"/problem/"+list[i].slice(-1))
	                .attr("target",'_blank')
	                .css('font-size', '25px')
	                .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
	                .css('position', 'relative')
	                .css('top', '75px');
	            
	             newline = $('<br>')
	                .attr('id', 'distracted');
            }
            
            feed.append(message);
            feed.append(newline);
          }
        }
        // else if(size ==-1) {
        // 	message = $('<h1>')
        //         .attr('id', 'distracted')
        //         .text("SORRY!! OUR BOT FAILED TO SERVE THE QUESTIONS :(")
        //         .css('font-size', '30px')
        //         .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
        //         .css('position', 'relative')
        //         .css('top', '75px');
        // }
        else {
        	if(!flg) {

        	message = $('<h1>')
                .attr('id', 'distracted')
                .text("SORRY!! OUR BOT FAILED TO SERVE THE QUESTIONS :(")
                .css('font-size', '30px')
                .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
                .css('position', 'relative')
                .css('top', '75px');
                feed.append(message); 
        
        	}
        else {
           message = $('<h1>')
                .attr('id', 'distracted')
                .text("Great going!! You don't have any pending problems :)")
                .css('font-size', '30px')
                .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
                .css('position', 'relative')
                .css('top', '75px');
            // $('[data-location=maincolumn]').append(message);
            
           cf =$('<a>')
                .attr('id', 'distracted')
                .text("Try out some new ones at Codeforces")
                .attr("href","http://codeforces.com/")
                .attr("target",'_blank')
                .css('font-size', '30px')
                .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
                .css('position', 'relative')
                .css('top', '75px');
             
            feed.append(message); 
          	feed.append(cf);
            }
           
        }
     }

    
    $('.ticker_stream').remove();
    $('.ego_column').remove();
    // $('#pagelet_games_rhc').remove();
    // $('#pagelet_trending_tags_and_topics').remove();
    // $('#pagelet_canvas_nav_content').remove();
}



window.setInterval(blockAndDisplay, 100);
