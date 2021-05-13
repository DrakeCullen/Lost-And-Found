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

// import models
var User = require("../models/user")
var Post = require("../models/posts")
const { MongoError } = require("mongodb")

let title = "Lost and Found"

function userLoggedIn(req, res) {
  let user = req.session.user
  if (user) return user
  res.redirect("/login")
}

/* GET home page. */
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

// authenticated page; check if session exists
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
  res.render("login", { title: "Log in" }) // pug template
})

router.post("/login", function (req, res, next) {
  var email = req.body.email
  var password = req.body.password
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(user);
    var validUser = false;
    if (user) {
      var hash = user.password;
      validUser = bcrypt.compareSync(password, hash)
    }
    if (validUser) {
      // add user to session
      req.session.user = user
      res.redirect("/dashboard")
    } else {
      let context = {
        title: "Log in",
        errors: [{msg:"Invalid username and/or password"}]
      }
      res.render("login", context)
    }
  })
})

// new user registration
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register an account" })
})

router.post(
  "/register",
  [
    // Validate fields.
    // express-validator
    check("firstName", "First name must not be empty")
      .trim()
      .isLength({ min: 1 })
      .withMessage('must be at least 1 character'),
    check("lastName", "Last name must not be empty.")
      .trim()
      .isLength({ min: 1 }),
    check("email", "Email must not be empty.")
      .trim()
      .isLength({ min: 3 })
      .withMessage('Email must be at least 3 characters long'),
    // email must be valid
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
    // Sanitize all fields.
    sanitizeBody("*")
      .trim()
      .escape()
  ],
  function (req, res, next) {
    // check authentication
    //var user = userLoggedIn(req, res)
    // extract the validation errors from a request
    const errors = validationResult(req)
    // check if there are errors
    //console.error(errors.array())
    if (!errors.isEmpty()) {
      let context = {
        title: "Register",
        errors: errors.array(),
        firstName: req.body.firstName
      }
      res.render("register", context)
    } else {
      // create a user document and insert into mongodb collection
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      })
      //console.log(user)
      user.save(err => {
        if (err) {
          return next(err)
        }
        // successful - redirect to dashboard
        // add update user to session
        console.log('Register successful:', user)
        //req.session.user = user
        //res.redirect("/grade")
        res.redirect('/login')
      })
    }
  }
)

router.get("/logout", (req, res, next) => {
  var user = req.session.user
  if (user) {
    req.session.destroy(function () {
      console.log(`user: ${user.email} logged out...`)
    })
  }
  res.redirect("/")
})

/* profile... */
router.get("/profile", function (req, res, next) {
  user = userLoggedIn(req, res)
  res.render("/profile", { title: "Profile", user: user })
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
    // project/return all attributes but password.
    User.findById(user._id, '-password', function (err, updateduser) {
      if (err) throw err
      req.session.user = updateduser
      //console.log(updateduser)
      res.render("./private/profile", {
        title: "Profile",
        user: updateduser,
        errors: [{msg: "Profile updated successfully!"}]
      })
    })
  })
})

router.get("/courses", function (req, res, next) {
  // get logged in user
  let user = userLoggedIn(req, res)
  Post.find({}, (err, posts) => {
    if (err) throw err;
    console.log(posts)
    res.render("courses", {
      title: "Home",
      posts: posts,
      user: user,
      errors: []
    })
  });
})

// Individual course page...
// *? optional request parameter
router.get("/post/:id?", function (req, res, next) {
  // get logged in user
  
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

// either add new or update existing course
// optional course_id
router.post(
  "/post/:id?",
  [
    // Validate fields.
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
    // check authentication
    var user = userLoggedIn(req, res)
    // extract the validation errors from a request
    const errors = validationResult(req)
    // check if there are errors
    if (!errors.isEmpty()) {
      let context = {
        title: "Create a new post",
        errors: errors.array()
      }
      res.render("./components/course", context)
    } else {
      
      // create a user document and insert into mongodb collection
      let post = {
        title: req.body.title,
        description: req.body.description,
        contact: req.body.contact,
        img: req.body.img,
        post_id: user._id
      }
      // check if data is there on console
      console.log(post)
      // check if the form data is for update or new course
      let id = req.params.id
      if (id) {
        console.log("update")
        updateCourse(res, id, post)
        let context = {
          title: "Update course",
          errors: [{msg: "Course updated successfully!"}],
          post: post
        }
        res.render("./components/post", { 
        title: "Update Succesful!",
        post: post,
        errors: []})
      }
      // add new course
      else {
        console.log("create")
        addPost(res, post).then((errors) => {
          console.log('Errors: ', errors)
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
      // successful - redirect to dashboard
      //res.redirect("/courses")
    }
  }
)

function updateCourse(res, id, course) {
  var condition = { _id: id }
  var option = {}
  var update = {}
  Post.updateOne(condition, course, option, (err, rowsAffected) => {
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
      console.log(`Exception: ${e.message}`)
      if (e.message.includes('duplicate key error'))
        return [{msg: "Duplicate CRN not allowed"}]
      else return []
    }
    else throw e;
  }
}

// either add new or update existing course
router.post("/deletePost/:id?", function (req, res, next) {
  // create a user document and insert into mongodb collection
  var postID = req.params.id
  console.log(postID);
  Post.deleteOne({_id: postID}, function (err) {
    if (err) throw err
    else {
      console.log(`Deleted course id: ${postID}`)
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
