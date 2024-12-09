const { andWhere } = require("../sql/dbConfig");

function LectureData(server, db) {
    
    server.get('/lectures', async (req, res) => {
        try{
            const info = await db('teaching_plan').select();
            if (info.length === 0){
                console.log(info)
                res.sendStatus(404);
            }
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

    server.get('/lectures/:id', async (req, res) => {
        const id = req.params.id;
        try{
            const info = await db('teaching_plan').select().where('t_id', id);
            if (info.length === 0){
                console.log(info)
                res.sendStatus(404);
                return;
            }
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

    server.put('/lectures/:id', async (req, res) => {
        const id = req.params.id;
        const { month, year, className, semester } = req.body;
        console.log( month, year, className, semester);
        try{
            const info = await db('teaching_plan').select().where('t_id', id)
                .andWhere('month', month)
                .andWhere('year', year)
                .andWhere('class', className)
                .andWhere('semester', semester);
            if (info.length === 0){
                console.log(info)
                res.sendStatus(404);
                return;
            }
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });


    server.get('/lecturesObjets/:id', async (req, res) => {
        const id = req.params.id;
        try{
            const info = await db('teaching_plan').select('lectureDetails').where('t_id', id);
            if (info.length === 0){
                res.sendStatus(404);
                return;
            }
            const lectures = JSON.parse(info[0].lectureDetails);
            res.json(lectures);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

    server.put('/lecturesCheck/:id', async (req, res) => {
        const id = req.params.id;
        const { month , year, title, className } = req.body;
        console.log(month, year, title, className);
        try{
            const info = await db('teaching_plan').select().where('t_id', id)
                .andWhere('month', month)
                .andWhere('year', year)
                .andWhere('class', className)
                .andWhere('title', title);
            if (info.length === 0){
                console.log(info);
                res.sendStatus(404);
                return;
            }
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

    // insert data into teaching_plan table
    server.post('/lectures', async (req, res) => {
        const data = req.body;
        try{
            const check = await db('teaching_plan').select().where('t_id', data.t_id).andWhere('year', data.year).andWhere('month', data.month)
            .andWhere('class', data.class).andWhere('semester', data.semester);
            console.log(check);
            if(check.length > 0 || check === undefined){
                await db('teaching_plan').where('t_id', data.t_id).andWhere('year', data.year).andWhere('month', data.month)
                .andWhere('class', data.class).andWhere('semester', data.semester).update(data);
            }
            else{await db('teaching_plan').insert(data);} 
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

}

module.exports = LectureData;