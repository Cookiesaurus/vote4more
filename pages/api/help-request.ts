import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export const MAX_DESCRIPTION_LENGTH = 2048

export type ErrorMessage = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const email = req.body.email
    const description = req.body.description

    // Check Email
    if (!email)
      return res.status(400).json({
        message: 'Empty value for email provided.'
      })

    // Check description
    if (!description || description?.length > MAX_DESCRIPTION_LENGTH) {
      return res.status(400).json({
        message: 'Invalid value provided for description field.'
      })
    }

    const result = await prisma.studentHelpRequest.create({
      data: {
        email: email,
        description: description
      }
    })

    // Insertion Failure
    if (!result)
      return res.status(500)

    return res.status(200)
  }
}