// Captures website screenshots for the project previews.
//   npm i -D playwright && npx playwright install chromium
//   node scripts/capture-previews.mjs
// Writes public/assets/projects/<id>.png (1440×900). Re-run any time a site changes.
import { chromium } from "playwright";

const SITES = {
  alphamath: "https://alphamath-v1.vercel.app/",
  noux: "https://noax-beryl.vercel.app/",
  roan: "https://roa-nv3.vercel.app/",
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
for (const [id, url] of Object.entries(SITES)) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500); // let intro animations settle
  await page.screenshot({ path: `public/assets/projects/${id}.png` });
  console.log("saved", id);
}
await browser.close();
