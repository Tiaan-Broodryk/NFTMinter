import { Button, Section, Text } from "~/lib/reactmail/components";
import { EmailWrapper } from "./wrapper";

export const EmailLead = (props: {
  Receiver_name: string;
  Lead_Listing: string;
  Lead_name: string;
  Lead_email: string;
  Lead_contact_number: string;
  Lead_message: string;
}) => {
  return (
    <EmailWrapper>
      <Section>
        {/* <img src="https://www.autodex.co.za/_next/image?url=%2FAutoDex%2FlogoNew.png&w=3840&q=75" /> */}
        <Text style={text}>
          Hey {props.Receiver_name}, you received a new lead for
          {props.Lead_Listing}
        </Text>
        <Text style={text}>Name: {props.Lead_name}</Text>
        <Text style={text}>Phone Number : {props.Lead_contact_number}</Text>
        <Text style={text}>Email : {props.Lead_email}</Text>
        <Text style={text}>Their Message:</Text>
        <Text style={text}>{props.Lead_message}</Text>
      </Section>
    </EmailWrapper>
  );
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#3638bf",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const image = {
  width: "400px",
  height: "200px",
};
