chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

    if(tab.url.indexOf("imgur.com") !== -1){
        chrome.pageAction.show(tabId);
    }
});

chrome.runtime.onMessage.addListener(function(request, sender){
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});