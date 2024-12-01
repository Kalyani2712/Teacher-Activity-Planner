const { select } = require("../sql/dbConfig");
const { trace } = require("./server");

const isEmptyObject = (obj) => {
    return JSON.stringify(obj) === '{}';
};

function TeacherInfo(server, db) {
    server.post('/auth', async (req, res) => {
        const check = req.body;
        try{
          const info = await db('teachers').select('email', 'password', 't_id').where('email', check.email).where('password', check.password);
          if(info.length > 0){
            res.json(info[0].t_id);
          } else {
            res.sendStatus(401);
          }
        } catch(err){
          console.log(err);
          res.sendStatus(500);
        }
      });

    server.get('/info/:id', async (req, res) => {
        try{
            const info = await db('teachers').where('t_id', req.params.id);
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }); 

    server.get('/info', async (req, res) => {
        try{
            const info = await db('teachers')
            res.json(info);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }); 

    server.put('/info/:id', async (req, res) => {
        //res.send('Hello World!');
    });

    server.post('/register', async (req, res) => {
        const info = req.body;
        if(isEmptyObject(info)){
            res.sendStatus(400);
            return;
        }
        try{
            await db('teachers').insert(info);
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }); 
}

module.exports = TeacherInfo;