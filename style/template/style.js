$(document).ready(function() {
    // detect browser
    var browser = (navigator.userAgent) ? navigator.userAgent : '';
    if(typeof(clrIE) == 'boolean')
    {
        browser = 'ie';
    }
    else
    {
        browser = (browser.indexOf('Opera') >= 0) ? (
            (browser.indexOf('Opera Mini/') > 0) ? 'opera-mini' : 'opera') : (
            (browser.indexOf('Gecko/') > 0) ? 'mozilla' : (
                (browser.indexOf('WebKit/') > 0) ? 'webkit' : (
                    (browser.indexOf('MSIE') > 0) ? 'ie' : 'unknown'
                )
            )
        );
    }
    $('body').addClass('browser-' + browser);

    // transformations
    setTimeout("$('body').addClass('transform');", 500);
    $(window).load(function() { $('body').addClass('transform'); });

    // header search box
    $('#search-box form').submit(function() { var value = $('#search-box input:text').val(); return (value == laSearchMini || value == '') ? false : true; });
    $('#search-box input:text').focus(function() { 
        if(this.value == laSearchMini) this.value = '';
        $('#search-box').addClass('focused');
    }).blur(function() { 
        if(this.value == '') this.value = laSearchMini;
        $('#search-box').removeClass('focused');
    });
    
    // navigation
    $('nav.nav-extra').each(function()
    {
        var count = 0;
        $(this).find('a').each(function() {
            if(count > 0) $(this).before(' &bull; ');
            count ++;
        });
        if(!count) $(this).css('display', 'none');
    });
    
    $('footer nav.nav-links > a').each(function(i)
    {
        if(i > 0) $(this).before(' &bull; ');
    });
    
    // clear divs
    $('#page-body, body > footer').append('<div class="clear"></div>');
    $('.cp-mini:last').after('<div class="clear"></div>');
    
    // remove extra lines
    $('#page-body > hr, #cp-main > hr, #page-body > form > hr').remove();
    
    // unread posts
    $('dl.icon').each(function()
    {
        var bg = $(this).css('background-image');
        if(bg.length && bg.indexOf('_unread') > 0)
        {
            $(this).parents('li:first').addClass('unread');
        }
        else if(bg.length && bg.indexOf('forum_link') > 0)
        {
            $(this).parents('li:first').addClass('forum-link');
        }
    });
    
    // topic title
    $('body.section-viewtopic #page-body > h2:first').addClass('title');
    
    // index: reported/unapproved topics
    $('li.row a img').each(function()
    {
        if(this.src.indexOf('icon_topic_unapproved') > 0)
        {
            $(this).parents('li.row:first').addClass('unapproved');
        }
    });
    $('dd.lastpost a img').each(function()
    {
        if(this.src.indexOf('icon_topic_unapproved') > 0 || this.src.indexOf('icon_topic_reported') > 0)
        {
            var prev = $(this).parents('dl.icon:first').find('dt');
            if(!prev.length) return;
            if(!prev.find('div.extra').length)
            {
                prev.prepend('<div class="extra"></div>');
            }
            prev = prev.find('div.extra');
            $(this).parent('a').appendTo(prev);
        }
    });
    
    // tabs
    $('#tabs, #navigation, #minitabs').each(function()
    {
        var last = false,
            count = 0;
        $('li', $(this)).each(function(i)
        {
            if(i == 0) $(this).addClass('first');
            last = $(this);
            count ++;
        });
        if(count < 2)
        {
            $(this).hide();
        }
        else
        {
            if(last !== false) last.addClass('last');
            $(this).find('hr').remove();
            $(this).parents('form').css('display', 'inline');
            $(this).append('<div class="clear"></div>');
            $(this).find('a').each(function()
            {
                if(!$('span', this).length)
                {
                    $(this).html('<span>' + $(this).html() + '</span>');
                }
            });
        }
    });
    $('#navigation').parents('.panel').removeClass('panel').addClass('cp-panel');
    
    // control panel: remove empty boxes
    $('#cp-main .panel').each(function()
    {
        var inner = $(this).find('.inner:first');
        if(!inner.length) return;
        if(inner.children().length < 2)
        {
            $(this).hide();
        }
    });

	// Shorten long links in posts
	$('a.postlink').each(function() {
		var $this = $(this);
		
		if ($this.children().length)
		{
			return;
		}
		
		var html = $this.html();
		if (html.length > 50 && html.indexOf('://') > 0 && html.indexOf(' ') < 0)
		{
			$this.html(html.substr(0, 39) + ' ... ' + html.substr(-10));
		}
	});

    // resize big images
    function imageClicked(event)
    {
    	var $this = $(this);
    	if ($this.hasClass('zoomed-in'))
		{
			$this.removeClass('zoomed-in').css('max-width', $(this).attr('data-max-width') + 'px');
		}
		else
		{
			$this.addClass('zoomed-in').css('max-width', '');
		}
    }
    function zoomClicked(event)
    {
		imageClicked.apply($(this).prev().get(0), arguments);
		event.stopPropagation();
    }
	function resizeImage(width)
	{
		var $this = $(this);
		$this.wrap('<span class="zoom-container" />').attr('data-max-width', width).css({
			'max-width': width + 'px',
			cursor: 'pointer'
			}).addClass('zoom').click(imageClicked).after('<span class="zoom-image" />').next().click(zoomClicked);
	}
    function checkImage()
    {
		var maxWidth = Math.floor(this.parentNode.clientWidth - 10);
		if (this.width > maxWidth)
		{
			resizeImage.call(this, maxWidth);
		}
    }
    $('.postbody img').each(function() {
    	var $this = $(this);
    	if ($this.closest('a').length)
    	{
    		return;
		}
		if (this.complete)
		{
			checkImage.call(this);
		}
		else
		{
			$this.load(checkImage);
		}
	});
});

$(window).load(function() {
    // set min width
    $('body').css('min-width', Math.min(
        Math.floor($('body > header nav.nav-header').width() + $('#site-description > a > img').width() + 10),
        Math.floor($('body').width())
        ) + 'px');
});
    
