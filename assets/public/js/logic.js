function pullSources(appendedUrl, cb) {
    $.ajax( {
        url: appendedUrl,
        method: "GET"
    }).then( function(res, err) {
        if (err) console.log(err);
        cb(res);
    });
}

function printSources(input) {
    const newsSources = input;
    for (let i = 0; i < newsSources.length; i++) {
        var listItem = $("<li>");
        var itemLink = $("<a>");
        itemLink.text(newsSources[i]).attr("href", "#" + i);
        listItem.append(itemLink);
        $("#sources-nav").append(listItem);
    }

}

//Functions to execute on page load
$(function() {
    //Pulls the list of sources from the back end
    pullSources("/api/sources/", (response) => { console.log(response); printSources(response) });
});