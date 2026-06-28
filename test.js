const test = require('brittle')
const os = require('.')

test('platform', (t) => {
  const platform = os.platform()

  t.comment(platform)
  t.ok(['android', 'darwin', 'ios', 'linux', 'win32'].includes(platform), 'is a known platform')
})

test('arch', (t) => {
  const arch = os.arch()

  t.comment(arch)
  t.ok(['arm', 'arm64', 'ia32', 'x64'].includes(arch), 'is a known arch')
})

test('EOL', (t) => {
  t.comment(os.EOL.replace('\n', '\\n').replace('\r', '\\r'))
  t.is(os.EOL, os.platform() === 'win32' ? '\r\n' : '\n')
})

test('devNull', (t) => {
  t.comment(os.devNull)
  t.is(os.devNull, os.platform() === 'win32' ? '\\\\.\\nul' : '/dev/null')
})

test('endianness', (t) => {
  const endianness = os.endianness()

  t.comment(endianness)
  t.ok(endianness === 'LE' || endianness === 'BE', "is 'LE' or 'BE'")
})

test('type', (t) => {
  const type = os.type()

  t.comment(type)
  t.is(typeof type, 'string')
  t.ok(type.length > 0, 'is not empty')
})

test('version', (t) => {
  const version = os.version()

  t.comment(version)
  t.is(typeof version, 'string')
  t.ok(version.length > 0, 'is not empty')
})

test('release', (t) => {
  const release = os.release()

  t.comment(release)
  t.is(typeof release, 'string')
  t.ok(release.length > 0, 'is not empty')
})

test('machine', (t) => {
  const machine = os.machine()

  t.comment(machine)
  t.is(typeof machine, 'string')
  t.ok(machine.length > 0, 'is not empty')
})

test('hostname', (t) => {
  const hostname = os.hostname()

  t.comment(hostname)
  t.is(typeof hostname, 'string')
  t.ok(hostname.length > 0, 'is not empty')
})

test('exec path', (t) => {
  const execPath = os.execPath()

  t.comment(execPath)
  t.is(typeof execPath, 'string')
  t.ok(execPath.length > 0, 'is not empty')
})

test('pid', (t) => {
  const pid = os.pid()

  t.comment(pid)
  t.is(typeof pid, 'number')
  t.ok(Number.isInteger(pid) && pid > 0, 'is a positive integer')
})

test('ppid', (t) => {
  const ppid = os.ppid()

  t.comment(ppid)
  t.is(typeof ppid, 'number')
  t.ok(Number.isInteger(ppid) && ppid > 0, 'is a positive integer')
})

test('cwd', (t) => {
  const cwd = os.cwd()

  t.comment(cwd)
  t.is(typeof cwd, 'string')
  t.ok(cwd.length > 0, 'is not empty')
})

test('chdir', (t) => {
  const cwd = os.cwd()

  os.chdir(os.tmpdir())
  t.ok(os.cwd().length > 0, 'changed to a directory')

  os.chdir(cwd)
  t.is(os.cwd(), cwd, 'restored the original directory')
})

test('chdir to a nonexistent directory throws', (t) => {
  t.exception(() => os.chdir('/this/path/does/not/exist'))
})

test('tmpdir', (t) => {
  const tmpdir = os.tmpdir()

  t.comment(tmpdir)
  t.is(typeof tmpdir, 'string')
  t.ok(tmpdir.length > 0, 'is not empty')
})

test('homedir', (t) => {
  const homedir = os.homedir()

  t.comment(homedir)
  t.is(typeof homedir, 'string')
  t.ok(homedir.length > 0, 'is not empty')
})

test('process title', (t) => {
  const title = os.getProcessTitle()

  t.comment(title)
  t.is(typeof title, 'string')

  os.setProcessTitle('bare-os-test')
  t.is(os.getProcessTitle(), 'bare-os-test', 'round trips a new title')

  os.setProcessTitle(title)
})

test('set process title coerces non-strings', (t) => {
  const title = os.getProcessTitle()

  os.setProcessTitle(1234)
  t.is(os.getProcessTitle(), '1234', 'coerces with toString')

  os.setProcessTitle(title)
})

test('set process title throws when too long', (t) => {
  t.exception(() => os.setProcessTitle('a'.repeat(256)), /TITLE_OVERFLOW/)
})

test('priority', (t) => {
  t.plan(2)

  const priority = os.constants.priority.PRIORITY_BELOW_NORMAL

  t.ok(priority > 0)

  os.setPriority(priority)

  t.is(os.getPriority(), priority)
})

test('priority with explicit pid', (t) => {
  const priority = os.constants.priority.PRIORITY_BELOW_NORMAL

  os.setPriority(0, priority)

  t.is(os.getPriority(0), priority, 'accepts an explicit pid')
})

test('kill with signal 0 probes an existing process', (t) => {
  t.execution(() => os.kill(os.pid(), 0))
})

test('kill with an unknown signal name throws', (t) => {
  t.exception(() => os.kill(os.pid(), 'SIGNOTAREALSIGNAL'), /UNKNOWN_SIGNAL/)
})

test('available parallelism', (t) => {
  const parallelism = os.availableParallelism()

  t.comment(parallelism)
  t.ok(Number.isInteger(parallelism) && parallelism > 0, 'is a positive integer')
})

test('cpu usage', (t) => {
  const usage = os.cpuUsage()

  t.comment(usage)
  t.is(typeof usage.user, 'number')
  t.is(typeof usage.system, 'number')

  const diff = os.cpuUsage(usage)
  t.is(typeof diff.user, 'number')
  t.is(typeof diff.system, 'number')
})

