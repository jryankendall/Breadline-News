var sourcesArray = [];
var readyToRetrieve = true;

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

function retrieveArticles(source, cb) {
    $.ajax( {
        url: "/api/scrape/" + source.source + "/" + source.category,
        method: "GET"
    }).then( function(res, err) {
        if (err) console.log(err);
        cb(res);
    })
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
        $("#source-name-display").empty().text(sourceObj.title);
        for (let i = 0; i < sourceObj.category.length; i++) {
            var newA = $("<a>").addClass("waves-effect waves-light btn category-btn").attr("value", sourceObj.category[i]).attr("source-value", sourceObj.value).text(sourceObj.category[i]);
            $(".source-sub-controls").append(newA);
        }
    })

    $(".source-sub-controls").on("click", ".category-btn", function(event) {
        event.preventDefault();
        var that = $(this);
        var newsObject = {
            source: that.attr("source-value"),
            category: that.attr("value")
        };
        if (readyToRetrieve){
            readyToRetrieve = false;
            retrieveArticles(newsObject, (results) => {
                console.log(results);            
            })
            $(".main-content-column").empty().html("<p>Hang on, this might take a sec.</p>");
            setTimeout(function() {
                $.ajax({
                    url: "/get/articles/" + newsObject.source + "/" + newsObject.category,
                    method: "GET"
                }).then(function(res, err) {
                    if (err) console.log(err);
                    console.log(res);
                    $(".main-content-column").empty();
                    for (let i = 0; i < res.length; i++) {
                        let article = res[i];
                        let titleDiv = $("<div class='headline-title-div'>").html("<h3 class='article-title'>" + article.title + "</h3><h4>" + article.date + "</h4>");
                        let detailsDiv = $("<div class='headline-details-div'>").html("<p>Source: " + article.source + ", " + article.category + "</p><p>Full Article Link: </p><a target='_blank' href='" + article.url + "'>" + article.url + "</a>" );
                        let commentsUL = $("<ul class='collapsible popout'>");
                        let commentsLiHeader = $("<div class='collapsible-header'>").html("<p><i class='material-icons'>keyboard_arrow_down</i>Comments: " + article.comments.length + "</p>");
                        let commentsLiBody = $("<div class='collapsible-body'>");
                        let itemLi = $("<li>");
                        for (let j = 0; j < article.comments.length; j++) {
                            let commentBody = $("<div class='comment-body'>");
                            let commentTop = $("<div class='comment-header'>");
                            let commentText = $("<div class='comment-text'>");
                            commentTop.html("<p>Author: <span>" + article.comments[j].username + "</span></p><p>Posted: <span>" + article.comments[j].date + "</span></p>");
                            commentText.html("<p><i class='material-icons'>chat_bubble_outline</i><span>" + article.comments[j].textbody + "</span></p>");
                            commentBody.append(commentTop).append(commentText);
                            commentsLiBody.append(commentBody);
                        }
                        let inputField = $("<div class='input-field'>")
                        let newForm = $("<form>").addClass("comment-form").attr("data-id", article.aId).attr("id", "comment-" + i + "-form");
                        let nameInput = $("<input type='text' name='username-" + i + "'>");
                        let textInput = $("<textarea id='comment-" + i + "-body' maxlength='255'>")
                        itemLi.append(commentsLiHeader).append(commentsLiBody);
                        commentsUL.append(itemLi);
                        let colDiv = $("<div class='col s12'>").append(titleDiv).append(detailsDiv).append(commentsUL);
                        let rowDiv = $("<div class='row article-row'>").append(colDiv).attr("data-id", article.aId).attr("id", "article-row-" + i);
                        $("#main-content-column").append(rowDiv);
                    }
                    readyToRetrieve = true;
                })
            }, 1000)
        } else {
            return null;
        }
    })
}

//Functions to execute on page load
$(function() {
    $(".sidenav").sidenav();
    $('.collapsible').collapsible();
    //Pulls the list of sources from the back end
    pullSources("/api/sources/", (response) => { console.log(response); printSources(response) });
    initButtons();
});