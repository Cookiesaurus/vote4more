// Make an object serializable to JSON.
//
// Useful to convert an object which may contain non-serializeable data such as

import { NextRequest, NextResponse } from "next/server";
import Router from "next/router";
import { USER_ID_HEADER_NAME } from "../middleware";
import { NextApiRequest } from "next";
import { User } from "../pages/api/user";

// Dates to an object that doesn't
export function makeSerializable<T extends any> (o: T): T {
  return JSON.parse(JSON.stringify(o))
}                                                                       

export type Cookie = {
  auth: string
}

export function parseCookie(str): Cookie {
  return str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
}

/**
 * Call this once a user has logged in to navigate them to their respective
 * default homepage.
 * @param user 
 */
export function onLoggedIn(user: User) {
  if (!user.isLoggedIn)
    Error('User is not logged in!')
  if (user.role === PROF_ROLE)
    Router.push('/courses')
  else if (user.role === ADMIN_ROLE)
    Router.push('/accounts')
}

export const getToken = () => localStorage.getItem('rawrs-token')
export const setToken = (value: string) => localStorage.setItem('rawrs-token', value)

/**
 * Utility function to get the user id from the request header.
 * @param req 
 * @returns 
 */
export function getUserIdFromRequest(req: NextApiRequest): number {
  const id = req.headers[USER_ID_HEADER_NAME]

  if (id) // Value is not fasly
    return parseInt(id[0])
  throw Error(`Request to ${req.url} does not have the key ${USER_ID_HEADER_NAME} present in header.`)
}

export const PROF_ROLE = 'professor'
export const ADMIN_ROLE = 'admin'
export const STUDENT_ROLE = 'student'
export const USER_COOKIE_NAME = 'user'