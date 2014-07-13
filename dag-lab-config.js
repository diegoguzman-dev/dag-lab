/*jslint node: true */
"use strict";

var	fp = require('path'), // We use path to give filenames without the whole the whole... path.
	chalk = require('chalk'); //Chalk for colors in console
 
function prettyPath(path){
  return fp.relative(__dirname, path);
}


exports.paths = {
	css : './dist/css/',
	htm : ['./src/templates/header.htm', './src/templates/meat.htm', './src/templates/footer.htm'],
	html : './dist/',
	js : './src/js/**/*.js',
	jsmin : './dist/js/',
	sass : './src/sass/**/*.scss'
};

exports.endTaskMsg = function(){
  var endTime = new Date();
  console.log('\n Task '+ chalk.bgGreen('completed') + ' at ' + endTime.toTimeString() + '\n');
};

exports.fileChangedMsg = function(fl){

  console.log('\n File ' + chalk.yellow( prettyPath(fl.path) ) + ' changed \n');
};


exports.handleError = function(err) {
  console.log('\u0007');
  console.log(err.toString() + '\n ' + chalk.bgMagenta('gulp is waiting...'));
  this.emit('end');
};