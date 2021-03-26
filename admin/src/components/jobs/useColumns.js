import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "Featured",
        accessor: "Make"
      },
      {
        Header: "Model",
        accessor: "Model"
      },
      {
        Header: "Category",
        accessor: "Category"
      }
    ],
    []
  );

  return columns;
}