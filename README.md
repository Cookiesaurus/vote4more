## Tasks

- Database Creation in Prisma
- User Interface
  - Individual Pages
  - Reusable Components
- Workflows
  - Ballot Manager
  - Voting Group Manager
  - Admin Dashboard (User Manager)
- RestAPI
  - CRUD
  - Login & Signup
- Logging
  - Reporting


## Tech Stack

- Node.js
- React/Next.js
- NextUI
- MySQL
- Prisma *(ORM)*

## Dependency Setup

Our project requires the installation of:

- Install [Node](https://nodejs.org/en/) (I am using 17.6.0, however the latest LTS should work too according to [here](https://nextjs.org/docs/upgrading))

  Your node installation includes the following important tools:
  - npx, used to execute packages that haven't been installed *(commonly used in generating templates)*
  - npm, a package manager that doubles to run scripts you define in your `package.json` file

- Install [MySQL](https://www.mysql.com/downloads/) (I am using version 8.26.0, anything close should work too)
  - Configure your server to run on port 3306 *(default)* and use the default `username: root` and `password: password` (This could all be omitted with MySQL being containerized in docker if it was setup)

- Install [git](https://git-scm.com/downloads) if you don't have it already. If you have Github Desktop then you should already have it. You can test this by opening a terminal and running `git --version`.

Once that is installed, we need to setup Prisma. In the project root dir, run the following:

- `npx prisma db push`, pushes the schema to the MySQL instance running
- `npx prisma generate`, generates the client-side library to match the schema in your node project
- `npx prisma db seed`, populates the database with default records

To check the validity of the last commands, open a MySQL CommandLine.

- SHOW DATABASE;
- USE vote4more:
- SHOW TABLES;
- SELECT * FROM vote4more;

Last command to start the server locally:

- npm run dev

### Project Structure

| Directory | Description |
| --- | --- |
| components | Contains re-usable components that can be used throughout the site. |
| compoentns/auth | Contains re-usable components specifically for authentification purposes. |
| lib | Contains general utilties used throughout the site. |
| pages | Contains all nevigatable endpoints a user can navigate to. |
| pages/api | Contains all RESTapi endpoints. |
| pages/api/auth | Contains all RESTapi endpoints involved with user login & registration. |
| pages/course | Contains the course page which is dynamically routed using the course id. |
| prisma | Contains the prisma schema and script for seeding the database. |
| public | Contains public assets used by the site. |
| styles | Contains all `.css` files. |
| styles/components | Contains styles for components. |
| stlyes/pages | Contains styles for pages. |

#### What Generation Does

After modifying the Prisma schema, run `npx prisma generate` to keep the generated Prisma library in sync. [read here](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/install-prisma-client-typescript-postgres)

> Ensure you drop the database entirely before seeding the database if already seeded.

#### Seeding The Database

Seeding a database will insert default data into the database. Our default data is housed within `prisma/seed.ts` and can be used by running `npx prisma db seed`. If you run this and get a *Unique constraint failed on the constraint*, the database already contains seeded records.
