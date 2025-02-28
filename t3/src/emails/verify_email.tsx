import {
  Button,
  Link,
  Section,
  Text,
  Markdown,
} from "~/lib/reactmail/components";

import { EmailWrapper } from "./wrapper";

export const EmailVerify = ({
  userFirstname,
  resetPasswordLink,
}: {
  userFirstname: string;
  resetPasswordLink: string;
}) => {
  return (
    <EmailWrapper>
      <Section>
        <Markdown
          markdownCustomStyles={{
            h1: { color: "red" },
            h2: { color: "green" },
            codeInline: { background: "grey" },
          }}
          markdownContainerStyles={{
            padding: "12px",
            border: "solid 1px black",
          }}
        >{`# Hello, World!`}</Markdown>

        {/* OR */}

        <Markdown>{`# This is a ~~strikethrough~~`}</Markdown>

        <Text style={heading}>
          Thank you for your registration. Only one more step!
        </Text>
        <Text style={text}>
          Please click to the button below for email verification.
        </Text>

        <Button style={button} href={resetPasswordLink}>
          Verify
        </Button>

        <Text style={text}>
          If you did not initiate this email do not click verify.
        </Text>
        <Text style={text}>
          See&nbsp;
          <Link style={anchor} href="https://dropbox.com">
            more security tips.
          </Link>
        </Text>
      </Section>
    </EmailWrapper>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
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
  backgroundColor: "#e43357",
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

const anchor = {
  textDecoration: "underline",
  color: "#e43357",
};
