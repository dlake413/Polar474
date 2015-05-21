var mysql = require('mysql')

var db = mysql.createConnection({
    host: 'localhost',
    user: 'kotwalkaran64',
    password: '',
    database: 'polar'
});;

exports.database = function(){        
    //Karan --> Testing Select statement demo
    this.selectPeople = function(id, name, orig_id, callback) {
        var sql = "SELECT * FROM people WHERE 0=0 ";
        var values = [];
	if(id){
	    sql += 'AND id = ? ';
	    values.push(id);
	}
	if(orig_id){
	    sql += 'AND orig_id = ? ';
	    values.push(orig_id);
	}
	if(name){
	    sql += 'AND name LIKE "%?%"'
	    values.push(name);
	}
	sql += ';';
        sql = mysql.format(sql, values);
	var res;
        db.query(sql, function(err, result){
	    callback(result);
	});
    }
    

    this.selectAllPeople = function(callback) {
	this.selectPeople(null,null,null, callback);
    }

    this.selectShips = function(id, name, orig_id, callback) {
	var sql = "SELECT * FROM ships WHERE 0=0 ";
	var values = [];
	if(id){
	    sql += 'AND id = ? ';
	    values.push(id);
	}
	if(name){
	    sql += 'AND name LIKE "%?%"'
	    values.push(name);
	}
	if(orig_id){
	    sql += 'AND orig_id = ? ';
	    values.push(orig_id);
	}
	sql += ';';
        sql = mysql.format(sql, values);
	var res;
        db.query(sql, function(err, result){
	    callback(result);
	});
    }

    this.selectAllShips = function(callback) {
	return this.selectShips(null,null,null,callback);
    }

    this.selectLocations = function(id, name, callback) {
	var sql = "SELECT * FROM location WHERE 0=0 ";
	var values = [];
	if(id){
	    sql += 'AND id = ? ';
	    values.push(id);
	}
	if(name){
	    sql += 'AND name LIKE "%?%"'
	    values.push(name);
	}
	sql += ';';
        sql = mysql.format(sql, values);
	var res;
        db.query(sql, function(err, result){
	    callback(result);
	});
    }

    this.selectAllLocations = function(callback) {
	return this.selectLocations(null, null, callback);
    }

    this.selectExpeditions = function(id, name, source, destination, callback){
	var sql = "SELECT * FROM expedition WHERE 0=0 "
	var values = [];
	if(id){
	    sql += 'AND id = ? ';
	    values.push(id);
	}
	if(name){
	    sql += 'AND name LIKE "%?%" '
	    values.push(name);
	}
	if(source){
	    sql += 'AND source = ? '
	    values.push(source);
	}
	if(destination){
	    sql += 'AND destination = ? '
	    values.push(destination);
	}
	sql += ';';
        sql = mysql.format(sql, values);
	var res;
        db.query(sql, function(err, result){
	    callback(result);
	});
    }

    this.selectAllExpeditions = function(callback){
	return selectExpeditions(null,null,null,null, callback);
    };
    
    //=================================

    //Karan --> Trying out update statements
    //============Update statements?=======//

    this.updatePeople = function(id, new_id, new_name) {
        // var sql = 'UPDATE people SET id = ?, name = ?, WHERE id = ?;';
        var sql = 'UPDATE people SET name = ? WHERE id = ?;';
        var values = [new_id, new_name, id];
        sql = mysql.format(sql, values);       
	db.query(sql);
	return;
    }
    
    this.updateExpedition = function(id, new_name, new_s, new_d) {
        var sql = 'UPDATE expedition SET name = ?, source = ?, destination = ? WHERE id = ?;';
        var values = [new_name, new_s, new_d, id];
        sql = mysql.format(sql, values);       
	db.query(sql);
	return;
    }
    
    this.updateLocation = function(id, new_name) {
        var sql = 'UPDATE location SET name = ? WHERE id = ?;';
        var values = [new_name, id];
        sql = mysql.format(sql, values);       
	db.query(sql);
	return;
    }
    
    this.updateShips = function(id, new_name) {
        var sql = 'UPDATE ships SET name = ? WHERE id = ?;';
        var values = [new_name, id];
        sql = mysql.format(sql, values);      
	db.query(sql);
	return; 
    }

    this.updateCrewMembers = function(cid, eid, new_cid, new_eid, new_rank, is_dead) {
	var dead;
	if(is_dead){
	    dead = 0;
	}
	else {
	    dead = 1;
	}
        var sql = 'UPDATE crew_members SET cid = ?, eid = ?, ranks = ?, died_on_expedition = ? WHERE cid = ? AND eid = ?;';
        var values = [new_cid,new_eid,new_rank,dead,cid, eid];
        sql = mysql.format(sql, values);
	db.query(sql);
	return;
    }

    this.updateExpedition_Ships = function(sid, eid, new_sid, new_eid) { 
        var sql = 'UPDATE expedition_ships SET sid = ?, eid = ? WHERE sid = ? AND eid = ?;';
        var values = [new_sid, new_eid, sid, eid];
        sql = mysql.format(sql, values);
	db.query(sql);
	return;
    }

    //===================Insert Statements==========================//                                     
    
    this.insertPeople = function(label, orig_id, callback){
        var sql = 'INSERT INTO people (name, orig_id) VALUES (?, ?);';
        var values = [label, orig_id];
        sql = mysql.format(sql, values);
	db.query(sql, function(err,res){callback(err,res)});
	return;
    }
    
    this.insertExpedition = function(id, name, s, d, callback){
        var sql = 'INSERT INTO expedition (id, name, source, destination) VALUES (?, ?, ?, ?);';
        var values = [id, name, s, d];
        sql = mysql.format(sql, values);
	db.query(sql, callback(err,res));
	return;
    }
    
    this.insertLocation = function(id, name, callback){
        var sql = 'INSERT INTO location (id, name) VALUES (?, ?);';
        var values = [id, name];
        sql = mysql.format(sql, values);
	db.query(sql, callback(err,res));
	return;
    }
    
    this.insertShips = function(name, orig_id, callback){
        var sql = 'INSERT INTO ships (name, orig_id) VALUES (?, ?);';
        var values = [name,orig_id];
        sql = mysql.format(sql, values);
	db.query(sql, callback(err,res));
	return;
    }
    
    this.insertCrew_Members = function(cid, eid, rank, died, callback){
        var sql = 'INSERT INTO crew_members (cid, eid, ranks, died_on_expedition) VALUES (?, ?, ?, ?);';
        var values = [cid, eid, rank, died];
        sql = mysql.format(sql, values);
	db.query(sql, callback(err,res));
	return;
    }
    
    this.insertExpedition_Ships = function(sid, eid, callback){
        var sql = 'INSERT INTO expedition_ships (sid, eid) VALUES (?, ?);';
        var values = [sid, eid];
        sql = mysql.format(sql, values);
	db.query(sql, callback(err,res));
	return;
    }
    //Karan--> Trying to do delete statements
    //=========================Delete Statements==============================//
    
    this.deletePeople= function(id, name) {
        var sql = 'DELETE FROM people WHERE id = ? AND name = ?;';
        var values = [id, name];
        sql = mysql.format(sql, values);
	db.query(sql);
	return;
    }


    this.deleteExpedition = function(id, name, s, d) {
        var sql = 'DELETE FROM expedition WHERE id = ? AND name = ? AND s = ? AND d = ?;';
        var values = [id, name, s, d];
        sql = mysql.format(sql, values);
	db.query(sql);
	return;

    }
    this.deleteLocation = function(id, name) {
        var sql = 'DELETE FROM location WHERE id = ? AND name = ?;';
        var values = [id, name];
        sql = mysql.format(sql, values);
	db.query(sql);
	return;
    }
    this.deleteShips = function(id, name) {
        var sql = 'DELETE FROM ships WHERE id = ? AND name = ?;';
        var values = [id, name];
        sql = mysql.format(sql, values);
	db.query(sql);
	return;
    }

    this.deleteCrew_Members = function(cid, eid, rank, died) {
	var sql = 'DELETE FROM crew_members WHERE cid = ? AND eid = ? AND rank = ? AND died = ?;';
        var values = [cid, eid, rank, died];
        sql = mysql.format(sql, values);
	db.query(sql);
	return;
    }
    this.deleteExpedition_Ship = function(sid, eid) {
	var sql = 'DELETE FROM expedition_ships WHERE sid = ? AND eid = ?;';
        var values = [sid, eid];
        sql = mysql.format(sql, values);
	db.query(sql);
	return;
    }
};
