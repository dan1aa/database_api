const router = require('express').Router()

router.get('/test', (req, res) => {
    res.end("Hello it is me")
})

module.exports = router