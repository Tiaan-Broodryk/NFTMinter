import { Input, Label, Select } from "~/atoms";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api, RouterInputs } from "~/utils/api";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Switch,
} from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { colors } from "tailwindcss/defaultTheme";
import moment from "moment";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import InvoiceTable from "./invoiceTable";

export default function MiscInvoice() {
  const [createOpen, setCreateOpen] = useState({ open: false });
  const router = useRouter();
  const session = useSession();

  const clients = api.client.get_clients.useQuery();

  const [form, setForm] = useState<
    RouterInputs["MiscInvoiceRouter"]["Create_invoice"]
  >({
    invoiceToId: "",
    clientName: "",
    reference: false,
    clientReference: "",
    due: moment(new Date()).toDate(),

    status: "Draft",

    issued: moment(new Date()).toDate(),

    items: [
      {
        id: "",
        amount: 0,
        description: "",
        vatable: false as unknown as boolean,
        quantity: 0,
      },
    ],
  });

  const vatRate = 15;

  const item_amount = form.items.map((item) => item.quantity * item.amount);
  const formvatrate = parseFloat(vatRate as unknown as string) / 100;
  const item_total = item_amount.reduce((a, b) => a + b, 0);
  const item_vat = form.items
    .filter((item) => item.vatable === true)
    .map((item) => item.quantity * item.amount * formvatrate)
    .reduce((a, b) => a + b, 0);

  const item_total_with_vat = item_total + item_vat;

  const CreateInvoice = api.MiscInvoiceRouter.Create_invoice.useMutation();

  const invoices = api.MiscInvoiceRouter.get_All_invoices.useQuery();

  return (
    <div className="">
      {createOpen.open === true && (
        <>
          <div className="relative z-50">
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div className="relative transform   rounded-sm bg-white p-2 text-left transition-all  data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-7xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:px-4  md:pb-4 md:pt-5 ">
                  <div className=" text-right">
                    <button
                      onClick={() =>
                        setCreateOpen({
                          ...createOpen,
                          open: false,
                        })
                      }
                      className="rounded bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <RiCloseLargeLine />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2 border-b-2 border-blue-500 p-2 text-xl font-bold text-black md:grid-cols-2 ">
                    <div className="flex gap-2">
                      <div>Create Invoice</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {" "}
                    <Label title="Invoice To">
                      <Listbox value={form.clientName}>
                        <div className="relative ">
                          <ListboxButton className="relative w-full cursor-default rounded   border border-gray-300 py-2 pl-3 pr-10 text-left text-black focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ">
                            <span className="block truncate">
                              {form.clientName}
                              {!form.clientName && <>Select Client</>}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="h-5 w-5 text-gray-400"
                              />
                            </span>
                          </ListboxButton>

                          <ListboxOptions className="absolute z-50 mt-4 max-h-60 w-full overflow-auto rounded border border-blue-600  bg-white py-1   text-base  data-[closed]:data-[leave]:opacity-0    data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm ">
                            {clients.data?.clients.map((i) => (
                              <ListboxOption
                                key={i.id.toString()}
                                value={i.id.toString()}
                                onClick={() =>
                                  setForm({
                                    ...form,
                                    invoiceToId: i.id.toString(),
                                    clientName: `${i.client_company_name} ${i.contact_name}`,
                                  })
                                }
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-black data-[focus]:bg-blue-600/50 data-[selected]:bg-neutral-200  "
                              >
                                <span className="block truncate font-normal group-data-[selected]:font-bold">
                                  {i.client_company_name} {i.contact_name}
                                </span>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-data-[focus]:text-blue-500 [.group:not([data-selected])_&]:hidden">
                                  <CheckIcon
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                  />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>
                      </Listbox>
                    </Label>
                    <Label title="Invoice Date">
                      <Input
                        value={moment(form.issued).format("YYYY-MM-DD")}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            issued: new Date(e.target.value),
                          })
                        }
                        placeholder="Invoice Date"
                        className="w-full uppercase"
                        required
                        type="date"
                      />
                    </Label>
                    <Label title="Due Date">
                      <Input
                        value={moment(form.due).format("YYYY-MM-DD")}
                        onChange={(e) =>
                          setForm({ ...form, due: new Date(e.target.value) })
                        }
                        placeholder="Invoice Date"
                        className="w-full uppercase"
                        required
                        type="date"
                      />
                    </Label>
                  </div>
                  <div>
                    <div className="mb-2 mt-2 w-full rounded-md bg-neutral-100 p-2">
                      <div className="grid grid-cols-2">
                        <div>
                          {" "}
                          <div className="font-bold">Client Reference</div>{" "}
                          <div className="text-sm text-neutral-700">
                            By selecting this function there will be a Reference
                            for the client on the invoice.
                          </div>
                        </div>
                        <div className="grid grid-cols-4">
                          <div className="col-span-3 ">
                            {form.reference === true && (
                              <>
                                <Input
                                  value={form.clientReference}
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      clientReference: e.target.value,
                                    })
                                  }
                                  placeholder="Reference"
                                  className="w-full "
                                />
                              </>
                            )}
                          </div>

                          <div className=" p-2 pl-5">
                            <div className=" w-min">
                              {" "}
                              <Switch
                                checked={form.reference as unknown as boolean}
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    reference: !form.reference,
                                  });
                                }}
                                className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 data-[checked]:bg-blue-600"
                              >
                                <span className="sr-only">Use setting</span>
                                <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
                                  >
                                    <svg
                                      fill="none"
                                      viewBox="0 0 12 12"
                                      className="h-3 w-3 text-gray-400"
                                    >
                                      <path
                                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
                                  >
                                    <svg
                                      fill="currentColor"
                                      viewBox="0 0 12 12"
                                      className="h-3 w-3 text-blue-600"
                                    >
                                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                    </svg>
                                  </span>
                                </span>
                              </Switch>
                            </div>

                            {/* <pre>{JSON.stringify(item_vat, null, 2)}</pre> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2  w-full  ">
                    <div className="grid grid-cols-1  pr-2   text-center md:grid-cols-6">
                      <div className="hidden  pt-4 font-semibold md:block">
                        Description
                      </div>

                      <div className="hidden  pt-4 font-semibold md:block">
                        Unit Price
                      </div>
                      <div className="hidden  pt-4 font-semibold md:block">
                        Qty
                      </div>
                      <div className="hidden  pt-4 font-semibold md:block">
                        Amount
                      </div>
                      <div className="hidden  pt-4 font-semibold md:block">
                        Tax
                      </div>
                      <div
                        className="mx-auto mb-2  mt-2  flex cursor-pointer overflow-hidden rounded-md bg-blue-500 hover:bg-blue-400 md:w-min"
                        onClick={() => {
                          setForm({
                            ...form,
                            items: [
                              ...form.items,
                              {
                                id: crypto.randomUUID(),
                                amount: 0,
                                description: "",
                                vatable: false as unknown as boolean,
                                quantity: 1,
                              },
                            ],
                          });
                        }}
                      >
                        <button className="   p-2 pl-4 pr-4 text-sm font-bold text-white ">
                          Add
                        </button>
                        <div className=" bg-red-950/10  p-2.5 text-center text-sm font-bold text-white">
                          <FaPlusCircle />
                        </div>
                      </div>
                    </div>
                    <div className="h-[300px] overflow-hidden rounded-lg">
                      <div className="h-[300px] overflow-y-scroll bg-neutral-200">
                        {" "}
                        {(form.items || []).map((item, i) => {
                          return (
                            <>
                              <div className="m-2 grid grid-cols-6 gap-2 rounded-md bg-white p-1">
                                <span className="">
                                  <Input
                                    className="w-full placeholder:text-center placeholder:text-black"
                                    placeholder={"e.g. parts/service"}
                                    value={item.description}
                                    onChange={(e) => {
                                      setForm({
                                        ...form,
                                        items: form.items.map((item, index) => {
                                          if (index === i) {
                                            return {
                                              ...item,
                                              description: e.target.value,
                                            };
                                          }
                                          return item;
                                        }),
                                      });
                                    }}
                                  />
                                </span>

                                <span className="">
                                  <Input
                                    type="number"
                                    className="w-full text-right placeholder:text-right placeholder:text-black"
                                    placeholder={"e.g. 100"}
                                    value={item.amount ?? 0}
                                    onChange={(e) => {
                                      setForm({
                                        ...form,
                                        items: form.items.map((item, index) => {
                                          if (index === i) {
                                            return {
                                              ...item,
                                              amount: parseFloat(
                                                e.target.value,
                                              ),
                                            };
                                          }
                                          return item;
                                        }),
                                      });
                                    }}
                                  />
                                </span>
                                <span className="">
                                  <Input
                                    type="number"
                                    className="w-full text-right placeholder:text-right placeholder:text-black"
                                    placeholder={"1"}
                                    value={item.quantity ?? 0}
                                    onChange={(e) => {
                                      setForm({
                                        ...form,
                                        items: form.items.map((item, index) => {
                                          if (index === i) {
                                            return {
                                              ...item,
                                              quantity: parseFloat(
                                                e.target.value,
                                              ),
                                            };
                                          }
                                          return item;
                                        }),
                                      });
                                    }}
                                  />
                                </span>
                                <div className="whitespace-nowrap border-r pr-1 pt-2 text-right">
                                  R
                                  {(
                                    (item.amount ?? 0) * (item.quantity ?? 0)
                                  ).toFixed(2)}
                                </div>
                                <div className=" p-2 pl-5">
                                  <div className="mx-auto w-min">
                                    {" "}
                                    <Switch
                                      checked={
                                        form.items[i]
                                          ?.vatable as unknown as boolean
                                      }
                                      onChange={(e) => {
                                        setForm({
                                          ...form,
                                          items: form.items.map(
                                            (item, index) => {
                                              if (index === i) {
                                                return {
                                                  ...item,
                                                  vatable: !item.vatable,
                                                };
                                              }

                                              return item;
                                            },
                                          ),
                                        });
                                      }}
                                      className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 data-[checked]:bg-blue-600"
                                    >
                                      <span className="sr-only">
                                        Use setting
                                      </span>
                                      <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
                                        >
                                          <svg
                                            fill="none"
                                            viewBox="0 0 12 12"
                                            className="h-3 w-3 text-gray-400"
                                          >
                                            <path
                                              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </span>
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
                                        >
                                          <svg
                                            fill="currentColor"
                                            viewBox="0 0 12 12"
                                            className="h-3 w-3 text-blue-600"
                                          >
                                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                          </svg>
                                        </span>
                                      </span>
                                    </Switch>
                                  </div>

                                  {/* <pre>{JSON.stringify(item_vat, null, 2)}</pre> */}
                                </div>

                                <div
                                  className="mx-auto mt-1 flex h-min w-min cursor-pointer overflow-hidden rounded-md bg-red-500 hover:bg-red-400"
                                  onClick={() => {
                                    form.items.filter(
                                      (item) => item.id !== form.items[i]!.id,
                                    );
                                    setForm({
                                      ...form,
                                      items: form.items.filter(
                                        (item) => item.id !== form.items[i]!.id,
                                      ),
                                    });
                                    console.log(form.items[i]);
                                  }}
                                >
                                  <button className="p-2 text-sm font-bold text-white">
                                    Remove
                                  </button>
                                  <div className="bg-gray-600/10 p-2.5 text-sm text-white">
                                    <FaTrash />
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>

                    {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
                    <div className="grid grid-cols-6 gap-2  p-2  ">
                      <div></div>
                      <div></div>
                      <div className="flex  flex-col text-right">
                        <div>Total(excl.Tax)</div>
                        <div>Tax</div>
                        <div className="font-semibold">Total</div>
                      </div>
                      <div className="flex flex-col text-right">
                        <div>{item_total.toFixed(2)}</div>
                        <div>{item_vat.toFixed(2)}</div>
                        <div>{item_total_with_vat.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md  bg-neutral-300 p-2 text-right">
                    <button
                      onClick={() => {
                        CreateInvoice.mutate(form);
                        if (CreateInvoice.isSuccess) {
                          setCreateOpen({ open: false });
                        }
                      }}
                      className="whitespace-nowrap rounded-sm bg-blue-600  p-1.5 font-bold text-white shadow-md hover:bg-blue-500 hover:shadow-lg"
                    >
                      Create Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className=" overflow-hidden rounded-md bg-white p-2 text-right">
        <button
          onClick={() =>
            setCreateOpen({
              ...createOpen,
              open: true,
            })
          }
          className="rounded-md bg-blue-500 p-2 font-bold text-white hover:bg-blue-600"
        >
          Create Invoice
        </button>
      </div>
      <div className="mt-5">
        {" "}
        <InvoiceTable />
      </div>
    </div>
  );
}
