const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.redirect("/index.html")
})

router.get("/account", (req, res) => {
  res.render("account")
})

module.exports = router
