import { Ballot } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { UPSERT_CODE } from "./util";
import { USER_COOKIE_NAME } from "../../lib/util";
import { User } from "./auth/login";
import { verify } from "../../lib/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    const code = req.body?.code
    if (!code)
      return res.status(400).end('Missing <code> parameter.')

    // Perform a merge where the ballot id of -1 means insert and other means update
    if (req.body?.code === UPSERT_CODE) {
      const ballot: Ballot = req.body?.ballot

      if (!ballot)
        return res.status(404).end()

      const user = JSON.parse(req.cookies[USER_COOKIE_NAME]) as User
      if (!user)
        return res.status(404).end('Missing user cookie.')
      const token = await verify(user.apiKey, process.env.JWT_PRIVATE_KEY) as { id: number, exp: number }
      
      if (!token?.id)
        return res.status(400).end('Invalid token.')
      
      await prisma.ballot.create({
        data: {
          title: ballot.title,
          location: ballot.location,
          content: Buffer.from(ballot.content),
          status: ballot.status,
          enableWriteIn: ballot.enableWriteIn,
          openingDate: ballot.openingDate,
          completionDate: ballot.completionDate,
          autoCompletionDate: ballot.autoCompletionDate,
          ownerId: token.id
        }
      })

      return res.status(200).end()
    }
  }
}