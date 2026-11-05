const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { execFileSync } = require('node:child_process');
const { chromium } = require('../../checks/node_modules/playwright');

const options = Object.fromEntries(process.argv.slice(2).map(arg => {
  const at = arg.indexOf('=');
  if (!arg.startsWith('--') || at < 0) throw new Error('Use --ids=poc --theme=light');
  return [arg.slice(2, at), arg.slice(at + 1)];
}));
const ids = (options.ids || 'poc').split(',');
const theme = options.theme || 'light';
if (!['light', 'dark'].includes(theme)) throw new Error('Unknown theme');
const figures = JSON.parse(fs.readFileSync(path.join(__dirname, 'figures.json'), 'utf8'));
for (const id of ids) if (!Object.hasOwn(figures, id) || !/^[a-z]+$/.test(id)) throw new Error('Unknown figure: ' + id);
const out = path.join(__dirname, 'renders');
fs.mkdirSync(out, { recursive: true });
execFileSync(process.execPath, [path.join(__dirname, 'build.cjs')], {
  cwd: __dirname, env: { ...process.env, IDS: ids.join(',') }
});

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1400, height: 900 } });
    await page.goto(pathToFileURL(path.join(__dirname, theme + '.html')).href);
    await page.evaluate(() => document.fonts.ready);
    const results = [];
    for (const id of ids) {
      const plate = page.locator('#b-' + id + ' .f-plate');
      const metrics = await plate.evaluate(el => {
        const r = el.getBoundingClientRect();
        const result = { width: r.width, height: r.height };
        if (el.id === 'poc') {
          const children = [...el.querySelector('.f-steps').children].map(child => child.getBoundingClientRect());
          const hero = el.querySelector('.f-hero').getBoundingClientRect();
          result.actionCenter = (children[0].left + children[children.length - 1].right) / 2;
          result.heroCenter = hero.left + hero.width / 2;
          result.centerError = Math.abs(result.actionCenter - result.heroCenter);
        }
        return result;
      });
      if (metrics.width !== 640 || metrics.height !== 360) throw new Error('Unexpected canvas size: ' + id);
      if (id === 'poc' && metrics.centerError > 0.5) throw new Error('POC action group is not centered');
      await plate.screenshot({ path: path.join(out, id + '-' + theme + '.png') });
      results.push({ id, theme, ...metrics });
    }
    fs.writeFileSync(path.join(out, 'metrics-' + theme + '.json'), JSON.stringify(results, null, 2) + '\n');
    process.stdout.write(JSON.stringify(results) + '\n');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
