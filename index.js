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

exports.type = binding.type
exports.version = binding.version
exports.release = binding.release
exports.machine = binding.machine
exports.execPath = binding.execPath
exports.pid = binding.pid
exports.ppid = binding.ppid
exports.cwd = binding.cwd
exports.chdir = binding.chdir
exports.tmpdir = binding.tmpdir
exports.homedir = binding.homedir

exports.kill = function kill (pid, signal = constants.signals.SIGTERM) {
  if (typeof signal === 'string') {
    if (signal in constants.signals === false) {
      throw errors.UNKNOWN_SIGNAL('Unknown signal: ' + signal)
    }

    signal = constants.signals[signal]
  }

  binding.kill(pid, signal)
}
