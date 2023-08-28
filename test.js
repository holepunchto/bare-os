const test = require('brittle')
const os = require('.')

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

test('execPath', (t) => {
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

test('process title', (t) => {
  t.comment(os.getProcessTitle())
})
