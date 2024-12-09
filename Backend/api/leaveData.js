function LeaveData(server, db) {

    server.get('/leaves', async (req, res) => {
        try{
            const info = await db('leave_records').select();
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

    server.get('/leaves/:id', async (req, res) => {
        try{
            const info = await db('leave_records').select().where('t_id', req.params.id);
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

    server.post('/leaves', async (req, res) => {
        try{
            const info = await db('leave_records').insert(req.body);
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });
}

module.exports = LeaveData;