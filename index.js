const binding = require('./binding')

exports.platform = function platform () {
  return process.platform
}

exports.arch = function arch () {
  return process.arch
}

exports.tmpdir = function tmpdir () {
  return binding.tmpdir()
}

exports.homedir = function tmpdir () {
  return binding.homedir()
}
