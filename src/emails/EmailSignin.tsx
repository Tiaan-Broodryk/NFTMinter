import { Button, Section, Text } from "~/lib/reactmail/components";
import { EmailWrapper } from "./wrapper";

export const EmailSignin = (props: { url: string; host: string }) => {
  return (
    <EmailWrapper>
      <Section>
        <Button style={button} href={props.url}>
          Sign In
        </Button>

        <Text style={text}>
          If you did not request this email you can safely ignore it.
        </Text>
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
