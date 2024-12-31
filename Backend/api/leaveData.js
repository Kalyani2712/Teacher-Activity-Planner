function LeaveData(server, db) {

    // Get all leave records
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

    // Get leave records for a specific teacher
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

    // Create a new leave record
    server.post('/leaves', async (req, res) => {
        try{
            const info = await db('leave_records').insert(req.body);
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });

    // Delete a leave record
    server.delete('/leaves/:id/:fromDate', async (req, res) => {
        try{
            const info = await db('leave_records').where('t_id', req.params.id).andWhere('fromDate', req.params.fromDate).del();
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });
}

module.exports = LeaveData;