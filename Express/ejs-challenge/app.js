//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const blogPosts = [
  {
    postTitle: "Day 1",
    id: "Day-1",
    postContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    postTitle: "Day 2",
    id: "Day-2",
    postContent: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."
  }
];


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
  res.render("home", {
    pageTitle: "home",
    content: homeStartingContent,
    blogPosts: blogPosts
  })
})

app.get("/about", function (req, res) {
  res.render("about", {
    pageTitle: "about",
    content: aboutContent
  })
})


app.get("/contact", function (req, res) {
  res.render("contact", {
    pageTitle: "contact",
    content: contactContent
  })
})

app.get("/compose", function (req, res) {
  res.render("compose", {
    pageTitle: "compose",
    content: contactContent
  })
})


app.post("/", (req, res) => {
  var item = req.body;
  if (item) {
    if (req.body.page == 'compose') {
      item.id = item.postTitle.replace(' ', '-');
      blogPosts.push(item);
      res.redirect("/");
    }
  }
})


/* my approach */
// app.get("/posts/:id", function (req, res) {
//   let post = blogPosts.find(ele => {
//     return ele.id == req.params.id.replace(' ', '-')
//   });
//   console.log(req.params.id);
//   res.render("post", post)
// })

/* anjela's approach */
app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  blogPosts.forEach(function(post){
    const storedTitle = _.lowerCase(post.postTitle);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.postTitle,
        content: post.postContent
      });
    }
  });

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
