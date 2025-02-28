import fs from "fs";

export async function init_storage(output_path: string): Promise<void> {
  await fs.promises
    .mkdir(`${output_path}/querytypes`, {
      recursive: true,
    })
    .catch((err) => {
      console.error("Error creating directory", err);
    });
}

export async function read_querytypes(output_path: string): Promise<string[]> {
  return new Promise<string[]>((resolve) => {
    fs.readdir(`${output_path}/querytypes`, (err, files) => {
      resolve(files.filter((i) => i.endsWith(".ts")));
    });
  });
}
