export async function CFTrace() {
  const res = await fetch(`https://www.cloudflare.com/cdn-cgi/trace`).then(
    (res) => res.text(),
  );

  const data = Object.fromEntries(
    res
      .trim()
      .split("\n")
      .map((line) => line.split("=") as [string, string]),
  );

  return data as {
    fl: string;
    h: string;
    ip: string;
    ts: string;
    visit_scheme: string;
    uag: string;
    colo: string;
    sliver: string;
    http: string;
    loc: string;
    tls: string;
    sni: string;
    warp: string;
    gateway: string;
    rbi: string;
    kex: string;
  };
}
