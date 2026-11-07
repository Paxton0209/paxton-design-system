// Guideline layout lint for Figma. Read-only.
// Run with the Figma MCP `use_figma` tool; replace ROOT_ID with the page or board node ID.
// Returns { root, checked, problems } — an empty problems list means the layout parameters pass.
const ROOT_ID = 'ROOT_ID';
const REQUIRE_LANGUAGE = true; // every text bound to a Doc / Language variable
const ALLOWED = {
  fontSize: [10, 11, 13, 24, 28],
  lineHeight: [14, 17, 18, 32],
  radius: [0, 12, 16],
  itemSpacing: [0, 4, 6, 8, 10, 12, 16, 20, 24, 32, 48, 56, 64],
};
const root = await figma.getNodeByIdAsync(ROOT_ID);
if (!root) throw new Error('Node not found: ' + ROOT_ID);
const problems = [];
const add = (n, rule, detail) => problems.push({ id: n.id, name: n.name, rule, detail });
const insideIcon = (n) => {
  for (let p = n.parent; p && p !== root; p = p.parent) {
    if (p.type === 'INSTANCE' || p.type === 'COMPONENT') return true;
  }
  return false;
};
const unboundPaints = (paints, bound) =>
  Array.isArray(paints) && paints.some((p, i) => p.type === 'SOLID' && p.visible !== false && !(bound && bound[i]));
let checked = 0;
for (const n of root.findAll(() => true)) {
  checked++;
  if (n.type === 'TEXT') {
    if (n.characters.includes('·')) add(n, 'middle-dot', n.characters.slice(0, 40));
    if (REQUIRE_LANGUAGE && !(n.boundVariables && n.boundVariables.characters)) add(n, 'language-unbound', n.characters.slice(0, 40));
    for (const s of n.getStyledTextSegments(['fontSize', 'lineHeight'])) {
      if (!ALLOWED.fontSize.includes(s.fontSize)) add(n, 'font-size', s.fontSize);
      const lh = s.lineHeight.unit === 'PIXELS' ? s.lineHeight.value : null;
      if (lh === null || !ALLOWED.lineHeight.includes(lh)) add(n, 'line-height', lh);
    }
  }
  const icon = insideIcon(n);
  if (!icon && 'fills' in n && n.fills !== figma.mixed &&
      unboundPaints(n.fills, n.boundVariables && n.boundVariables.fills)) add(n, 'fill-unbound', n.type);
  if (!icon && 'strokes' in n &&
      unboundPaints(n.strokes, n.boundVariables && n.boundVariables.strokes)) add(n, 'stroke-unbound', n.type);
  if ('effects' in n && n.effects.some((e) => e.visible !== false)) add(n, 'effect', n.effects.map((e) => e.type).join(','));
  if (n !== root && n.explicitVariableModes && Object.keys(n.explicitVariableModes).length) add(n, 'theme-override', 'explicit variable mode inside the page');
  if (!icon && 'cornerRadius' in n && typeof n.cornerRadius === 'number' && !ALLOWED.radius.includes(n.cornerRadius)) add(n, 'radius', n.cornerRadius);
  if (!icon && 'layoutMode' in n && n.layoutMode !== 'NONE' && !ALLOWED.itemSpacing.includes(n.itemSpacing)) add(n, 'item-spacing', n.itemSpacing);
}
return { root: ROOT_ID, checked, problems: problems.slice(0, 200), total: problems.length };
