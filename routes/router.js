var express = require("express")
var router = express.Router()
var bcrypt = require("bcryptjs")
var fs = require('fs');
var path = require('path');
require('dotenv/config');

const { check, validationResult } = require('express-validator/check')
const { sanitizeBody } = require("express-validator/filter")

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

var User = require("../models/user")
var Post = require("../models/posts")
const { MongoError } = require("mongodb")

let title = "Lost and Found"

function userLoggedIn(req, res) {
  let user = req.session.user
  if (user) return user
  res.redirect("/login")
}

router.get("/", function (req, res, next) {
  Post.find({}, (err, posts) => {
    if (err) throw err;
    res.render("index", {
      title: "Home",
      posts: posts,
      user: "None",
      errors: []
    })
  });

})

router.get("/dashboard/:id?", (req, res, next) => {
  let user = userLoggedIn(req, res)
  Post.find({post_id : {$ne : user._id}}, (err, posts) => {
    if (err) throw err;
    res.render("dashboard", {
      title: "Dashboard",
      posts: posts,
      user: user,
      errors: []
    })
  });
})

router.get("/login/:id?", function (req, res, next) {
  res.render("login", { title: "Log in" })
})

router.post("/login", function (req, res, next) {
  var email = req.body.email
  var password = req.body.password
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      console.log(err);
      throw err;
    }
    var validUser = false;
    if (user) {
      var hash = user.password;
      validUser = bcrypt.compareSync(password, hash)
    }
    if (validUser) {
      req.session.user = user
      res.redirect("/dashboard")
    } else {
      let context = {
        title: "Log in",
        errors: [{msg:"Invalid username and/or password"}],
        email: req.body.email
      }
      res.render("login", context)
    }
  })
})

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Create an account" })
})

router.post(
  "/register",
  [
    check("firstName", "First name must not be empty")
      .trim()
      .isLength({ min: 1 })
      .withMessage('Must be at least 1 character'),
    check("lastName", "Last name must not be empty.")
      .trim()
      .isLength({ min: 1 }),
    check("email", "Email must not be empty.")
      .trim()
      .isLength({ min: 3 })
      .withMessage('Email must be at least 3 characters long'),
    check("email", "Not a valid email.")
      .trim()
      .isEmail(),
    check("password", "Password must be at least 5 characters long")
      .trim()
      .isLength({ min: 5 }),
    check("password1", "Two passwords do not match")
      .trim()
      .exists()
      .custom((value, { req }) => value === req.body.password),
    sanitizeBody("*")
      .trim()
      .escape()
  ],
  function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      let context = {
        title: "Register",
        errors: errors.array(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        password1: req.body.password1
      }
      res.render("register", context)
    } else {
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      })
      user.save(err => {
        if (err) {
          return next(err)
        }
        res.redirect('/login')
      })
    }
  }
)

router.get("/logout", (req, res, next) => {
  var user = req.session.user
  if (user) {
    req.session.destroy(function () {})
  }
  res.redirect("/")
})

router.get("/profile", function (req, res, next) {
  user = userLoggedIn(req, res)
  res.render("/profile", { title: "Your Profile", user: user })
})

router.post("/profile", function (req, res, next) {
  var user = userLoggedIn(req, res)
  var condition = { _id: user._id }
  var update = {
    email: req.body.email,
    firstName: req.body.fname,
    lastName: req.body.lname
  }
  var options = {}
  User.updateOne(condition, update, options, (err, numAffected) => {
    if (err) throw err
    User.findById(user._id, '-password', function (err, updateduser) {
      if (err) throw err
      req.session.user = updateduser
      res.render("./private/profile", {
        title: "Your Profile",
        user: updateduser,
        errors: [{msg: "Profile updated successfully!"}]
      })
    })
  })
})



