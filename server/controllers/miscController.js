const getStatus = async(req, res, next) => {
    try{
        res.status(200);
        res.send(`API Alive 
        IP : ${req.ip}
        `);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {getStatus}