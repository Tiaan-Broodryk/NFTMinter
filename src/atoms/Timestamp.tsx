import moment from "moment";

export function Timestamp(props: { time?: string | Date }): string {
  if (!props.time) return "-";

  return `${moment(props.time).fromNow()} ${moment(props.time).format("YYYY-MM-DD HH:mm")} `;
}
