const { getDb } = require('../util/database')

exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signup')
}

exports.showMembersPage = (req, res) => {
    res.render('members')
}

exports.healthNode = (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'node',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
}

exports.healthMongo = async (req, res) => {
    try {
        const db = getDb()
        await db.command({ ping: 1 })

        res.status(200).json({
            status: 'ok',
            service: 'mongodb',
            timestamp: new Date().toISOString()
        })
    } catch (err) {
        res.status(503).json({
            status: 'error',
            service: 'mongodb',
            message: 'MongoDB unavailable',
            timestamp: new Date().toISOString()
        })
    }
}

exports.get404Page = (req, res, next) => {
    res.status(404).render('404')
}