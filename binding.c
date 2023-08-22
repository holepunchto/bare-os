#include <assert.h>
#include <bare.h>
#include <js.h>
#include <utf.h>
#include <uv.h>

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
init (js_env_t *env, js_value_t *exports) {
#define V(name, fn) \
  { \
    js_value_t *val; \
    js_create_function(env, name, -1, fn, NULL, &val); \
    js_set_named_property(env, exports, name, val); \
  }
  V("execPath", bare_os_exec_path);
  V("pid", bare_os_pid);
  V("ppid", bare_os_ppid);
  V("cwd", bare_os_cwd);
  V("chdir", bare_os_chdir);
  V("tmpdir", bare_os_tmpdir);
  V("homedir", bare_os_homedir);
#undef V

  return exports;
}

BARE_MODULE(bare_os, init)
