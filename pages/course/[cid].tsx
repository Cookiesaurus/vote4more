import { useEffect } from "react";
import Acquisitions from "../../components/acqusitions";
import Layout from "../../components/layout";
import StandardLayout from "../../components/standard-layout";
import { get } from "../../lib/fetch-wrapper";
import Router, { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { AcquisitionAttempt, Student } from "@prisma/client";
import { Course as CourseModel } from "@prisma/client";
import { Table } from "@nextui-org/react";
import superjson from 'superjson';
import Students from "../../components/students";
import { useUser } from "../../lib/userUser";
import NotLoggedIn from "../../components/error/not-logged-in";

export async function getServerSideProps({ params }: { params: { cid: string } }) {
  const result = await prisma.course.findUnique({
    where: {
      id: parseInt(params.cid)
    },
    include: {
      acquisitions: {
        where: {
          status: false
        }
      },
      students: true
    }
  })

  return {
    props: {
      data: superjson.serialize(result)
    }, // will be passed to the page component as props
  }
}

export default function Course({ data }) {
  const user = useUser()

  if (!user?.isLoggedIn)
    return <NotLoggedIn/>

  /**
   * Using https://github.com/blitz-js/superjson#using-with-nextjs because serialization of the `Date` type 
   * using the default JSON library is not supported
   */
  const course = superjson.deserialize<CourseModel & {
    acquisitions: AcquisitionAttempt[];
    students: Student[];
  }>(data)

  return (
    <Layout>
      <StandardLayout
        topLeft={
          <Acquisitions
            title="Recent Failed Acquisitions"
            acquisitions={course.acquisitions}
            headerAdapter={() => {
              return (
                <Table.Header>
                  <Table.Column>Id</Table.Column>
                  <Table.Column>Http Code</Table.Column>
                  <Table.Column>Start</Table.Column>
                  <Table.Column>Finish</Table.Column>
                </Table.Header>
              )
            }}
            rowAdapter={(v: AcquisitionAttempt) => {
              return (
                <Table.Row key={v.id}>
                  <Table.Cell>{v.id}</Table.Cell>
                  <Table.Cell>{v.http_code}</Table.Cell>
                  <Table.Cell>{v.start_time.toUTCString()}</Table.Cell>
                  <Table.Cell>{v.finished_time.toUTCString()}</Table.Cell>
                </Table.Row>
              )
            }}
          />}
        topRight={<p>Export Component</p>}
        bottom={
          <Students
            handleSelection={(key: string) => {
              Router.push(`../student/${key}`)
            }}
            title="Students"            
            students={course.students}
            headerAdapter={() => {
              return (
                <Table.Header>
                  <Table.Column>Id</Table.Column>
                  <Table.Column>Email</Table.Column>
                  <Table.Column>First, Last</Table.Column>
                </Table.Header>
              )
            }}
            rowAdapter={(v: Student) => {
              return (
                <Table.Row key={v.id}>
                  <Table.Cell>{v.id}</Table.Cell>
                  <Table.Cell>{v.email}</Table.Cell>
                  <Table.Cell>{`${v.first_name}, ${v.last_name}`}</Table.Cell>
                </Table.Row>
              )
            }}
          />
        }
      />
    </Layout>
  )
}