/* spion base js */  


  
function piwik_live_cb(datas)
{
    // create a section for current visitor
    var data = undefined;
    for(var dx in datas)
    {
        if(datas[dx].customVariables['1'].customVariableValue1 === SESSION_KEY)
        {
            data = datas[dx];
            break;
        }
    }
    if(data === undefined)
        return;
    
    var refer = '';
    if(data.referrerName.length > 0)
    {
        refer = 'You come from <a href="'+data.referrerUrl +'">'+ data.referrerName +'</a>';
        if(dat.referrerKeyword.length > 0)
        {
            refer += ', searching with the keywords «'+visit.referrerKeyword+'»';
        }
    }
    
    var actions = 'You visit';
    var act_dict = new Object();
    for(var a in data.actionDetails)
    {
        var action = data.actionDetails[a];
        if(act_dict[action.url] === undefined)
            act_dict[action.url] = {title:action.pageTitle, n:1};
        else
        {
            var n = act_dict[action.url].n;
            act_dict[action.url] = {title:action.pageTitle, n:n+1};
        }
    }
    for(var act in act_dict)
    {
        var action = act_dict[act];
        actions += ' <a href="'+ act +'" title="'+ action.title +'">'+ act.replace(/\//g,"/&shy;") +'</a> '+action.n+' times';
    }
    
    var tpl = '\
    <section class="analytics analytics-self analytics-live" data-sizex="2" data-sort="33">\
    <div class="titlebar"> Spion.you </div>\
    <div class="widget-content">\
    <ul class="analytics">\
    <li>\
    <p>On '
    +data.serverDatePrettyFirstAction+' at '
    +data.serverTimePrettyFirstAction +' you, from '
    +data.country +', using '
    +data.browserName+' on '
    +data.operatingSystem+', visit the site for '
    +data.visitDurationPretty+'.</p>\
    <p>\
    Your screen is set to '+ data.resolution +'.\
    </p>\
    <p>You have installed: '+data.plugins+'</p>\
    <p>'+refer+'</p>\
    <p>'+actions+'</p>\
    </li>\
    </ul>\
    </div>\
    </section>';
    
    if ( $("section.analytics").length === 0 ) {
        $('body').append(tpl);
    } else {
        $($("section.analytics")[0]).before(tpl);
    }
}

function self_piwik()
{
    try {
        var piwikTracker = Piwik.getTracker(PIWIK_URL + "piwik.php", PIWIK_SITE_ID);
        piwikTracker.setCustomVariable( 1, 'DjangoSession', SESSION_KEY, 'visit' );
        piwikTracker.trackPageView();
        piwikTracker.enableLinkTracking();
        
        
    } catch( err ) {
        console.log('Error while loading piwikTracker: '+err);
    }
    
    if($('.analytics-self').length === 0)
    {
        $.ajax(PIWIK_URL+'?module=API&method=Live.getLastVisitsDetails&idSite='+PIWIK_SITE_ID+'&period=day&date=today&format=JSON&token_auth=anonymous&jsoncallback=piwik_live_cb', 
               {
                   dataType:'jsonp',
               jsonp: false, 
               jsonpCallback: "piwik_live_cb"
               });
    }
};

function profiles_image()
{
    $('.researcher_name').on('mouseover',function(evt){
        $('.user_picture').attr('src', user_pictures[$(this).attr('id')].src);
    });
}

// resize content wrapper to fit exactly
function fit_content()
{
    var w = $(window);
    var b = $('body');
    var term = $('#analytics-wrapper');
    var ctnt = $('#content-wrapper');
    
    var bm = 2 * parseInt(b.css('marginLeft'));
    var width = w.width() - (term.outerWidth() + bm);
    ctnt.css('width', width + 'px');
    
    $('#content-wrapper').masonry({
        itemSelector: 'section',
//         isFitWidth: true,
        columnWidth: 100
    });
    console.log('W: '+ width+ ' => '+ctnt.css('width'));
}

// make external links open in new window
function extern_links()
{
    var isExternal = function(href) {
        /*
         * isExternal("http://i.liketightpants.net/")
         * true
         * isExternal("/publications/")
         * false
         * isExternal("http://spion.me/publications/")
         * false
         * isExternal("http://localhost:8000/publications/")
         * false
         * isExternal("http://127.0.0.1:8000/publications/")
         * false
         */
        if (href.indexOf("http") === -1 || href.indexOf(document.location.host) !== -1 || href.indexOf("localhost") !== -1 || href.indexOf("127.0.0.1") !== -1 ) {
            return false;
        }
        return true;
    };
    
    $("a[href]").each(
        function() { 
            if (isExternal($(this).attr('href')) ) { 
                $(this).attr('target', '_blank')
            }
        }
    )
    
}

$(document).ready(function()
{
    fit_content();
    extern_links();
    self_piwik();
    profiles_image();
    
    $(window).on('resize', fit_content);
    
    
    // fake live update, should be removed when we get true live update
    function xxxx()
    {
        var f = $('.analytics').last();
        f.hide();
        $('#analytics-wrapper').prepend(f);
        f.toggle('slow');
        window.setTimeout(xxxx, 60000 , true);
    }
    window.setTimeout(xxxx, 60000 , true);
});

$(window).load(function() {
    var heights = new Array();
    var box_height_step = 42;
    var box_vertical_gap = 10;
    for(var i=1; i < 64; i++)
    {
        heights.push((i*box_height_step) + ((i-1)*box_vertical_gap));
    }
    
    $('section').not('.logo').each(function() {
        var old_height = $(this).height();
        for (var i = 0; i < heights.length; i++) {
            if (heights[i] >= old_height) {
                $(this).height(heights[i]); // console.log(old_height, heights[i]);
    break;
            }
        } 
    });
    
    $('.titlebar').each(function(idx, elem){
        var t = $(elem);
        var cl = $('<div class="widget-closer">x</div>');
        t.prepend(cl);
        cl.on('click', function(evt){
            var sec = t.parents('section');
            sec.remove();
            $('#content-wrapper').masonry({
                itemSelector: 'section',
                columnWidth: 100
            })
        });
    });
    
    $('#content-wrapper').masonry({
        itemSelector: 'section',
//         isFitWidth: true,
        columnWidth: 100
    });
});