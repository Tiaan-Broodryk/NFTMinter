import { NavButtonGroup } from "~/atoms/NavButtonGroup";

export default function HouserulesNav(props: {
  page: "english" | "afrikaans";
}) {
  return (
    <NavButtonGroup
      value={props.page}
      options={[
        {
          label: "English",
          value: "english",
          href: `../houserules/english`,
        },
        {
          label: "Afrikaans",
          value: "afrikaans",
          href: `../houserules/afrikaans`,
        },
      ]}
    />
  );
}
