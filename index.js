const binding = require('./binding')

exports.platform = function platform () {
  return process.platform
}

exports.arch = function arch () {
  return process.arch
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
