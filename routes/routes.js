const router = require('express').Router()

// const data = {
//     "add": [],
//     "update": [],
//     "delete": [],
// }

//data in add , update and delete, for example for intern: ( "add": [
//    {explorer_id: "test1", discord_id: "test1", intern_name: "test1", intern_surname: "test1", email: "test1"},
//    {explorer_id: "test2", discord_id: "test2", intern_name: "test2", intern_surname: "test2", email: "test2"},
//])



router.post('/update/:tableName', (req, res) => {
    let { tableName } = req.params;
    const data = req.body;

    res.end();
});

module.exports = router