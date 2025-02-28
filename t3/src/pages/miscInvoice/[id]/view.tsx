import moment from "moment";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { api } from "~/utils/api";
import Image from "next/image";

export default function ViewInvoice() {
  const router = useRouter();
  const InvoiceId = router.query.id as string;
  const GetInvoice = api.MiscInvoiceRouter.get_invoice.useQuery({
    id: InvoiceId,
  });

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Invoice",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const invoiceData2 = GetInvoice.data?.invoice ?? [];

  const invoiceData = invoiceData2[0];
  const vatRate = 15;

  const item_amount = invoiceData?.invoice_items.map(
    (item) => item.quantity * item.amount,
  );
  const formvatrate = parseFloat(vatRate as unknown as string) / 100;
  const item_total = item_amount?.reduce((a, b) => a + b, 0) ?? 0;
  const item_vat =
    invoiceData?.invoice_items
      .filter((item) => item.vatable === true)
      .map((item) => item.quantity * item.amount * formvatrate)
      .reduce((a, b) => a + b, 0) ?? 0;

  const item_total_with_vat = item_total + item_vat;

  return (
    <>
      <div className="min-h-screen bg-neutral-100">
        {/* <pre>{JSON.stringify(InvoiceId, null, 2)}</pre>
          <pre>{JSON.stringify(GetInvoice, null, 2)}</pre> */}
        <div className="mb-2 border-b-2 border-blue-500 bg-neutral-300 p-2 text-right">
          {" "}
          <button
            className="ml-2  rounded-md bg-blue-600 p-1 px-4 font-bold text-white  hover:bg-blue-500  hover:shadow-lg"
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
          >
            Print
          </button>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-5 2xl:grid-cols-4">
          {" "}
          <div className="col-span-3 mt-10 hidden sm:flex lg:col-start-2">
            <div ref={contentToPrint} className="">
              <div className="font-mono">
                <div className=" bg-white p-10">
                  <div className="grid grid-cols-2">
                    <div>
                      <div className="bold text-xl uppercase text-black">
                        Nadia Accommodation
                      </div>

                      <div className="font-bold uppercase">
                        Nadia Accommodation
                      </div>
                      <div className="">
                        {/* <h2 className="text-base font-semibold leading-6 text-gray-900">
                            Invoice : {invoiceData?.invoice_code ?? 0}
                          </h2> */}
                        <h2 className=" text-base font-semibold leading-6">
                          <dt className="inline text-gray-500">Date: </dt>
                          <dd className="inline text-gray-700">
                            {moment(invoiceData?.issued).format("YYYY-MM-DD")}
                          </dd>
                        </h2>
                      </div>
                      <div className="grid grid-cols-6 pt-5 text-xs text-gray-700">
                        <div className="grid grid-cols-4">
                          <div className="col-span-3">
                            <div>
                              <div>Reg No </div>
                              <div>Vat No </div>
                            </div>
                            <div>
                              <div>Cell </div>
                              <div>City </div>
                            </div>
                            <div>
                              <div>Street </div>
                              <div>Postal </div>
                            </div>
                          </div>
                          <div>
                            <div>
                              <div> : </div>
                              <div> : </div>
                            </div>
                            <div>
                              <div> : </div>
                              <div> : </div>
                            </div>
                            <div>
                              <div> : </div>
                              <div>: </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-5">
                          <div className="info-container">
                            <div>N/A</div>
                            <div>N/A</div>
                          </div>
                          <div className="info-container">
                            <div>060 814 4291</div>
                            <div>Mossel bay</div>
                          </div>
                          <div className="info-container">
                            <div>Hartenbos</div>
                            <div>6520</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className=" grid grid-cols-1  text-gray-500">
                        <div className="rounded-md bg-neutral-600 p-2">
                          <Image
                            alt="company logo"
                            width={2000 * 4}
                            height={2000 * 4}
                            src={"/Images/Logo1.png"}
                            className=" ms-auto h-24 w-auto"
                          />
                        </div>
                      </div>
                      <div className="pt-1">
                        {/* {form.bankingDetails === "" && (
                            <>
                              <div className="rounded-md border-2 border-neutral-600 text-xs uppercase">
                                <div className="border-b-2 border-neutral-600 p-1">
                                  {" "}
                                  Banking Details
                                </div>
                                <div className="grid grid-cols-2 pl-1 pr-1 pt-1">
                                  <div>Bank:{defaultBanking?.bank}</div>

                                  <div>Branch:{defaultBanking?.branch}</div>
                                  <div>
                                    Branch Code:{defaultBanking?.branch_code}
                                  </div>
                                  <div>Account Type:{defaultBanking?.type}</div>
                                </div>
                                <div className="pb-1 pl-1">
                                  Account Number:
                                  {defaultBanking?.account_number}
                                </div>
                              </div>
                            </>
                          )} */}
                      </div>
                    </div>
                  </div>

                  <dl className=" grid grid-cols-1 gap-5 text-sm leading-6 sm:grid-cols-2">
                    <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                      <dt className="text-xs font-semibold text-gray-900">
                        I / We
                      </dt>

                      <dl className="mt-2 text-xs text-gray-500">
                        <div className="flex">
                          <dt className="font-medium text-gray-900">
                            Company Name:
                          </dt>
                          <dd>
                            {invoiceData?.invoiceToId?.client_company_name}
                            {invoiceData?.invoiceToId?.client_company_name ===
                              "" && <>{"N/A"}</>}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium text-gray-900">
                            Contact Name:
                          </dt>
                          <dd>
                            {invoiceData?.invoiceToId?.contact_name}
                            {invoiceData?.invoiceToId?.contact_name === "" &&
                              invoiceData?.invoiceToId?.contact_surname ===
                                "" && <>{"N/A"}</>}
                            {invoiceData?.invoiceToId?.contact_surname}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium text-gray-900">Email:</dt>
                          <dd>
                            {invoiceData?.invoiceToId?.contact_email}
                            {invoiceData?.invoiceToId?.contact_email === "" && (
                              <>{"N/A"}</>
                            )}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium text-gray-900">
                            Cell Phone:
                          </dt>
                          <dd>
                            {invoiceData?.invoiceToId?.client_company_cell}
                            {invoiceData?.invoiceToId?.client_company_cell ===
                              "" && <>{"N/A"}</>}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium text-gray-900">Phone:</dt>
                          <dd>
                            {invoiceData?.invoiceToId?.contact_phone}
                            {invoiceData?.invoiceToId?.contact_phone === "" && (
                              <>{"N/A"}</>
                            )}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium text-gray-900">
                            Client ID No:
                          </dt>
                          <dd>
                            {invoiceData?.invoiceToId?.client_id_no ?? "N/A"}
                            {invoiceData?.invoiceToId?.client_id_no === "" && (
                              <>{"N/A"}</>
                            )}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium text-gray-900">
                            Company Registration:
                          </dt>
                          <dd>
                            {invoiceData?.invoiceToId?.client_company_reg}
                            {invoiceData?.invoiceToId?.client_company_reg ===
                              "" && <>{"N/A"}</>}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium text-gray-900">
                            Address:
                          </dt>
                          <dd>
                            {invoiceData?.invoiceToId?.client_address}{" "}
                            {invoiceData?.invoiceToId?.client_address ===
                              "" && <>{"N/A"}</>}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium text-gray-900">
                            City and Postal Code:
                          </dt>
                          <dd>
                            {invoiceData?.invoiceToId?.client_city}{" "}
                            {invoiceData?.invoiceToId?.client_city === "" &&
                              invoiceData?.invoiceToId?.client_postal_code ===
                                "" && <>{"N/A"}</>}
                            {invoiceData?.invoiceToId?.client_postal_code}
                          </dd>
                        </div>
                      </dl>

                      {/* <dd className="mt-2 text-xs text-gray-500">
                          <span className="font-medium text-gray-900">
                            {invoiceData?.invoiceToId?.client_company_name}
                            {invoiceData?.invoiceToId?.contact_name}
                            {invoiceData?.invoiceToId?.contact_surname}
                          </span>
                          <br />
                          {invoiceData?.invoiceToId?.contact_email}
                          <br />
                          {invoiceData?.invoiceToId?.client_company_cell}
                          {invoiceData?.invoiceToId?.contact_phone}
                          <br />
                          {invoiceData?.invoiceToId?.client_id_no}
                          {invoiceData?.invoiceToId?.client_company_reg}
                          <br />
                          {invoiceData?.invoiceToId?.client_address}
                          <br />
                          {invoiceData?.invoiceToId?.client_city},
                          {invoiceData?.invoiceToId?.client_postal_code}
                        </dd> */}
                    </div>
                  </dl>

                  <div className="mt-2 grid grid-cols-4 rounded-md border-2 border-neutral-600 bg-gray-100 p-1 text-xs">
                    <div>invoice items</div>
                    <div className="text-right">item Price</div>
                    <div className="text-right">Quantity</div>
                    <div className="text-right">item Total</div>
                  </div>
                  {invoiceData?.invoice_items?.map((e) => (
                    <>
                      <div className="mt-2 grid grid-cols-4 rounded-md border-2 border-neutral-600 bg-gray-100 p-1 text-xs">
                        <div>{e.description}</div>
                        <div className="text-right">
                          R {e.amount.toFixed(2)}
                        </div>
                        <div className="text-right">{e.quantity}</div>
                        <div className="text-right">
                          R {(e.quantity * e.amount).toFixed(2)}
                        </div>
                      </div>
                    </>
                  ))}

                  <div className="mt-2 grid grid-cols-2 gap-1 text-xs ">
                    <div className="grid grid-cols-1 gap-2"></div>

                    <div className="grid grid-cols-1 gap-2">
                      <div className="grid grid-cols-2 rounded-md    border-2 border-neutral-600 bg-gray-100  text-right">
                        <div className=" p-1 py-2 text-left">Sub Total</div>
                        <div className="flex gap-2 border-l-2 border-neutral-600 p-2">
                          <div>R</div>
                          <div className="w-full text-right">
                            {item_total.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 rounded-md    border-2 border-neutral-600 bg-gray-100  text-right">
                        <div className=" p-1 py-2 text-left">VAT</div>
                        <div className="flex gap-2 border-l-2 border-neutral-600 p-2">
                          <div>R</div>
                          <div className="w-full text-right">
                            {item_vat.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 rounded-md    border-2 border-neutral-600 bg-gray-100  text-right">
                        <div className=" p-1 py-2 text-left">
                          Total Invoice vat incl
                        </div>
                        <div className="flex gap-2 border-l-2 border-neutral-600 p-2">
                          <div>R</div>
                          <div className="w-full text-right">
                            {item_total_with_vat.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* <div className="grid grid-cols-2 gap-5 pt-7">
                        <div className="border-t border-black pl-1">
                          Customer Signature
                        </div>
                        <div className="border-t border-black pl-1"></div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