test('thread cpu usage', (t) => {
  const usage = os.threadCpuUsage()

  t.comment(usage)
  t.is(typeof usage.user, 'number')
  t.is(typeof usage.system, 'number')

  const diff = os.threadCpuUsage(usage)
  t.is(typeof diff.user, 'number')
  t.is(typeof diff.system, 'number')
})

test('resource usage', (t) => {
  const usage = os.resourceUsage()

  t.comment(usage)

  for (const key of [
    'userCPUTime',
    'systemCPUTime',
    'maxRSS',
    'sharedMemorySize',
    'unsharedDataSize',
    'unsharedStackSize',
    'minorPageFault',
    'majorPageFault',
    'swappedOut',
    'fsRead',
    'fsWrite',
    'ipcSent',
    'ipcReceived',
    'signalsCount',
    'voluntaryContextSwitches',
    'involuntaryContextSwitches'
  ]) {
    t.is(typeof usage[key], 'number', `${key} is a number`)
  }
})

test('memory usage', (t) => {
  const usage = os.memoryUsage()

  t.comment(usage)

  for (const key of ['rss', 'heapTotal', 'heapUsed', 'external']) {
    t.is(typeof usage[key], 'number', `${key} is a number`)
  }
})

test('free memory', (t) => {
  const freemem = os.freemem()

  t.comment(freemem)
  t.ok(freemem > 0, 'is positive')
})

test('total memory', (t) => {
  const totalmem = os.totalmem()

  t.comment(totalmem)
  t.ok(totalmem > 0, 'is positive')
  t.ok(totalmem >= os.freemem(), 'is at least the free memory')
})

test('available memory', (t) => {
  const availableMemory = os.availableMemory()

  t.comment(availableMemory)
  t.is(typeof availableMemory, 'number')
  t.ok(availableMemory >= 0, 'is non-negative')
})

test('constrained memory', (t) => {
  const constrainedMemory = os.constrainedMemory()

  t.comment(constrainedMemory)
  t.is(typeof constrainedMemory, 'number')
  t.ok(constrainedMemory >= 0, 'is non-negative')
})

test('uptime', (t) => {
  const uptime = os.uptime()

  t.comment(uptime)
  t.is(typeof uptime, 'number')
  t.ok(uptime >= 0, 'is non-negative')
})

test('load avg', (t) => {
  const loadavg = os.loadavg()

  t.comment(loadavg)
  t.is(loadavg.length, 3, 'has three values')

  for (const value of loadavg) {
    t.is(typeof value, 'number')
  }
})

test('cpus', (t) => {
  const cpus = os.cpus()

  t.comment(cpus)
  t.ok(Array.isArray(cpus), 'is an array')
  t.ok(cpus.length > 0, 'is not empty')

  for (const cpu of cpus) {
    t.is(typeof cpu.model, 'string')
    t.is(typeof cpu.speed, 'number')

    for (const key of ['user', 'nice', 'sys', 'idle', 'irq']) {
      t.is(typeof cpu.times[key], 'number', `times.${key} is a number`)
    }
  }
})

test('user info', (t) => {
  const info = os.userInfo()

  t.comment(info)
  t.is(typeof info.uid, 'number')
  t.is(typeof info.gid, 'number')
  t.is(typeof info.username, 'string')
  t.is(typeof info.homedir, 'string')
  t.ok(info.shell === null || typeof info.shell === 'string')

  if (info.uid === -1) t.comment('no uid; skipping lookup by uid')
  else t.alike(os.userInfo(info.uid), info, 'looks up by uid')
})

test('group info', (t) => {
  const info = os.groupInfo()

  t.comment(info)

  if (info === null) {
    t.pass('no group info available')
  } else {
    t.is(typeof info.groupname, 'string')
    t.is(typeof info.gid, 'number')
    t.ok(Array.isArray(info.members), 'members is an array')
    t.alike(os.groupInfo(info.gid), info, 'looks up by gid')
  }
})

test('network interfaces', (t) => {
  const interfaces = os.networkInterfaces()

  t.comment(interfaces)
  t.is(typeof interfaces, 'object')

  for (const [name, entries] of Object.entries(interfaces)) {
    t.ok(Array.isArray(entries), `${name} is an array of entries`)

    for (const entry of entries) {
      t.is(typeof entry.address, 'string')
      t.is(typeof entry.netmask, 'string')
      t.ok(entry.family === 'IPv4' || entry.family === 'IPv6')
      t.is(typeof entry.cidr, 'string')
      t.is(typeof entry.mac, 'string')
      t.is(typeof entry.internal, 'boolean')
    }
  }
})

test('env', (t) => {
  t.plan(5)

  const key = '__BARE_OS_TEST_ENV__'

  t.is(os.hasEnv(key), false)
  t.is(os.getEnv(key), undefined)

  os.setEnv(key, 'fake_env')

  t.is(os.hasEnv(key), true)
  t.is(os.getEnv(key), 'fake_env')

  os.unsetEnv(key)

  t.is(os.hasEnv(key), false)
})

test('set env overwrites an existing value', (t) => {
  const key = '__BARE_OS_TEST_ENV__'

  os.setEnv(key, 'first')
  os.setEnv(key, 'second')

  t.is(os.getEnv(key), 'second')

  os.unsetEnv(key)
})

test('unset env is a no-op for a missing key', (t) => {
  t.execution(() => os.unsetEnv('__BARE_OS_TEST_MISSING_ENV__'))
})

test('env keys', (t) => {
  const key = '__BARE_OS_TEST_ENV__'

  const before = os.getEnvKeys()
  t.ok(Array.isArray(before), 'is an array')
  t.absent(before.includes(key), 'does not list an unset key')

  os.setEnv(key, 'fake_env')
  t.ok(os.getEnvKeys().includes(key), 'lists a set key')

  os.unsetEnv(key)
  t.absent(os.getEnvKeys().includes(key), 'no longer lists an unset key')
})
