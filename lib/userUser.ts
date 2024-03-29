import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { USER_COOKIE_NAME } from "./util"
import { User } from "../pages/api/auth/login"

/**
 * Fetch user info stored in cookies if exist.
 * @returns The user or null if the user cookie wasn't set.
 */
export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currUser = Cookies.get(USER_COOKIE_NAME)
    if (currUser)
      setUser(JSON.parse(currUser))
  }, [])

  return user
}