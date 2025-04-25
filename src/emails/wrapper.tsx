import {
  Body,
  Container,
  Head,
  HtmlWrapper,
  Preview,
} from "~/lib/reactmail/components";
import * as React from "react";

export const EmailWrapper = (props: {
  children: React.ReactNode;
  logourl?: string;
}) => {
  return (
    <HtmlWrapper>
      <Head />
      <Preview>Nadia Accommodation Website</Preview>
      <Body style={main}>
        <Container style={container}>{props.children}</Container>
      </Body>
    </HtmlWrapper>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "25px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};
