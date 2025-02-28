import packagedata from "../../package.json";
export function get_package_data() {
  return packagedata;
}

export function Version() {
  return (
    <div className="fixed -bottom-0 right-0 mb-0 select-none overflow-hidden opacity-10 transition hover:opacity-100">
      <span className="mb-0 rounded-tl-md bg-neutral-500 px-2 py-1 text-right text-xs text-black">
        {get_package_data().version}
      </span>
    </div>
  );
}
