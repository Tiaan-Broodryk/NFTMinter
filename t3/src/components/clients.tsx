import { Switch } from "@headlessui/react";

import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { Label } from "~/atoms";
import { api, RouterInputs } from "~/utils/api";

export default function Clients() {
  const createC = api.client.create.useMutation();
  const [createClientOpen, setCreateClientOpen] = useState({
    open: false,
  });
  //
  const [formC, setFormC] = useState<RouterInputs["client"]["create"]>({
    contact_name: "",
    contact_surname: "",
    contact_email: "",
    contact_phone: "",
    client_company_name: "",
    client_company_reg: "",
    client_company_vat: "",
    client_address: "",
    client_city: "",
    client_postal_code: "",
    client_company_cell: "",
    client_company_trading_name: "",
    client_is_company: false,
    client_id_no: "",
  });
  return (
    <>
      <div>
        <div className=" overflow-hidden rounded-md bg-white p-2 text-right">
          <button
            onClick={() =>
              setCreateClientOpen({
                ...createClientOpen,
                open: true,
              })
            }
            className="rounded-md bg-blue-500 p-2 font-bold text-white hover:bg-blue-600"
          >
            Create Client
          </button>
        </div>

        {createClientOpen.open === true && (
          <>
            <div className="relative z-50">
              <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                  <div className="relative transform   rounded-sm bg-white p-2 text-left transition-all  data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-7xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:px-4  md:pb-4 md:pt-5 ">
                    <div className=" text-right">
                      <button
                        onClick={() =>
                          setCreateClientOpen({
                            ...createClientOpen,
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
                        <div>Create A Client</div>
                      </div>
                    </div>
                    <div>
                      {formC.client_is_company === false && (
                        <>
                          <div className="md:p-2">
                            <div className=" border-b p-2">
                              Create New client
                            </div>

                            <div>
                              <div className=" flex gap-5 border-b p-2">
                                client Details
                                <div className="border-l pl-2">
                                  <Label
                                    title="client is a company"
                                    align="right"
                                  >
                                    <Switch
                                      checked={formC.client_is_company}
                                      onChange={(e) =>
                                        setFormC({
                                          ...formC,
                                          client_is_company: e,
                                        })
                                      }
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
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="grid grid-cols-1 gap-5 p-2 md:grid-cols-2 lg:grid-cols-4">
                                <Label title="Name">
                                  <input
                                    onChange={(e) =>
                                      setFormC({
                                        ...formC,
                                        contact_name: e.target.value,
                                      })
                                    }
                                    placeholder="Name"
                                    className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                    required
                                  />
                                </Label>
                                <Label title="Surname">
                                  <input
                                    onChange={(e) =>
                                      setFormC({
                                        ...formC,
                                        contact_surname: e.target.value,
                                      })
                                    }
                                    placeholder="Surname"
                                    className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                    required
                                  />
                                </Label>

                                <Label title="E-mail">
                                  <input
                                    onChange={(e) =>
                                      setFormC({
                                        ...formC,
                                        contact_email: e.target.value,
                                      })
                                    }
                                    placeholder="E-mail"
                                    className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  />
                                </Label>

                                <Label title="Cell">
                                  <input
                                    onChange={(e) =>
                                      setFormC({
                                        ...formC,
                                        contact_phone: e.target.value,
                                      })
                                    }
                                    placeholder="Cell"
                                    className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                    required
                                  />
                                </Label>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 p-2 md:grid-cols-2 lg:grid-cols-4">
                              <Label title="client ID No">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_id_no: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client Id No"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client City">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_city: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client City"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client Street Address">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_address: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client Street Address"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client Postal Code">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_postal_code: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client Postal Code"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                            </div>
                            <div className="  p-2  text-center md:text-right ">
                              <button
                                onClick={async () => {
                                  await createC.mutateAsync(formC);
                                  setCreateClientOpen({
                                    ...createClientOpen,
                                    open: false,
                                  });
                                }}
                                className="  ml-2  rounded-sm bg-blue-600 p-1 px-4 font-bold text-white  hover:bg-blue-500  hover:shadow-lg"
                              >
                                Create Client
                              </button>
                            </div>
                            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
                          </div>
                        </>
                      )}

                      {formC.client_is_company === true && (
                        <>
                          <div className="md:p-2">
                            <div className=" border-b p-2">
                              Create New client
                            </div>

                            <div>
                              <div className=" flex gap-5 border-b p-2">
                                client Details
                                <div className="border-l pl-2">
                                  <Label
                                    title="client is a company"
                                    align="right"
                                  >
                                    <Switch
                                      checked={formC.client_is_company}
                                      onChange={(e) =>
                                        setFormC({
                                          ...formC,
                                          client_is_company: e,
                                        })
                                      }
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
                                  </Label>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 p-2 md:grid-cols-2 lg:grid-cols-4">
                              <Label title="client Company Name">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_company_name: e.target.value,
                                    })
                                  }
                                  placeholder="client Company Name"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client Company Trading Name">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_company_trading_name:
                                        e.target.value,
                                    })
                                  }
                                  placeholder="Enter client Company Trading Name"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client Company Reg">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_company_reg: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client Company Reg"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client Vat No">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_company_vat: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client Vat No"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client Office Cell">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_company_cell: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client Office Cell"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client City">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_city: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client City"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client Street Address">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_address: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client Street Address"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                              <Label title="client Postal Code">
                                <input
                                  onChange={(e) =>
                                    setFormC({
                                      ...formC,
                                      client_postal_code: e.target.value,
                                    })
                                  }
                                  placeholder="Enter client Postal Code"
                                  className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  required
                                />
                              </Label>
                            </div>
                            <div className=" border-b p-2">
                              Contact Person Details
                            </div>
                            <div>
                              <div className="grid grid-cols-1 gap-5 p-2 md:grid-cols-2 lg:grid-cols-4">
                                <Label title="Name">
                                  <input
                                    onChange={(e) =>
                                      setFormC({
                                        ...formC,
                                        contact_name: e.target.value,
                                      })
                                    }
                                    placeholder="Name"
                                    className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                    required
                                  />
                                </Label>
                                <Label title="Surname">
                                  <input
                                    onChange={(e) =>
                                      setFormC({
                                        ...formC,
                                        contact_surname: e.target.value,
                                      })
                                    }
                                    placeholder="Surname"
                                    className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                    required
                                  />
                                </Label>

                                <Label title="E-mail">
                                  <input
                                    onChange={(e) =>
                                      setFormC({
                                        ...formC,
                                        contact_email: e.target.value,
                                      })
                                    }
                                    placeholder="E-mail"
                                    className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                  />
                                </Label>

                                <Label title="Cell">
                                  <input
                                    onChange={(e) =>
                                      setFormC({
                                        ...formC,
                                        contact_phone: e.target.value,
                                      })
                                    }
                                    placeholder="Cell"
                                    className="w-full rounded-xl border  border-neutral-300 p-1 focus:border-black focus:outline-none"
                                    required
                                  />
                                </Label>
                              </div>
                            </div>
                            <div className="  p-2  text-center md:text-right ">
                              <button
                                onClick={async () => {
                                  await createC.mutateAsync(formC);
                                  setCreateClientOpen({
                                    ...createClientOpen,
                                    open: false,
                                  });
                                }}
                                className="  ml-2  rounded-sm bg-blue-600 p-1 px-4 font-bold text-white  hover:bg-blue-500  hover:shadow-lg"
                              >
                                Create Client
                              </button>
                            </div>
                            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