router.get("/post/:id?", function (req, res, next) {
  var user = userLoggedIn(req, res)
  var postID = req.params.id
  if (postID) {
      Post.findOne({ _id: postID }, function (err, post) {
      if (err) {  
          res.render("dashboard", {
            title: "Home",
            post: post,
            user: user,
            errors: []
          })
      }
      res.render("./components/post", {
        title: "Update Your Post",
        post: post,
        errors: []
      })
    })
  } else {
    res.render("./components/post", {
      title: "Create a New Post",
      post: { title: '', description: '', contact: '', img: ''},
      errors: []
    })
  }
})

router.post(
  "/post/:id?",
  [
    check("title", "Title name must not be empty.")
      .trim()
      .isLength({ min: 1 }),
    check("description", "Description must not be empty.")
      .trim()
      .isLength({ min: 1 }),
    check("contact", "Contact must not be empty.")
      .trim()
      .isLength({ min: 1 }),
    sanitizeBody("*")
      .trim()
      .escape()
  ],
  function (req, res) {
    var user = userLoggedIn(req, res)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      let context = {
        title: "Create a new post",
        errors: errors.array()
      }
      res.render("./components/post", context)
    } else {
        let post = {
        title: req.body.title,
        description: req.body.description,
        contact: req.body.contact,
        img: req.body.img,
        post_id: user._id
      }
      let id = req.params.id
      if (id) {
        updatePost(res, id, post)
        let context = {
          title: "Update Post",
          errors: [{msg: "Post updated successfully!"}],
          post: post
        }
        res.render("./components/post", { 
        title: "Update Succesful!",
        post: post,
        errors: []})
      }
      else {
        addPost(res, post).then((errors) => {
          if (errors && errors.length !== 0) {
            let context = {
              title: "Create a new post",
              errors: errors
            }
            res.render("./components/post", context)
          }
          else {
            res.redirect("/dashboard")
          }
        })
      }
    }
  }
)

function updatePost(res, id, post) {
  var condition = { _id: id }
  var option = {}
  var update = {}
  Post.updateOne(condition, post, option, (err, rowsAffected) => {
    if (err) {
      console.log(`caught the error: ${err}`)
      return res.status(500).json(err);
    }
  })
}

async function addPost(res, post) {
  var c = new Post(post)
  try {
    await c.save();
  }
  catch(e) {
    if (e instanceof MongoError) {
      if (e.message.includes('no name'))
        return [{msg: "No name provided!"}]
      else return []
    }
    else throw e;
  }
}

router.post("/deletePost/:id?", function (req, res, next) {
  var postID = req.params.id
  Post.deleteOne({_id: postID}, function (err) {
    if (err) throw err
    else {
      res.redirect("/dashboard")
    }
  })
})

router.get("/userPosts/:id?", (req, res, next) => {
  let user = userLoggedIn(req, res)
  Post.find({post_id : user._id}, (err, posts) => {
    if (err) throw err;
    res.render("userPosts", {
      title: "Here are your posts:",
      posts: posts,
      user: user,
      errors: []
    })
  });
})

router.get("/deletePost/:id?", (req, res, next) => {
  let user = userLoggedIn(req, res)
  Post.find({post_id : user._id}, (err, posts) => {
    if (err) throw err;
    res.render("deletePost", {
      title: "Here are your posts:",
      posts: posts,
      user: user,
      errors: []
    })
  });
})

router.get("/otherUser/:id?", function (req, res, next) {  
  var user = userLoggedIn(req, res)
  var postID = req.params.id
  if (postID) {
    Post.findOne({ _id: postID }, function (err, posts) {
      if (err) {  
          res.render("dashboard", {
            title: "Home",
            posts: posts,
            user: user,
            errors: []
          })
      }
      res.render("otherUser", {
        title: `Help find their lost item!`,
        posts: posts,
        errors: []
      })
    })
  } else {
    res.render("dashboard", {
      title: "Dashboard",
      posts: posts,
      user: user,
      errors: []
    })
  }
})

module.exports = router
