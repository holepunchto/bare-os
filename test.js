const test = require('brittle')
const os = require('.')

test('platform', (t) => {
  t.comment(os.platform())
})

test('arch', (t) => {
  t.comment(os.arch())
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
