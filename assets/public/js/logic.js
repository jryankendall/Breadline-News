var sourcesArray = [];

const SourceObject = function(input) {
    this.title = input.title;
    this.category = input.category;
    this.value = input.value;
}

function findObject(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value == val) {
            return arr[i];
        }
    }
}

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
        itemLink.text(newsSources[i].title).attr("href", "#" + i).attr("value", newsSources[i].value).addClass("source-select-link");
        listItem.append(itemLink);
        $(".sources-nav").append(listItem);
        var theNews = new SourceObject(newsSources[i]);
        sourcesArray.push(theNews);
    }

}

function initButtons() {
    $(".top-controls-col").on("click", ".sub-select-btn", function(event) {
        event.preventDefault();
        const newsCat = $(this).val();
    })

    $(".sources-nav").on("click", ".source-select-link", function(event) {
        event.preventDefault();
        $(".source-sub-controls").empty();
        var sourceValue = $(this).attr("value");
        console.log(sourceValue);
        
        var sourceObj = findObject(sourcesArray, sourceValue);
        for (let i = 0; i < sourceObj.category.length; i++) {
            var newA = $("<a>").addClass("waves-effect waves-light btn").attr("value", sourceObj.category[i]).text(sourceObj.category[i]);
            $(".source-sub-controls").append(newA);
        }
    })
}

//Functions to execute on page load
$(function() {
    $(".sidenav").sidenav();
    //Pulls the list of sources from the back end
    pullSources("/api/sources/", (response) => { console.log(response); printSources(response) });
    initButtons();
});