import localforage from 'localforage'
import config from '@/config'

const TOKEN = 'token:'

const PERMISSION = 'permissions:'

const LOCALE = 'locale:'

export const setToken = (token) => {
  return localforage.setItem(getTokenKey(), token)
}

export const getToken = () => {
  return localforage.getItem(getTokenKey())
}

export const removeToken = () => {
  return localforage.removeItem(getTokenKey())
}

export const getTokenKey = () => {
  return TOKEN + config.guard
}

export const setPermissions = (permissions) => {
  return localforage.setItem(getPermissionKey(), permissions)
}

export const getPermissions = () => {
  return localforage.getItem(getPermissionKey())
}

export const getPermissionKey =  () => {
  return PERMISSION + config.guard
}

export const setLocale = (lang) => {
  return localforage.setItem(getLocaleKey(), lang)
}

export const getLocale = () => {
  return localforage.getItem(getLocaleKey())
}

const getLocaleKey = () => {
  return LOCALE + config.guard
}