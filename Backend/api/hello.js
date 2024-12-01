function Hello(server) {
    server.get('/hello', (req, res) => {
        res.send('Hello World!');
    });    
}

module.exports = Hello;
