#include <assert.h>
#include <bare.h>
#include <js.h>
#include <utf.h>
#include <uv.h>

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
  {
    js_value_t *fn;
    js_create_function(env, "cwd", -1, bare_os_cwd, NULL, &fn);
    js_set_named_property(env, exports, "cwd", fn);
  }
  {
    js_value_t *fn;
    js_create_function(env, "chdir", -1, bare_os_chdir, NULL, &fn);
    js_set_named_property(env, exports, "chdir", fn);
  }
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
