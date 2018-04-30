var revDiv = document.querySelector('script[id="rc_592"]').parentNode;

var cs = document.createElement("script");
cs.type = 'text/javascript';
cs.src = "https://static.criteo.net/js/ld/publishertag.js";
cs.async = true;
revDiv.appendChild(cs);

if(typeof rc_criteo == 'undefined') {
    var rc_criteo = [];
}

cs.addEventListener('load', function() {
    callCriteo_rc_592();
});

function callCriteo_rc_592() {
    var adUnits = {
        "placements": [
            {
                             'slotid': 'rev-0',
                             'zoneid': 1210272,
                             'nativeCallback': function(){}
                         },        ]
    };

    Criteo.events.push(function() {
        Criteo.RequestBids(adUnits, callRev_rc_592, 500);
    });
}

var callRev_rc_592 = function(response) {
    try {
        if(Array.isArray(response)) {
            response = revMap(response);
        } else {
            response = '';
        }
        var rcxhr = new XMLHttpRequest();
        rcxhr.onreadystatechange = function() {
            if (rcxhr.readyState == 4) {
                var rcel = document.createElement("script");
                rcel.type = 'text/javascript';
                rcel.text = rcxhr.responseText;
                rcel.async = true;
                revDiv.appendChild(rcel);
            }
        }
        rcxhr.open("POST", "//trends.revcontent.com/serve.js.php?w=30206&t=rc_592&c=1525036776315&width=1358&referer=https%3A%2F%2Fwww.google.co.za%2F&is_blocked=false", true);
        rcxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        rcxhr.withCredentials = true;
        rcxhr.send('criteo=' + response);
    } catch(e) {
        var rcel = document.createElement("script");
        rcel.id = 'rc_' + Math.floor(Math.random() * 1000);
        rcel.type = 'text/javascript';
        rcel.src = "//trends.revcontent.com/serve.js.php?criteo=&w=30206&t=rc_592&c=1525036776315&width=1358&referer=https%3A%2F%2Fwww.google.co.za%2F&is_blocked=false";
        rcel.async = true;
        revDiv.appendChild(rcel);
    }
};

function revMap(response) {
    var final = [];
    var c = 0;
    var dupe;

    response.sort(function(a,b){ return b.cpm - a.cpm });

    response.forEach(function(r, index) {
        dupe = false;

        if(rc_criteo.indexOf(r.id) != -1) {
            return;
        }

        final.forEach(function(f, i) {
            if(r.nativePayload.products[0].title == f.headline) {
                dupe = true;
            }
        });

        if (!dupe && final.length < 1) {

            rc_criteo.push(r.id);

            var headline = r.nativePayload.products[0].title;

            final[c] = {};
            final[c].headline         = headline.length > 80 ? headline.substring(0,80) + '...' : headline;
            final[c].price            = r.nativePayload.products[0].price;
            final[c].target_url       = r.nativePayload.products[0].click_url;
            final[c].image_url        = r.nativePayload.products[0].image.url;
            final[c].cpm              = r.cpm;
            final[c].pixels           = [];
            final[c].advertiser       = r.nativePayload.advertiser.description;
            final[c].optout_click_url = r.nativePayload.privacy.optout_click_url;
            final[c].optout_image_url = r.nativePayload.privacy.optout_image_url;

            r.nativePayload.impression_pixels.forEach(function(p, i) {
                final[c].pixels.push(p.url);
            });

            c++;
        }

    });
    return encodeURIComponent(JSON.stringify(final));
}1