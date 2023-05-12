#include <bare.h>
#include <js.h>
#include <uv.h>

static js_value_t *
bare_os_tmpdir (js_env_t *env, js_callback_info_t *info) {
  int err;

  size_t len = PATH_MAX;
  char tmpdir[PATH_MAX];

  err = uv_os_tmpdir(tmpdir, &len);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, tmpdir, len, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
bare_os_homedir (js_env_t *env, js_callback_info_t *info) {
  int err;

  size_t len = PATH_MAX;
  char homedir[PATH_MAX];

  err = uv_os_homedir(homedir, &len);
  if (err < 0) {
    js_throw_error(env, uv_err_name(err), uv_strerror(err));
    return NULL;
  }

  js_value_t *result;
  err = js_create_string_utf8(env, homedir, len, &result);
  if (err < 0) return NULL;

  return result;
}

static js_value_t *
init (js_env_t *env, js_value_t *exports) {
  {
    js_value_t *fn;
    js_create_function(env, "tmpdir", -1, bare_os_tmpdir, NULL, &fn);
    js_set_named_property(env, exports, "tmpdir", fn);
  }

  {
    js_value_t *fn;
    js_create_function(env, "homedir", -1, bare_os_homedir, NULL, &fn);
    js_set_named_property(env, exports, "homedir", fn);
  }

  return exports;
}

BARE_MODULE(bare_os, init)
