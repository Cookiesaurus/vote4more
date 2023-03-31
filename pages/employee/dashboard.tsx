import { Button } from "@nextui-org/react";
import BallotMaker from "../../components/ballot/ballot-maker";
import Layout from "../../components/layout";
import Router from "next/router";
import { useUser } from "../../lib/userUser";
import NotLoggedIn from "../../components/error/not-logged-in";

export default function Dashboard() {
  const user = useUser()

  if (!user?.isLoggedIn)
    return NotLoggedIn()

  return (
    <Layout>
      <Button
        auto
        onPress={() => {
        Router.push('/employee/create-ballot')
      }}>
        Create Ballot
      </Button>
    </Layout>
  )
}