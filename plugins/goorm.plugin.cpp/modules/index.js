/**
 * Copyright Sung-tae Ryu, goormDev Team. All rights reserved.
 * Code licensed under the AGPL v3 License:
 * http://www.goorm.io/intro/License
 * email : contact@goorm.io
 *       : sungtae.ryu@goorm.io
 * project_name : goormIDE
 * version: 2.0.0
 **/
/*jslint evil: true, devel: true, node: true, plusplus: true, unparam: false */
/*global mongoose: true, Scheme: true, org: true, core: true, goorm: true, io: true */

var EventEmitter = require("events").EventEmitter;

module.exports = {
	emit: function (io, msg) {
		if(msg.channel == "list_up"){
			var exec = require('child_process').exec;
			var evt = new EventEmitter();
			var compiler_list = [];
			evt.on('get_compiler_type', function (evt, i){
				var type = msg.test_data[i];
				if(type){
					exec(type + " -v", function(err, stdout, stderr){
						if(err === null){
							compiler_list.push(type);
						}
						evt.emit('get_compiler_type', evt, ++i);
					});
				}else{
					msg.socket.to().emit('cpp_compiler_list_up', compiler_list);
				}
			});
			evt.emit('get_compiler_type', evt, 0);
		}
	}
	
//	debug: function(req, evt) {
//		var debug = require(common.path+"modules/project/debug.js");
//		
//		if(req.mode == "init") {
//			debug.init(req, evt);
//		}
//		else if (req.mode == "close") {
//			debug.close();
//		}
//		else {
//			debug.debug(req, evt);
//		}
//	}
};