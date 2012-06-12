var oldIE = true;
$(document).ready(function()
{
	$('body').addClass('old-ie');
    // old browser warning
    function hasCookie(search)
    {
        var cookie = document.cookie.split(';');
        search += '=';
        for(var i=0; i<cookie.length; i++)
        {
            var c = cookie[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(search) == 0) return true;
        }
        return false;
    }
    if(oldIE && imagesetLang && !hasCookie('oldie'))
    {
        $('body').prepend('<div id="old-browser" style="display: none;"></div>');
        $('#old-browser').load(imagesetLang + '/oldie.txt', function() { $('#old-browser').slideDown(); });
    }
});
