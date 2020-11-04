//add base href

var fs = require('fs')
fs.readFile('build/index.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/<head><meta/g, '<head><base href="/dashboard/"><meta');

  fs.writeFile('build/index.html', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});

//copy

const copy = require('copy');

copy('build/**/*', '../public/dashboard', function(err, files) {
  if(err) {
    console.log('COPY ERROR', err);
  }
});
