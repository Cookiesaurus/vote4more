/**
 * Seeding Prisma with default data: https://www.prisma.io/docs/guides/database/seed-database
 */

import { PrismaClient } from "@prisma/client"
import { EMPLOYEE_TYPE_ID, VOTER_TYPE_ID } from "./types";
const bcrypt = require('bcrypt');
const prisma = new PrismaClient()

function hashPass(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

async function main() {

  const users = await prisma.user.createMany(
    {
      data: [
        {
          id: 1,
          username: 'employee',
          firstName: 'Big',
          lastName: 'Ben',
          password: hashPass('123'),
          email: "bigben@hotmail.com",
          derivedType: EMPLOYEE_TYPE_ID,
        },
        {
          id: 2,
          username: 'tom22',
          firstName: 'Tom',
          lastName: 'Foolery',
          password: hashPass('123'),
          email: "tomfoo@hotmail.com",
          derivedType: EMPLOYEE_TYPE_ID,
        },
        {
          id: 3,
          username: 'voter',
          firstName: 'Thomas',
          lastName: 'Shelby',
          password: hashPass('123'),
          email: "gypsies@hotmail.com",
          derivedType: VOTER_TYPE_ID,
        },
        {
          id: 4,
          username: '21savage',
          firstName: '21',
          lastName: 'Savage',
          password: hashPass('123'),
          email: "21@hotmail.com",
          derivedType: VOTER_TYPE_ID,
        },
      ]
    }
  )

  // Create employee record for employees that already have a user record
  await prisma.employee.create({
    data: {
      userId: 1
    } 
  }),
  await prisma.employee.create({
    data: {
      userId: 2
    } 
  })

  // Create user record for users that alread have a user record
  await prisma.voter.create({
    data: {
      userId: 3
    }
  }),
  await prisma.voter.create({
    data: {
      userId: 4
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })