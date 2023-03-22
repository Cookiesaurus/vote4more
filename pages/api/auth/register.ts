import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { User } from "./login";
import { sign } from "../../../lib/jwt";
import { VOTER_TYPE_ID } from "../../../prisma/types";
const bcrypt = require('bcrypt');

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { username, firstName, lastName, password, email } = await req.body

  if (!username ||
      !firstName ||
      !lastName ||
      !password ||
      !email) {
    return res.status(400).end('Missing required fields for voter registration.')
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const userModel = await prisma.user.create({
      data: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: hash,
        email: email,
        derivedType: VOTER_TYPE_ID
      }
    })

    // console.log(userModel)

    // TODO: This the logic below is identical to the api/login jwt creation and response section

    const apiKey = await sign({ id: userModel.id }, process.env.JWT_PRIVATE_KEY)

    return res.json({
      user: {
       username: userModel.username,
       role: userModel.derivedType,
       isLoggedIn: true,
       apiKey: apiKey
      } as User      
    })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: (error as Error).message })
  }
}