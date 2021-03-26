import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "Date",
        accessor: "date"
      }
    ],
    []
  );

  return columns;
}