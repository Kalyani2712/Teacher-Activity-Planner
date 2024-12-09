function AssigneLectures(server, db) {

    server.get('/assignedlectures/:id', async (req, res) => {
        try{
            const info = await db('assigned_lectures').select().where('t_id', req.params.id);
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

    server.post('/assignedlectures', async (req, res) => {
        try{
            const info = await db('assigned_lectures').insert(req.body);
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
}

module.exports = AssigneLectures;