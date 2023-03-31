import { useState } from "react";
import BallotMaker from "../../components/ballot/ballot-maker";
import NotLoggedIn from "../../components/error/not-logged-in";
import Layout from "../../components/layout";
import { useUser } from "../../lib/userUser";

export default function Dashboard() {
  const user = useUser()

  if (!user?.isLoggedIn)
    return NotLoggedIn()

  return (
    <Layout>
      <BallotMaker/>
    </Layout>
  )
}