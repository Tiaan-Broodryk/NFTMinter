import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

//example data type
//nested data is ok, see accessorKeys in ColumnDef below
const InvoiceTable = () => {
  const router = useRouter();

  const invoices = api.MiscInvoiceRouter.get_All_invoices.useQuery();
  const data = invoices.data?.invoices ?? [];

  const columns = useMemo<MRT_ColumnDef<(typeof data)[0]>[]>(
    () => [
      // {
      //   accessorKey: "invoice_code", //access nested data with dot notation
      //   header: "Invoice Code",
      //   size: 50,
      // },
      // {
      //   accessorFn: (row) => (
      //     <>
      //       {row.invoiceToId.contact_name} {row.invoiceToId.client_company_name}
      //     </>
      //   ),
      //   header: "Client Name",
      //   size: 50,
      // },
      // {
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      //   size: 50,
      //   accessorFn: (row) => new Date(row.issued), //convert to Date for sorting and filtering
      //   id: "invoicedate",
      //   header: "Invoice Date",
      //   Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
      // },
      // {
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      //   size: 50,
      //   accessorFn: (row) => new Date(row.due), //convert to Date for sorting and filtering
      //   id: "invoiceDuedate",
      //   header: "Invoice Due Date",
      //   Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
      // },
      // {
      //   accessorKey: "status", //access nested data with dot notation
      //   header: "Status",
      //   size: 50,
      // },
      //   {
      //     accessorFn: (row) => <>
      //     {row.invoice_items.map((item) => )}
      //     </>,
      //     header: "Invoice Total",
      //     size: 50,
      //   },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableBodyRowProps: ({ row }) => ({
      // onClick: () => {
      //   router
      //     .push(
      //       `//~/miscInvoice/${row.original.id.toString().split(":")[1]}/view`,
      //     )
      //     .catch((e) => console.error(e));
      // },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
  });
  return <MaterialReactTable table={table} />;
};
export default InvoiceTable;
