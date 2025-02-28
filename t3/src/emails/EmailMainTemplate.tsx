import { Markdown, Section } from "~/lib/reactmail/components";
import { EmailWrapper } from "./wrapper";

export const EmailMainTemplate = (props: {
  logourl?: string;
  contents?: string;
}) => {
  return (
    <EmailWrapper logourl={props.logourl}>
      <Section>
        <Markdown>{props.contents ?? ""}</Markdown>
      </Section>
    </EmailWrapper>
  );
};
