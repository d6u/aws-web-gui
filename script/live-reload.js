'use strict';

// Nodemon - Watch and restart express server.
//
// Livereload - Reload page after Nodemon restarted express server.
//              You need to download the Chrome extension for it to work.
//              You can also google for FireFox plugin
// chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
//
// BrowserSync - Watch and reload jade, css, browser js file.
//               When CSS was changed, changes will be injected without refresh.

const config = require('config');
const nodemon = require('nodemon');
const browserSync = require('browser-sync');
const livereload = require('livereload');

browserSync({
  ui: {
    port: 3001,
    weinre: {
      port: 8080
    }
  },
  files: ['templates/**/*.jade', 'templates/**/*.html', 'public/**/*'],
  server: false,
  proxy: config.get('web.hostname') + ':' + config.get('web.port'),
  port: 3002,
  open: false,
  reloadDelay: 200
});

const livereloadServer = livereload.createServer();

let nodemonChangedFiles;
const nodemonLogPrefix = '[\u001b[34mNodemon\u001b[39m]';

nodemon({
  watch: ['src-server/**/*', 'config/*'],
  script: 'src-server/index.js',
  ext: 'js',
  stdout: false
})
  .on('readable', function () {
    this.stdout.on('data', function(chunk) {
      process.stdout.write(chunk);
      if (/^Web server started/.test(chunk)) {
        livereloadServer.refresh('');
        // In case livereload doesn't work in your browser, uncomment below line
        // browserSync.reload(nodemonChangedFiles);
      }
    });

    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
  })
  .on('restart', function (files) {
    nodemonChangedFiles = files;
    console.log(nodemonLogPrefix + ' App restarted due to');
    files.forEach(function (file) {
      console.log(nodemonLogPrefix + ' \t' + file);
    });
  });
