const { andWhere, select } = require("../sql/dbConfig");

function LectureTaken(server, db) {

    server.get('/lecturestaken/:id', async (req, res) => {
        try{
            const info = await db('lecture_taken').select().where('t_id', req.params.id);
            if (info.length === 0){
                res.sendStatus(404);
                return;
            }
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });
    server.get('/lecturestaken', async (req, res) => {
        try{
            const info = await db('lecture_taken').select();
            if (info.length === 0){
                res.sendStatus(404);
                return;
            }
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

    server.put('/lecturestakenUpdate/:id', async (req, res) => {
        const id = req.params.id;
        const entry_id = req.body.entry_id;
        try{
            await db('lecture_taken').where('t_id', id).andWhere('entry_id', entry_id).update(req.body);
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

    server.put('/lecturestaken/:id', async (req, res) => {
        const id = req.params.id;
        const entry_id = req.body.id;
        try{
            info = await db('lecture_taken').select().where('t_id', id).andWhere('entry_id', entry_id)
            if (info.length === 0){
                res.sendStatus(404);
                return;
            }
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    })

    server.post('/lecturestaken', async (req, res) => {
        const date = new Date(req.body.date);
        info = {
            t_id: req.body.t_id,
            year: date.getFullYear(),
            month: date.toLocaleString('default', { month: 'long' }),
            date: req.body.date,
            div: req.body.div,
            class: req.body.class,
            title: req.body.title,
            time: req.body.time,
            module: req.body.module
        };
        try{
            await db('lecture_taken').insert(info);
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });
}

module.exports = LectureTaken;