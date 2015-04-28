var mysql = require('mysql');

exports.database = function(){
    this.db = mysql.createConnection({
        host: 'localhost',
        user: 'kotwalkaran64',
        password: '',
        database: 'polar'
    });
    
    this.perform_query = function(db, table, sql){
        
        this.db.query(sql, function(err, result) {
            if (err) throw err;
            
            return result.insertId;
        });
    }
    
    this.check_db = function(req, res) {
        this.db.getConnection(function(error, connection) {
            if(error) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }
            console.log('connected as id' + connection.threadID);
            connection.on('error', function(error) {
                res.json({"code" : 100, "status" : "Error in connection database" });
            });
        });
    };
    
    this.insertPeople = function(id, label, db){
        var sql = 'INSERT INTO people (id, name) VALUES (?, ?);';
        var values = [id, label];
        sql = mysql.format(sql, values);
        this.perform_query(this.db, 'people', sql, id);
    }
    
    this.insertExpedition = function(id, name, s, d, db){
        var sql = 'INSERT INTO expedition (id, name, source, destination) VALUES (?, ?, ?, ?);';
        var values = [id, name, s, d];
        sql = mysql.format(sql, values);
        this.perform_query(this.db, 'expedition', sql, id);
    }
    
    this.insertLocation = function(id, name, db){
        var sql = 'INSERT INTO location (id, name) VALUES (?, ?);';
        var values = [id, name];
        sql = mysql.format(sql, values);
        this.perform_query(this.db, 'location', sql, id);
    }
    
    this.insertShips = function(id, name, db){
        var sql = 'INSERT INTO ships (id, name) VALUES (?, ?);';
        var values = [id, name];
        sql = mysql.format(sql, values);
        this.perform_query(this.db, 'ships', sql, id);
    }
    
    this.insertCrew_Members = function(cid, eid, rank, died, db){
        var sql = 'INSERT INTO crew_members (cid, eid, ranks, died_on_expedition) VALUES (?, ?, ?, ?);';
        var values = [cid, eid, rank, died];
        sql = mysql.format(sql, values);
        this.perform_query(this.db, 'crew_members', sql);
    }
    
    this.insertExpedition_Ships = function(sid, eid, db){
        var sql = 'INSERT INTO expedition_ships (sid, eid) VALUES (?, ?);';
        var values = [sid, eid];
        sql = mysql.format(sql, values);
        this.perform_query(this.db, 'expedition_ships', sql);
    }
    /*
    this.deletePeople() {
        
    }
    this.deleteExpedition() {
    }
    this.deleteLocation() {
    }
    this.deleteShips(){
    }
    this.deleteCrew_Members() {
    }
    this.deleteExpedition_Ship() {
    }
    
    */
};