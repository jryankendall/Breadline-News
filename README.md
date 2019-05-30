# Breadline-News
App that scrapes for news headlines and allows users to leave comments on stories.

## Contributors
@jryankendall

## Technology
- HTML5, CSS, SCSS
- Javascript
- Heroku
- MongoDB

## Modules/Libraries
- Materialize
- Ajax, Axios
- jQuery
- Express
- Handlebars
- Moment
- Mongoose
- Cheerio

## About
- Homework assignment for Vanderbilt Coding Bootcamp, due May 29, 2019. Breadline News is a Heroku-based app that utilizes Cheerio to scrape several news site frontpages and grabs as many articles as it can based on specifications, saves them to a MongoDB collection via Mongoose, and prints out all the articles conditionally based on user query. Each article allows visitors to leave comments on them, which are also saved in the database.

## License
- Unlicense

## How to use this code
- Visit the heroku deployment of the page, linked below, and test out its features. Please note: I am not responsible for the content of the articles pulled by the app, reader discretion is advised, especially when pulling from the Onion.

https://jk-breadline-news.herokuapp.com/


## Known Issues/Bugs
- Comment messages aren't REALLY required as the labels say they are.
- Occasionally might fail to print out articles due to API call timing out.
- Could be a little better looking
- Refreshing comments lists not implemented, and will only pull new comments upon retrieving from the database again.
- As much as I built in to prevent duplicate articles, the scraper may occasionally pull and store duplicates.

Comments welcome!
  
## Contact

@jryankendall
- e-mail: jryankendall@gmail.com
- LinkedIn: https://www.linkedin.com/in/jed-kendall/
- Website: https://www.jedkendall.com
