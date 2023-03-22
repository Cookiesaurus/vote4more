import Cookies from 'js-cookie'
import { User } from '../pages/api/auth/login'
import { post } from './fetch-wrapper'

async function registerRequest(
  username: string, 
  firstName: string,
  lastName: string,
  password: string,
  email: string
  ): Promise<User> {
  return await post('api/auth/register', 
  {
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email
  })
  .catch(ex => {
    if (ex.response) {
      console.log(ex.response.data)
    }
  })
  .then(data => data?.user)
}

// Tried using a type then macro to remove duplicate type definitions, but wasn't worth the complexity and time investment
// to reach functionality, therefore:

/**
 * Register the user.
 * @returns A functional expression that can be used to register the user.
 */
export const useRegister = (): {
  register: {
    (username: string, firstName: string, lastName: string, password: string, email: string): Promise<User | undefined>
  }
} => {
  const register = async (username: string, firstName: string, lastName: string, password: string, email: string): Promise<User | undefined> => {
    const user = await registerRequest(
      username, 
      firstName,
      lastName,
      password, 
      email)
    if (user)
      Cookies.set('user', JSON.stringify(user))
    return user
  }

  return { register }
}