const router = require('express').Router()
const connection = require('../db/database')
const arr = require('./gen')

const queries = {
    intern: {
        query: 'INSERT IGNORE INTO `intern` (explorer_id, discord_id, email, intern_name, intern_surname) VALUES ?'
    },
    course: {
        query: 'INSERT IGNORE INTO `course` (cohort, start_date, end_date, class_id) VALUES ?'
    },
    event: {
        query: 'INSERT IGNORE INTO `nobel_event` (course_id, meet_num, event_date) VALUES ?'
    },
    badge: {
        query: 'INSERT IGNORE INTO `badge` (badge_name) VALUES ?'
    },
    oversightfeedback: {
        query: 'INSERT IGNORE INTO `oversight_feedback` (event_id, feedback, attendance) VALUES ?'
    },
    facilitatorfeedback: {
        query: 'INSERT IGNORE INTO `facilitator_feedback` (event_id, receiver_id, sender_id, feedback) VALUES ?'
    },
    eventfeedback: {
        query: 'INSERT IGNORE INTO `event_feedback` (event_id, sender_id, feedback)'
    }
}


router.post('/update/:tableName', (req, res) => {
    let { tableName } = req.params;
    const data = req.body;

    tableName = tableName.replace(/[^a-zA-Z]/g, '');
    const columns = Object.keys(data[0]);
    const values = data.map(item => columns.map(col => item[col]));

    connection.query(queries[tableName].query, [values], (err, result) => {
        if (err) console.log(err);
        else console.log('inserted');
    });

    res.end();
});

module.exports = router