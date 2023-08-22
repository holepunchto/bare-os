const binding = require('./binding')

// For Node.js compatibility
exports.platform = function platform () {
  return process.platform
}

// For Node.js compatibility
exports.arch = function arch () {
  return process.arch
}

exports.pid = function pid () {
  return binding.pid()
}

exports.ppid = function ppid () {
  return binding.ppid()
}

exports.cwd = function cwd () {
  return binding.cwd()
}

exports.chdir = function chdir (directory) {
  return binding.chdir(directory)
}

exports.tmpdir = function tmpdir () {
  return binding.tmpdir()
}

exports.homedir = function tmpdir () {
  return binding.homedir()
}
