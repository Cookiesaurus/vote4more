import { Navbar, Button, Link, Text, Container, Table, Row, Image } from "@nextui-org/react";
import { useUser } from "../lib/userUser";
import { NextRouter, useRouter } from "next/router";
import LogoutButton from "./logout-btn";
import { User } from "../pages/api/auth/login";
import { ADMIN_TYPE_ID, EMPLOYEE_TYPE_ID, VOTER_TYPE_ID } from "../prisma/types";

const INDEX_PATHNAME = '/'

// function renderUserLinks(router: NextRouter, user: User | null) {
//   if (!user || router.pathname === INDEX_PATHNAME)
//     return <></>

//   // Custom Admin Routing
//   if (user.role == ADMIN_ROLE) {
//     return (
//       <Navbar.Link isActive href="accounts">Dashboard</Navbar.Link>
//     )
//   }

//   // Custom Prof Routing
//   if (user.role == PROF_ROLE) {
//     return (
//       <Navbar.Link isActive href="courses">Dashboard</Navbar.Link>
//     )
//   }
// }

// function renderGeneralLinks(router: NextRouter, user: User | null) {
//   // User is not logged in
//   if (!user || user?.isLoggedIn === false) {
//     return (
//       <Link
//         href="/student-help-form"
//         color={"text"}
//         css={{
//           fontSize: '$xl',
//           fontWeight: '$bold',
//           marginRight: '5px',
//           textDecoration: 'underline',
//           '@xsMax': {
//             color: 'Blue' // Example using Media query to alternate styles
//           }
//         }}>
//         Student Help Form
//       </Link>
//     )
//   }

//   return (
//     <></>
//   )
// }

function renderLinks(router: NextRouter, user: User | null) {

  if (user?.isLoggedIn) {
    return (
      <>
        <LogoutButton />
      </>
    )
  }

  return (
    <>
    </>
  )
}

function getRootURL(router: NextRouter, user: User | null) {
  let url = ''

  if (!user?.isLoggedIn)
    url = INDEX_PATHNAME
  else if (user.role === EMPLOYEE_TYPE_ID)
    url = '/employee/dashboard'
  else if (user.role === VOTER_TYPE_ID)
    url = '/voter/dashboard'

  return (
    <Link
      href={url}
      underline
      color={"text"}
      css={{
        fontSize: '$2xl',
        fontWeight: '$bold',
        marginRight: '5px',
        marginLeft: '6px'
      }}>
      Vote4More
    </Link>
  )
}

export default function Nav() {
  const user = useUser()
  const router = useRouter()

  return (
    <>
      <Navbar isCompact variant="sticky">
        <Navbar.Brand>
          {getRootURL(router, user)}
          <Text
            css={{
              fontStyle: 'italic'
            }}>
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          {user && user.isLoggedIn &&
            renderLinks(router, user)
          }
        </Navbar.Content>
      </Navbar>
    </>
  )
}