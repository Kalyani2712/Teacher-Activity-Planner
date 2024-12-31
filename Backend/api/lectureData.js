function LectureData(server, db) {
    
    // Only used for testing
    // get all lectures
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

    // get lectures by teacher id
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

    // get lectures by teacher id, month, year, className and semester
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

    // get all lectures by teacher id in object form
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

    // check if lecturer has lecture in a specific month and year
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

    // insert or update data into teaching_plan table
    // use this if you want to remove a lecture, it will be updated in lecturedetails. 
    server.post('/lectures', async (req, res) => {
        const data = req.body;
        try{
            const check = await db('teaching_plan').select().where('t_id', data.t_id).andWhere('year', data.year).andWhere('month', data.month)
            .andWhere('class', data.class).andWhere('semester', data.semester);
            console.log(check);
            if(check.length > 0 && check !== undefined){
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

    // delete all lectures of a teacher
    // use with caution
    server.delete('/lecturesRemove/:id', async (req, res) => {
        const id = req.params.id;
        try{
            await db('teaching_plan').where('t_id', id).delete();
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

    // delete a lectures of a teacher by month, year, title and className
    server.put('/lecturesRemoveByData/:id', async (req, res) => {
        const id = req.params.id;
        const { month , year, title, className }  = req.body;
        try{
            await db('teaching_plan').where('t_id', id)
                .andWhere('month', month)
                .andWhere('year', year)
                .andWhere('class', className)
                .andWhere('title', title).delete();
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

}

module.exports = LectureData;