const { andWhere, select } = require("../sql/dbConfig");

function LectureTaken(server, db) {
    /**
     * This function gets all the lectures taken by a particular teacher
     * @param {Integer} id The id of the teacher
     * @returns {Promise<Object[]>} An array of objects containing the details of the lectures taken by the teacher
     */
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

    /**
     * This function gets all the lectures taken
     * @returns {Promise<Object[]>} An array of objects containing the details of all the lectures taken
     */
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

    /**
     * This function updates a particular lecture taken by a teacher
     * @param {Integer} id The id of the teacher
     * @param {Integer} entry_id The id of the lecture taken
     * @param {Object} req.body The details of the lecture taken
     * @returns {Promise<void>}
     */
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

    /**
     * This function gets a particular lecture taken by a teacher
     * @param {Integer} id The id of the teacher
     * @param {Integer} entry_id The id of the lecture taken
     * @returns {Promise<Object[]>} An array of objects containing the details of the lecture taken by the teacher
     */
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

    /**
     * This function adds a new lecture taken by a teacher
     * @param {Object} req.body The details of the lecture taken
     * @returns {Promise<void>}
     */
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

    /**
     * This function deletes all the lectures taken by a particular teacher
     * @param {Integer} id The id of the teacher
     * @returns {Promise<void>}
     */
    server.delete('/lecturestaken/:id', async (req, res) => {
        const id = req.params.id;
        try{
            await db('lecture_taken').where('t_id', id).delete();
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

    /**
     * This function deletes a particular lecture taken by a teacher
     * @param {Integer} id The id of the teacher
     * @param {Object} req.body The details of the lecture taken
     * @returns {Promise<void>}
     */
    server.post('/lecturestakenRemove/:id', async (req, res) => {
        const id = req.params.id;
        const { date, div, title, time, module } = req.body;
        const className = req.body.class;
        try{
            await db('lecture_taken').where('t_id', id)
                .andWhere('date', date)
                .andWhere('div', div)
                .andWhere('class', className)
                .andWhere('title', title)
                .andWhere('time', time)
                .andWhere('module', module).delete();
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });
}

module.exports = LectureTaken;