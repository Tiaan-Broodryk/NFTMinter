import { HtmlWrapper } from "~/lib/reactmail/html";
import { Button } from "~/lib/reactmail/button";

export function BasicEmail() {
  return (
    <HtmlWrapper>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </HtmlWrapper>
  );
}
