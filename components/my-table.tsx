import { Table } from "@nextui-org/react";
import Router from "next/router";

export default function MyTable({
  col,
  headerAdapter,
  rowAdapter,
  handleSelection
}: {
  col: Array<any>,
  headerAdapter: () => JSX.Element,
  rowAdapter: (acqusition: any) => JSX.Element,
  handleSelection: (key: string) => void
}) {


  const handleSelected = (e: { currentKey: string }) => {
    if (handleSelection)
      handleSelection(e.currentKey)
  }

  return (
    <Table
      selectionMode='single'
      // @ts-ignore
      onSelectionChange={handleSelected}
      shadow={false}>
      {headerAdapter()}
      <Table.Body>
        {col.map(item =>
          rowAdapter(item)
        )}
      </Table.Body>
      {col.length > 5 &&
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={5}
        />
      }
    </Table>
  )
}