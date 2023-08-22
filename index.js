const binding = require('./binding')
const errors = require('./lib/errors')
const constants = require('./lib/constants')

exports.constants = constants

// For Node.js compatibility
exports.platform = function platform () {
  return process.platform
}

// For Node.js compatibility
exports.arch = function arch () {
  return process.arch
}

exports.execPath = function pid () {
  return binding.execPath()
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

exports.kill = function kill (pid, signal = constants.signals.SIGTERM) {
  if (typeof signal === 'string') {
    if (signal in constants.signals === false) {
      throw errors.UNKNOWN_SIGNAL('Unknown signal: ' + signal)
    }

    signal = constants.signals[signal]
  }

  binding.kill(pid, signal)
}
