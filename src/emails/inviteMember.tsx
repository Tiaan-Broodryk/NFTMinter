import { Button, Section, Text } from "~/lib/reactmail/components";
import { EmailWrapper } from "./wrapper";

export const EmailInvite = (props: {
  url: string;

  team: string;
}) => {
  return (
    <EmailWrapper>
      <Section>
        <img src="https://www.autodex.co.za/_next/image?url=%2FAutoDex%2Flogoblack.png&w=3840&q=75" />
        <Text style={text}>Invitation to Join {props.team}</Text>
        <Button style={button} href={props.url}>
          Join Now
        </Button>
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
  backgroundColor: "#2bd102",
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
