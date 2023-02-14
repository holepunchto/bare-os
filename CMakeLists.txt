cmake_minimum_required(VERSION 3.25)

project(pear_os C)

include(pear)

add_pear_module(pear_os)

target_sources(
  pear_os
  PRIVATE
    binding.c
)
