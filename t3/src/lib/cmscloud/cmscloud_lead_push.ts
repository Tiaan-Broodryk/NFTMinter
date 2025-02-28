import test from "node:test";
import { Resend } from "resend";
import { db } from "~/server/db";
import { env } from "~/env";
import { render } from "~/lib/reactmail/render";
import { EmailLead } from "~/emails/lead";
import { z } from "zod";
const testdata = {
  lead: {
    dealerRef: "123M",
    dealerFloor: "USED",
    dealerSalesPerson: "",
    region: "",
    source: "AUTODEX_test",
    transactionID: "",
    extLeadRef: "",
    promotionalCode: "",
    utmParameters: "",
    countryCode: "",
    leadPostbackReference: "",
    contact: {
      title: "",
      firstName: "AutoDex",
      surname: "AutoDexTest",
      email: "john@test.com",
      officePhone: "",
      cellPhone: "0831111111",
      driversLicense: "",
      incomeBracket: "",
      preferredContactMethod: "Cellphone",
      preferredContactTime: "",
      citizenship: "South Africa",
      idNo: "",
      birthDate: "",
      gender: "",
      ethnicity: "",
      homeLanguage: "",
      residentialAddressLine1: "",
      residentialAddressLine2: "",
      residentialAddressSuburb: "",
      residentialAddressCity: "",
      residentialAddressPostalCode: "",
      residentialAddressProvince: "",
      postalAddressLine1: "",
      postalAddressLine2: "",
      postalAddressSuburb: "",
      postalAddressCity: "",
      postalAddressCode: "",
      postalAddressProvince: "",
      marketingConsent: "",
      marketingConsentPhone: "",
      marketingConsentSMS: "",
      marketingConsentEmail: "",
      marketingConsentWhatsapp: "",
      creditGrading: "",
      companyName: "",
      companyType: "",
    },
    seeks: {
      used: "",
      brand: "",
      modelrange: "",
      model: "",
      mmCode: "",
      modelCode: "",
      kms: "",
      year: "",
      colour: "",
      stockNr: "",
      price: "",
      deposit: "",
      testDrive: "0",
      tradeIn: "",
      finance: "",
      valuation: "",
      registration: "",
      special: "",
      specialBannerURL: "",
      serviceHistory: "",
      comments: "",
      vin: "",
      regno: "",
      powertrain: "",
    },
    referrer: {
      firstName: "",
      surname: "",
      email: "",
      cellPhone: "",
    },
    options: {
      stockNrIdent: "",
    },
    TradeIns: [
      {
        Make: "Mazda",
        Model: "3",
        Variant: "3 1.6 tdi",
        Year: 2018,
        Mileage: 60500,
        MMCode: null,
        IsFinanced: false,
        Price: 230500,
        FuelType: "Petrol",
        RegNo: "",
        RegistrationDate: "2020-04-26",
        BodyStyle: "",
      },
      {
        Make: "Ford",
        Model: "Figo",
        Variant: "1.4",
        Year: 2016,
        Mileage: 98500,
        MMCode: 12344321,
        IsFinanced: true,
        Price: 160500.7,
        FuelType: "Petrol",
        RegNo: "",
        RegistrationDate: "",
        BodyStyle: "",
      },
    ],
    Appointment: {
      DateOfAppointment: "2024-08-22 10:30:00",
      PartOfTheDay: "Morning",
      AppointmentType: "New car sale",
      ConsentEmail: true,
      ConsentPhone: false,
      ConsentSMS: false,
    },
    DepositReservation: {
      EnquiryType: "Online Reservation",
      OrderNo: "",
      VehicleURL: "",
      DepositStatus: "Completed",
      DepositTransactionId: "3682y14dwm8",
      DepositReservationAmount: 500.5,
      FinanceType: "Finance",
      FinanceDownPayment: 50000,
      FinanceDuration: "24",
      FinanceMonthlyFee: 9000,
      FinanceInterestType: "",
      FinanceInterestRate: "",
      FinanceMonthlyMileage: "",
    },
    UTMParams: {
      UtmSource: "google",
      UtmMedium: "ppc",
      UtmCampaign: "new cars on google search",
      UtmTerm: "sportage",
      UtmContent: "display",
      CLID: "",
    },
  },
};

