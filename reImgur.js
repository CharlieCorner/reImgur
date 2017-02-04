reImgur = (function(){
   
    var extractImgID = function(location){
        return location.pathname.split("/")[1];
    };
    
    var shouldRedirect = function(location){
        var regex = /^(http(s)?:\/\/)?imgur.com\/([A-Z0-9]+)$/ig;
        return regex.test(location.href);
    };
    
    var hasExtensionButNoServer = function(location){
         var regex = /^(http(s)?:\/\/)?imgur.com\/([A-Z0-9]+)(\.[a-z0-9]+)$/ig;
        return regex.test(location.href);
    };

    var redirectEvaluator = function(currentLocation){
        
        if(shouldRedirect(currentLocation)){
            var newURL = currentLocation.protocol + "//i.imgur.com/";
            newURL += extractImgID(currentLocation) + ".jpg";
            chrome.extension.sendMessage({redirect: newURL});
            
        } else if(hasExtensionButNoServer(currentLocation)){
            var newURL = currentLocation.protocol + "//i.imgur.com/";
            newURL += extractImgID(currentLocation);
            chrome.extension.sendMessage({redirect: newURL});
        }
    };
    
    return{
        redirectEvaluator : redirectEvaluator
    };
})();

reImgur.redirectEvaluator(window.document.location);