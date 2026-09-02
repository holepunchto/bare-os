import constants from './lib/constants'
import errors from './lib/errors'

export { constants, errors }

/** The platform-specific end-of-line marker: `'\r\n'` on Windows, `'\n'` everywhere else. */
export const EOL: '\r\n' | '\n'

/**
 * The platform-specific path to the null device: `'\\.\nul'` on Windows, `'/dev/null'` everywhere
 * else.
 */
export const devNull: '\\\\.\\nul' | '/dev/null'

/**
 * Returns the operating system platform as a string. Possible values include `'android'`,
 * `'darwin'`, `'ios'`, `'linux'`, and `'win32'`.
 */
export function platform(): 'android' | 'darwin' | 'ios' | 'linux' | 'win32'

/**
 * Returns the CPU architecture as a string. Possible values include `'arm'`, `'arm64'`, `'ia32'`,
 * and `'x64'`.
 */
export function arch(): 'arm' | 'arm64' | 'ia32' | 'x64'

/** Returns the operating system name as returned by `uname(3)`. */
export function type(): string

/** Returns the operating system version. */
export function version(): string

/** Returns the operating system release. */
export function release(): string

/** Returns the machine type as a string. */
export function machine(): string

/** Returns the absolute path of the executable that started the process. */
export function execPath(): string

/** Returns the process ID. */
export function pid(): number

/** Returns the parent process ID. */
export function ppid(): number

/** Returns the current working directory. */
export function cwd(): string

/**
 * Changes the current working directory to `dir`.
 * @param dir - Path of the directory to make the new working directory.
 * @throws Thrown with the underlying system error code (for example `ENOENT`) when `dir` does not
 * exist or cannot be entered.
 */
export function chdir(dir: string): void

/** Returns the operating system's default directory for temporary files. */
export function tmpdir(): string

/** Returns the home directory of the current user. */
export function homedir(): string

/** Returns the hostname of the operating system. */
export function hostname(): string

export interface NetworkInterface {
  address: string
  netmask: string
  family: 'IPv4' | 'IPv6'
  cidr: string
  mac: string
  internal: boolean
  scopeid?: number
}

/**
 * Returns an object containing network interfaces that have been assigned a network address. Each
 * key on the returned object identifies a network interface.
 */
export function networkInterfaces(): Record<string, NetworkInterface[]>

/**
 * Sends `signal` to the process identified by `pid`. `signal` can be a string or a number. Defaults
 * to `'SIGTERM'`.
 * @param pid - Process id to signal.
 * @param signal - Signal name or number to send (default `'SIGTERM'`); `0` probes for the process's
 * existence without sending a signal.
 * @throws {UNKNOWN_SIGNAL} Thrown as an `OSError` when `signal` is a string that is not a
 * recognized signal name.
 * @throws Thrown with the underlying system error code (for example `ESRCH`) when `pid` does not
 * identify a running process.
 */
export function kill(pid: number, signal?: string | number): void

export interface UserInfo {
  uid: number
  gid: number
  username: string
  homedir: string
  shell: string | null
}

/**
 * Returns information about a current user. The `uid` value defaults to the current effective uid.
 * @param uid - User ID to look up; defaults to the current effective uid.
 */
export function userInfo(uid?: number): UserInfo

export interface GroupInfo {
  groupname: string
  gid: number
  members: string[]
}

/**
 * Returns information about a group. The `gid` value defaults to the effective group ID of the
 * calling process.
 * @param gid - Group ID to look up; defaults to the effective group ID of the calling process.
 * @returns `null` on platforms that do not support group lookups (for example, Windows).
 */
export function groupInfo(gid?: number): GroupInfo | null

/** Returns `'LE'` on little-endian systems and `'BE'` on big-endian systems. */
export function endianness(): 'LE' | 'BE'

/** Returns the number of logical CPU cores available to the process. */
export function availableParallelism(): number

export interface CpuUsage {
  user: number
  system: number
}

/**
 * Returns an object with `user` and `system` properties, each representing CPU time in
 * microseconds. If `previous` is provided, the returned values are relative to it.
 * @param previous - A previous `CpuUsage` snapshot to compute a relative diff against.
 */
export function cpuUsage(previous?: CpuUsage): CpuUsage

/**
 * Like `os.cpuUsage()` but for the current thread only.
 * @param previous - A previous `CpuUsage` snapshot (from `threadCpuUsage()`) to compute a relative
 * diff against.
 */
export function threadCpuUsage(previous?: CpuUsage): CpuUsage

/** Returns an object describing the resource usage of the current process. */
export function resourceUsage(): {
  userCPUTime: number
  systemCPUTime: number
  maxRSS: number
  sharedMemorySize: number
  unsharedDataSize: number
  unsharedStackSize: number
  minorPageFault: number
  majorPageFault: number
  swappedOut: number
  fsRead: number
  fsWrite: number
  ipcSent: number
  ipcReceived: number
  signalsCount: number
  voluntaryContextSwitches: number
  involuntaryContextSwitches: number
}

/** Returns an object describing the memory usage of the process. */
export function memoryUsage(): {
  rss: number
  heapTotal: number
  heapUsed: number
  external: number
}

/** Returns the amount of free system memory in bytes. */
export function freemem(): number

/** Returns the total amount of system memory in bytes. */
export function totalmem(): number

/** Returns an estimate of the amount of memory available for the process in bytes. */
export function availableMemory(): number

/**
 * Returns the amount of memory available to the process under resource constraints, such as
 * cgroups.
 */
export function constrainedMemory(): number

/** Returns the system uptime in seconds. */
export function uptime(): number

/** Returns an array containing the 1, 5, and 15 minute load averages. */
export function loadavg(): ArrayLike<number>

/** Returns an array of objects describing each logical CPU core. */
export function cpus(): {
  model: string
  speed: number
  times: {
    user: number
    nice: number
    sys: number
    idle: number
    irq: number
  }
}[]

/** Returns the current process title. */
export function getProcessTitle(): string

/**
 * Sets the process title. `title` is coerced to a string and must be shorter than 256 characters.
 * @param title - New process title; coerced to a string if not already one.
 * @throws {TITLE_OVERFLOW} Thrown as an `OSError` when the process title is 256 characters or
 * longer.
 */
export function setProcessTitle(title: unknown): void

/**
 * Returns the scheduling priority of the process specified by `pid`. Defaults to `0`, meaning the
 * current process.
 * @param pid - Process id to query; defaults to `0` (the current process).
 */
export function getPriority(pid?: number): number

/**
 * Sets the scheduling priority of the process specified by `pid`. If `pid` is omitted, the priority
 * of the current process is set.
 * @param pid - Process id (defaults to the current process).
 * @param priority - Nice value to set.
 */
export function setPriority(priority: number): void
export function setPriority(pid: number, priority: number): void

/** Returns an array of the names of all environment variables. */
export function getEnvKeys(): string[]

/**
 * Returns the value of the environment variable `name`, or `undefined` if it is not set.
 * @param name - Name of the environment variable to read.
 */
export function getEnv(name: string): string | undefined

/**
 * Returns `true` if the environment variable `name` is set, otherwise `false`.
 * @param name - Name of the environment variable to check.
 */
export function hasEnv(name: string): boolean

/**
 * Sets the environment variable `name` to `value`.
 * @param name - Name of the environment variable to set.
 * @param value - Value to assign to the environment variable.
 */
export function setEnv(name: string, value: string): void

/**
 * Removes the environment variable `name`.
 * @param name - Name of the environment variable to remove.
 */
export function unsetEnv(name: string): void
