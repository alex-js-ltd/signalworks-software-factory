import { readdir, readFile } from "node:fs/promises";

const runsUrl = new URL("../fixtures/runs/", import.meta.url);
const files = (await readdir(runsUrl))
  .filter((file) => file.endsWith(".json"))
  .sort();

for (const file of files) {
  const run = JSON.parse(await readFile(new URL(file, runsUrl), "utf8"));
  console.log(`${run.workOrderId}: ${run.issue.title} [${run.outcome}]`);

  for (const [index, event] of run.events.entries()) {
    const step = String(index + 1).padStart(2, "0");
    const station = event.station.toUpperCase().padEnd(12);
    console.log(`${step} ${station} ${event.status}`);
    console.log(`   ${event.summary}`);
  }

  console.log();
}
