const test = require('brittle')
const os = require('.')

test('EOL', (t) => {
  t.comment(os.EOL.replace('\n', '\\n').replace('\r', '\\r'))
})

test('platform', (t) => {
  t.comment(os.platform())
})

test('arch', (t) => {
  t.comment(os.arch())
})

test('type', (t) => {
  t.comment(os.type())
})

test('version', (t) => {
  t.comment(os.version())
})

test('release', (t) => {
  t.comment(os.release())
})

test('machine', (t) => {
  t.comment(os.machine())
})

test('exec path', (t) => {
  t.comment(os.execPath())
})

test('pid', (t) => {
  t.comment(os.pid())
})

test('ppid', (t) => {
  t.comment(os.ppid())
})

test('cwd', (t) => {
  t.comment(os.cwd())
})

test('tmpdir', (t) => {
  t.comment(os.tmpdir())
})

test('homedir', (t) => {
  t.comment(os.homedir())
})

test('hostname', (t) => {
  t.comment(os.hostname())
})

test('process title', (t) => {
  t.comment(os.getProcessTitle())
})

test('priority', (t) => {
  t.plan(2)

  const priority = os.constants.priority.PRIORITY_BELOW_NORMAL

  t.ok(priority > 0)

  os.setPriority(priority)

  t.is(os.getPriority(), priority)
})

test('endianness', (t) => {
  t.comment(os.endianness())
})

test('available parallelism', (t) => {
  t.comment(os.availableParallelism())
})

test('cpu usage', (t) => {
  t.comment(os.cpuUsage())
})

test('thread cpu usage', (t) => {
  t.comment(os.threadCpuUsage())
})

test('resource usage', (t) => {
  t.comment(os.resourceUsage())
})

test('memory usage', (t) => {
  t.comment(os.memoryUsage())
})

test('free memory', (t) => {
  t.comment(os.freemem())
})

test('total memory', (t) => {
  t.comment(os.totalmem())
})

test('uptime', (t) => {
  t.comment(os.uptime())
})

test('load avg', (t) => {
  t.comment(os.loadavg())
})

test('cpus', (t) => {
  t.comment(os.cpus())
})

test('user info', (t) => {
  t.comment(os.userInfo())
})
