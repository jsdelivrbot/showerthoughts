$(function() {

    $(window).load(function() {
        $('#refresh').click();
    });

    $('#refresh').on('click', function(event) {
        event.preventDefault(); //?

        var requrl = "https://www.reddit.com/r/showerthoughts/top/";
        var fullurl = requrl + ".json?limit=100&after=t3_10omtd/"; //get request, sending a url, and the second part are the arguments

        $.getJSON(fullurl, function(json) {
            var listing = json.data.children; //required
            var random = Math.floor((Math.random() * 100) + 1);
            var obj = listing[random].data;

            var votes = obj.score;
            var title = obj.title;
            var subtime = obj.created_utc;
            var thumb = obj.thumbnail;
            var subrdt = "/r/" + obj.subreddit;
            var redditurl = "https://www.reddit.com" + obj.permalink;
            var subrdturl = "https://www.reddit.com/r/" + obj.subreddit + "/";
            var exturl = obj.url;
            var timeago = timeSince(subtime);
            var html = '<div class="linkdetails"><h2><i>' + title + '<i></h2>\n';
            //html += '<img src="'+thumb+'" class="thumbimg">\n';
            //html += '<p class="subrdt">posted to <a href="'+subrdturl+'" target="_blank">'+subrdt+'</a> '+timeago+'</p>';
            //html += '<p><a href="'+exturl+'" class="blubtn" target="_blank">visit link</a> - <a href="'+redditurl+'" class="blubtn" target="_blank">view on reddit</a></p>';
            //html += '</div></li>\n';

            htmlOutput(html, exturl);
        }); // end getJSON()
    }); // end .on(submit) listener

    function htmlOutput(html, exturl) {
        $('#content').html(html);
        $("#redditlink").click(function(event) {
            window.location.href = exturl;
        });
    }

    /**
     * Return time since link was posted
     * http://stackoverflow.com/a/3177838/477958
     **/
    function timeSince(date) {
        var seconds = Math.floor(((new Date().getTime() / 1000) - date))

        var interval = Math.floor(seconds / 31536000);

        if (interval >= 1) {
            if (interval == 1) return interval + " year ago";
            else
                return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            if (interval == 1) return interval + " month ago";
            else
                return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            if (interval == 1) return interval + " day ago";
            else
                return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            if (interval == 1) return interval + " hour ago";
            else
                return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            if (interval == 1) return interval + " minute ago";
            else
                return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }
});
