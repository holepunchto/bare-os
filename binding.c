#include <assert.h>
#include <bare.h>
#include <js.h>
#include <utf.h>
#include <uv.h>

static js_value_t *
bare_os_type (js_env_t *env, js_callback_info_t *info) {
  int err;

  uv_utsname_t buffer;
  err = uv_os_uname(&buffer);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, (utf8_t *) buffer.sysname, -1, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_version (js_env_t *env, js_callback_info_t *info) {
  int err;

  uv_utsname_t buffer;
  err = uv_os_uname(&buffer);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, (utf8_t *) buffer.version, -1, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_release (js_env_t *env, js_callback_info_t *info) {
  int err;

  uv_utsname_t buffer;
  err = uv_os_uname(&buffer);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, (utf8_t *) buffer.release, -1, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_machine (js_env_t *env, js_callback_info_t *info) {
  int err;

  uv_utsname_t buffer;
  err = uv_os_uname(&buffer);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, (utf8_t *) buffer.machine, -1, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_exec_path (js_env_t *env, js_callback_info_t *info) {
  int err;

  size_t len = 4096;
  char exec_path[4096];

  err = uv_exepath(exec_path, &len);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, (utf8_t *) exec_path, len, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_pid (js_env_t *env, js_callback_info_t *info) {
  int err;

  js_value_t *result;
  err = js_create_uint32(env, uv_os_getpid(), &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_ppid (js_env_t *env, js_callback_info_t *info) {
  int err;

  js_value_t *result;
  err = js_create_uint32(env, uv_os_getppid(), &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_cwd (js_env_t *env, js_callback_info_t *info) {
  int err;

  size_t len = 4096;
  char cwd[4096];

  err = uv_cwd(cwd, &len);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, (utf8_t *) cwd, len, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_chdir (js_env_t *env, js_callback_info_t *info) {
  int err;

  size_t argc = 1;
  js_value_t *argv[1];

  err = js_get_callback_info(env, info, &argc, argv, NULL, NULL);
  assert(err == 0);

  assert(argc == 1);

  utf8_t dir[4096];
  err = js_get_value_string_utf8(env, argv[0], dir, 4096, NULL);
  assert(err == 0);

  err = uv_chdir((char *) dir);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  return NULL;
}

static js_value_t *
bare_os_tmpdir (js_env_t *env, js_callback_info_t *info) {
  int err;

  size_t len = 4096;
  char tmpdir[4096];

  err = uv_os_tmpdir(tmpdir, &len);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, (utf8_t *) tmpdir, len, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_homedir (js_env_t *env, js_callback_info_t *info) {
  int err;

  size_t len = 4096;
  char homedir[4096];

  err = uv_os_homedir(homedir, &len);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, (utf8_t *) homedir, len, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_kill (js_env_t *env, js_callback_info_t *info) {
  int err;

  size_t argc = 2;
  js_value_t *argv[2];

  err = js_get_callback_info(env, info, &argc, argv, NULL, NULL);
  assert(err == 0);

  assert(argc == 2);

  uint32_t pid;
  err = js_get_value_uint32(env, argv[0], &pid);
  assert(err == 0);

  uint32_t signum;
  err = js_get_value_uint32(env, argv[1], &signum);
  assert(err == 0);

  err = uv_kill(pid, signum);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  return NULL;
}

static js_value_t *
init (js_env_t *env, js_value_t *exports) {
  int err;

#define V(name, fn) \
  { \
    js_value_t *val; \
    err = js_create_function(env, name, -1, fn, NULL, &val); \
    assert(err == 0); \
    err = js_set_named_property(env, exports, name, val); \
    assert(err == 0); \
  }
  V("type", bare_os_type);
  V("version", bare_os_version);
  V("release", bare_os_release);
  V("machine", bare_os_machine);
  V("execPath", bare_os_exec_path);
  V("pid", bare_os_pid);
  V("ppid", bare_os_ppid);
  V("cwd", bare_os_cwd);
  V("chdir", bare_os_chdir);
  V("tmpdir", bare_os_tmpdir);
  V("homedir", bare_os_homedir);
  V("kill", bare_os_kill);
#undef V

  js_value_t *signals;
  err = js_create_object(env, &signals);
  assert(err == 0);

  err = js_set_named_property(env, exports, "signals", signals);
  assert(err == 0);

#define V(name) \
  { \
    js_value_t *val; \
    err = js_create_uint32(env, name, &val); \
    assert(err == 0); \
    err = js_set_named_property(env, signals, #name, val); \
    assert(err == 0); \
  }
#ifdef SIGHUP
  V(SIGHUP);
#endif

#ifdef SIGINT
  V(SIGINT);
#endif

#ifdef SIGQUIT
  V(SIGQUIT);
#endif

#ifdef SIGILL
  V(SIGILL);
#endif

#ifdef SIGTRAP
  V(SIGTRAP);
#endif

#ifdef SIGABRT
  V(SIGABRT);
#endif

#ifdef SIGIOT
  V(SIGIOT);
#endif

#ifdef SIGBUS
  V(SIGBUS);
#endif

#ifdef SIGFPE
  V(SIGFPE);
#endif

#ifdef SIGKILL
  V(SIGKILL);
#endif

#ifdef SIGUSR1
  V(SIGUSR1);
#endif

#ifdef SIGSEGV
  V(SIGSEGV);
#endif

#ifdef SIGUSR2
  V(SIGUSR2);
#endif

#ifdef SIGPIPE
  V(SIGPIPE);
#endif

#ifdef SIGALRM
  V(SIGALRM);
#endif

  V(SIGTERM);

#ifdef SIGCHLD
  V(SIGCHLD);
#endif

#ifdef SIGSTKFLT
  V(SIGSTKFLT);
#endif

#ifdef SIGCONT
  V(SIGCONT);
#endif

#ifdef SIGSTOP
  V(SIGSTOP);
#endif

#ifdef SIGTSTP
  V(SIGTSTP);
#endif

#ifdef SIGBREAK
  V(SIGBREAK);
#endif

#ifdef SIGTTIN
  V(SIGTTIN);
#endif

#ifdef SIGTTOU
  V(SIGTTOU);
#endif

#ifdef SIGURG
  V(SIGURG);
#endif

#ifdef SIGXCPU
  V(SIGXCPU);
#endif

#ifdef SIGXFSZ
  V(SIGXFSZ);
#endif

#ifdef SIGVTALRM
  V(SIGVTALRM);
#endif

#ifdef SIGPROF
  V(SIGPROF);
#endif

#ifdef SIGWINCH
  V(SIGWINCH);
#endif

#ifdef SIGIO
  V(SIGIO);
#endif

#ifdef SIGPOLL
  V(SIGPOLL);
#endif

#ifdef SIGLOST
  V(SIGLOST);
#endif

#ifdef SIGPWR
  V(SIGPWR);
#endif

#ifdef SIGINFO
  V(SIGINFO);
#endif

#ifdef SIGSYS
  V(SIGSYS);
#endif

#ifdef SIGUNUSED
  V(SIGUNUSED);
#endif
#undef V

  js_value_t *errnos;
  err = js_create_object(env, &errnos);
  assert(err == 0);

  err = js_set_named_property(env, exports, "errnos", errnos);
  assert(err == 0);

#define V(name, msg) \
  { \
    js_value_t *val; \
    err = js_create_int32(env, UV_##name, &val); \
    assert(err == 0); \
    err = js_set_named_property(env, errnos, #name, val); \
    assert(err == 0); \
  }
  UV_ERRNO_MAP(V);
#undef V

  return exports;
}

BARE_MODULE(bare_os, init)
