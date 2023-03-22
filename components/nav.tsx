import { Navbar, Button, Link, Text, Container, Table, Row, Image } from "@nextui-org/react";
import { useUser } from "../lib/userUser";
import { NextRouter, useRouter } from "next/router";
import LogoutButton from "./logout-btn";

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

export default function Nav() {
  const user = useUser()
  const router = useRouter()

  return (
    <>      
      <Navbar isCompact variant="sticky">
        <Navbar.Brand>
          <Link
            href={INDEX_PATHNAME}
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
          <Text
            css={{
              fontStyle: 'italic'
            }}>
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          { user && user.isLoggedIn && 
            <LogoutButton/>      
          }
        </Navbar.Content>
      </Navbar>
    </>
  )
}