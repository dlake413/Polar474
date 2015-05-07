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
//SELECT * FROM table_name is all the rows in colums in a table
//Karan --> Testing Select statement demo
    this.selectPeopleByName = function(name) {
         var sql = "SELECT * FROM people WHERE name = ?;";
         var values = [name];
         sql = mysql.format(sql, inserts);
         console.log(sql);
         this.perform_query(this.db,'people',sql);
    }
   
   this.selectAllPeople = function() {
        var sql = "SELECT * FROM people;";
        console.log(sql);
        this.perform_query(this.db,'people');
   }
   
//=================================

//Karan --> Trying out update statements
//============Update statements?=======//
    //update by id?
    this.updatePeople = function(id, name, new_id, new_name, db) {
        // var sql = 'UPDATE people SET id = ?, name = ?, WHERE id = ?;';
         var sql = 'UPDATE people SET name = ?, WHERE id = ?;';
         var values = [new_id, new_name, id];
         sql = mysql.format(sql, values);
         this.perform_query(this.db, 'people', sql, db);
    }
   
    this.updateExpedition = function(id, name, s, d, db,new_name, new_s, new_d) {
         var sql = 'UPDATE expedition SET name = ?, s = ?, d = ?, WHERE id = ?;';
         var values = [new_name, new_s, new_d, id];
         sql = mysql.format(sql, values);
         this.perform_query(this.db, 'expedition', sql, db);
    }
   
   this.updateLocation = function(id, name, new_name, db) {
         var sql = 'UPDATE location SET name = ?, WHERE id = ?;';
         var values = [new_name, id];
         sql = mysql.format(sql, values);
         this.perform_query(this.db, 'location', sql, db);
    }
 
   this.updateShips = function(id, name, new_name, db) {
         var sql = 'UPDATE ships SET name = ?, WHERE id = ?;';
         var values = [new_name, id];
         sql = mysql.format(sql, values);
         this.perform_query(this.db, 'ships', sql, db);
   }

   this.updateCrewMembers = function(cid, eid, rank, died, db, new_cid, new_eid, new_rank, is_dead) {
         var sql = 'UPDATE crew_members SET cid = ?, eid = ?, rank = ?, died = ?, WHERE cid = ?;';
         var values = [new_cid,new_eid,new_rank,is_dead];
         sql = mysql.format(sql, values);
         this.perform_query(this.db, 'crew_members', sql, db);
   }

   this.updateExpedition_Ships = function(sid, eid, db, new_sid, new_eid) { 
        var sql = 'UPDATE expedition_ships SET sid = ?, eid = ?, WHERE sid = ?;';
        var values = [new_sid, new_eid];
        sql = mysql.format(sql, values);
        this.perform_query(this.db, 'expedition_ships', sql, db);
   }

//=============================================================



//===================Insert Statements==========================//                                     
         
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
//Karan--> Trying to do delete statements
//=========================Delete Statements========================================================//
    
    this.deletePeople= function(id, name, db) {
        var sql = 'DELETE FROM people WHERE id = ? AND name = ?;';
        var values = [id, name];
        sql = mysql.format(sql, values);
        this.perform_query(this.db, 'people', sql, db);    
    }


    this.deleteExpedition = function(id, name, s, d, db) {
        var sql = 'DELETE FROM expedition WHERE id = ? AND name = ? AND s = ? AND d = ?;';
        var values = [id, name, s, d];
        sql = mysql.format(sql, values);
        this.perform_query(this.db, 'expedition', sql, db);

    }
    this.deleteLocation = function(id, name, db) {
          var sql = 'DELETE FROM location WHERE id = ? AND name = ?;';
          var values = [id, name];
          sql = mysql.format(sql, values);
          this.perform_query(this.db, 'location', sql, db);
   }
    this.deleteShips = function(id, name, db) {
        var sql = 'DELETE FROM ships WHERE id = ? AND name = ?;';
          var values = [id, name];
          sql = mysql.format(sql, values);
          this.perform_query(this.db, 'ships', sql, db);
    }

    this.deleteCrew_Members = function(cid, eid, rank, died, db) {
    var sql = 'DELETE FROM crew_members WHERE cid = ? AND eid = ? AND rank = ? AND died = ?;';
          var values = [cid, eid, rank, died];
          sql = mysql.format(sql, values);
          this.perform_query(this.db, 'crew_members', sql, db);

    }
    this.deleteExpedition_Ship = function(sid, eid, db) {
     var sql = 'DELETE FROM expedition_ships WHERE sid = ? AND eid = ?;';
          var values = [sid, eid];
          sql = mysql.format(sql, values);
          this.perform_query(this.db, 'expedition_ships', sql, db);

    }    
};
