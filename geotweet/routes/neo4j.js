var express = require('express');
var config = require('config');
var neo4j = require('neo4j-driver').v1;
var router = express.Router();

// Connect to neo4j
var neoConfig = config.get('Neo4j.dbConfig');
var neoDriver = neo4j.driver(neoConfig.remotehost, 
	neo4j.auth.basic(
		neoConfig.username,
		neoConfig.remote_pw)
	);

// Begin neo4j session
var session = neoDriver.session();

router.route('/')
	.post(function(req,res){
		var query = req.body.query;

		session
			.run(query)
			.then( function( result ) {
				for(var i = 0; i < result.records.length; i++) {
					console.log(result.records[i].get('name'));
				}
			});

	});

router.route('/topics')
	.get(function(req,res) {
		console.log("received request for topics");
		session
			.run("match (t:Topic) return t.topic as topic limit 10")
			.then( function( result ) {
				var topics = new Array();
				result.records.forEach(function(r){
					topics.push(r.get('topic'))
				});

				res.send(topics);
				//res.setHeader('Content-Type', 'application/json');
				//res.send(JSON.stringify(result));
			});

	});

module.exports = router;




