const isEmptyObject = (obj) => {
    // checks if an object is empty
    return JSON.stringify(obj) === '{}';
};

function TeacherInfo(server, db) {
    server.post('/auth', async (req, res) => {
        // authenticates a user
        const check = req.body;
        try{
          const info = await db('teachers').select('email', 'password', 't_id').where('email', check.email).where('password', check.password);
          if(info.length > 0){
            // returns the teacher id if the email and password are correct
            res.json(info[0].t_id);
          } else {
            // returns a 401 status code if the email and password are incorrect
            res.sendStatus(401);
          }
        } catch(err){
          console.log(err);
          res.sendStatus(500);
        }
      });

    server.get('/info/:id', async (req, res) => {
        // gets all the information of a specific teacher
        try{
            const info = await db('teachers').where('t_id', req.params.id);
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

    // Only used for testing
    server.get('/info', async (req, res) => {
        // gets all the information of all teachers
        try{
            const info = await db('teachers')
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }); 

    server.post('/register', async (req, res) => {
        // registers a new teacher
        const info = req.body;
        if(isEmptyObject(info)){
            // returns a 400 status code if the request body is empty
            res.sendStatus(400);
            return;
        }
        try{
            await db('teachers').insert(info);
            // returns the teacher id after a successful registration
            res.json(info.t_id);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }); 

    server.post('/remove', async (req, res) => {
        // deletes a teacher
        const info = req.body;
        if(isEmptyObject(info)){
            // returns a 400 status code if the request body is empty
            res.sendStatus(400);
            return;
        }
        try{
            await db('teachers').where('t_id', info.t_id).del();
            // returns a 200 status code if the deletion is successful
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });
}

module.exports = TeacherInfo;