export async function cmscloud_lead_push(input: {
  cmsStockNo: string;
  FirstName: string;
  Surname: string;
  Email: string;
  CellPhone: string;
  vehicleId: string;
  teamId: string;
  message: string;
}) {
  const dbc = await db();

  const cmscloud_vehicle_query = await dbc.client.query(
    /* surql */ `SELECT * FROM only cmscloud_vehicle WHERE StockNoDisplay = $StockNoDisplay LIMIT 1;`,
    { StockNoDisplay: input.cmsStockNo },
  );

  if (cmscloud_vehicle_query.length === 0) {
    return { success: false };
  }

  const cmscloud_vehicle = cmscloud_vehicle_query[0] as {
    DealershipID: string;
    DealershipName: string;
    StockNo: string;
    StockNoDisplay: string;
    Type: string;
    NewUsed: string;
    Brand: string;
    Model: string;
    ModelRange: string;
    Year: string;
    Price: string;
  };

  testdata.lead.TradeIns = [];
  //delete testdata.lead.TradeIns

  console.log(cmscloud_vehicle);
  // @ts-expect-error quick type fix
  delete testdata.lead.Appointment;
  // @ts-expect-error quick type fix
  delete testdata.lead.DepositReservation;

  testdata.lead.dealerRef = cmscloud_vehicle.DealershipID;
  testdata.lead.source = "CMH-AUTODEX";
  testdata.lead.seeks.stockNr = cmscloud_vehicle.StockNoDisplay;
  testdata.lead.dealerFloor = cmscloud_vehicle.Type; // NewUser?
  testdata.lead.seeks.used = cmscloud_vehicle.NewUsed === "Used" ? "0" : "1";
  testdata.lead.seeks.brand = cmscloud_vehicle.Brand;
  testdata.lead.seeks.modelrange = cmscloud_vehicle.ModelRange;
  testdata.lead.seeks.year = cmscloud_vehicle.Year;
  //price
  testdata.lead.seeks.price = cmscloud_vehicle.Price;
  testdata.lead.seeks.model = cmscloud_vehicle.Model;
  testdata.lead.contact.firstName = input.FirstName.split(" ")[0] ?? "";
  testdata.lead.contact.surname = input.Surname.split(" ")[1] ?? "";
  testdata.lead.contact.email = input.Email;
  testdata.lead.contact.cellPhone = input.CellPhone;

  console.log(testdata);

  // return { success: false };

  // PROD test
  const result = (await fetch(
    "https://leadsv3.cmscloud.co.za/api/lead/saveleadasync",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "A98074B7-9CEE-4EFF-AC7B-C168541A31A4",
      },
      body: JSON.stringify(testdata),
    },
  )
    .then((res) => res.json())
    .catch(console.log)) as unknown;

  console.log(result);
  const parsed = z
    .object({
      code: z.string(),
      message: z.string(),
      leadReference: z.string(),
      status: z.string(),
    })
    .safeParse(result);

  const today = new Date();
  const lead = await dbc.client.query(
    /* surrealql */ `CREATE market_vehicle_lead SET vehicle = ${input.vehicleId} , team = ${input.teamId},read = false , cms_leadReference = "${parsed.data?.leadReference}" , name = "${input.FirstName}" , email = "${input.Email}", phone = "${input.CellPhone}", message = "${input.message}", lead_date = d"${today.toISOString()}";`,
  );

  const team = await dbc.query(
    /* surrealql */ `SELECT * FROM ${input.teamId} `,
    "GetTeamMarketEmail",
    {
      skip_write: true,
    },
  );

  const teamData = team[0];
  const vehicle = await dbc.query(
    /* surrealql */ `SELECT * FROM ${input.vehicleId} `,
    "GetVehicleMarketEmail",
    {
      skip_write: true,
    },
  );
  const vehicleData = vehicle[0];
  const salesExecutives = await dbc.query(
    /* surrealql */ `SELECT * FROM sales_executive_market_page WHERE team = ${input.teamId};`,
    "GetSalesExecutivesEmail",
    {
      skip_write: true,
    },
  );
  const sales_executives_data = salesExecutives[0];
  const resend = new Resend();

  await resend.emails.send({
    from: env.RESEND_FROM,
    to: teamData[0]?.leads_email ?? "",
    subject: `New Lead on the ${vehicleData[0]?.year ?? 0} ${vehicleData[0]?.make ?? ""} ${vehicleData[0]?.model ?? ""} ${vehicleData[0]?.varient ?? ""}`,
    text: render(
      EmailLead({
        Receiver_name: teamData[0]?.company_name ?? "",
        Lead_Vehicle: `${vehicleData[0]?.year ?? 0} ${vehicleData[0]?.make ?? ""} ${vehicleData[0]?.model ?? ""} ${vehicleData[0]?.varient ?? ""}`,
        Lead_name: input.FirstName ?? "",
        Lead_email: input.Email ?? "",
        Lead_contact_number: input.CellPhone ?? "",
        Lead_message: input.message ?? "",
      }),
      {
        plainText: true,
      },
    ),
    html: render(
      EmailLead({
        Receiver_name: teamData[0]?.name ?? "",
        Lead_Vehicle: `${vehicleData[0]?.year ?? 0} ${vehicleData[0]?.make ?? ""} ${vehicleData[0]?.model ?? ""} ${vehicleData[0]?.varient ?? ""}`,
        Lead_name: input.FirstName ?? "",
        Lead_email: input.Email ?? "",
        Lead_contact_number: input.CellPhone ?? "",
        Lead_message: input.message ?? "",
      }),
      {},
    ),
  });

  const sendEmails = async () => {
    const results = await Promise.all(
      sales_executives_data
        .filter((s) => s.leadAlowed === true)
        .map(async (sales_executive) => {
          try {
            await resend.emails.send({
              from: env.RESEND_FROM,
              to: sales_executive.email,
              subject: `New Lead on the ${vehicleData[0]?.year ?? 0} ${vehicleData[0]?.make ?? ""} ${vehicleData[0]?.model ?? ""} ${vehicleData[0]?.varient ?? ""} `,
              text: render(
                EmailLead({
                  Receiver_name: sales_executive.name,
                  Lead_Vehicle: `${vehicleData[0]?.year ?? 0} ${vehicleData[0]?.make ?? ""} ${vehicleData[0]?.model ?? ""} ${vehicleData[0]?.varient ?? ""}`,
                  Lead_name: input.FirstName ?? "",
                  Lead_email: input.Email ?? "",
                  Lead_contact_number: input.CellPhone ?? "",
                  Lead_message: input.message ?? "",
                }),
                {
                  plainText: true,
                },
              ),
              html: render(
                EmailLead({
                  Receiver_name: sales_executive.name,
                  Lead_Vehicle: `${vehicleData[0]?.year ?? 0} ${vehicleData[0]?.make ?? ""} ${vehicleData[0]?.model ?? ""} ${vehicleData[0]?.varient ?? ""}`,
                  Lead_name: input.FirstName ?? "",
                  Lead_email: input.Email ?? "",
                  Lead_contact_number: input.CellPhone ?? "",
                  Lead_message: input.message ?? "",
                }),
                {},
              ),
            });
          } catch (error) {
            console.error(
              `Failed to send email to ${sales_executive.email}:`,
              error,
            );
          }
        }),
    );

    console.log("All emails have been processed:", results);
  };

  await sendEmails();

  return lead;
}
