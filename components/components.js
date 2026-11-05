/** Framework-free reference behaviors. All initialization is idempotent. */
export const TOAST_DURATION = 4000;
const initialized = new WeakMap();
const blocked = el => el.matches(':disabled,[aria-disabled="true"],.is-disabled') || !!el.closest('[inert]');
const once = (el, name) => { const set = initialized.get(el) || new Set(); if (set.has(name))
    return false; set.add(name); initialized.set(el, set); return true; };
const ms = (el, name) => { const value = getComputedStyle(el).getPropertyValue(name).trim(); return parseFloat(value) * (value.endsWith('ms') ? 1 : 1000); };
function roving(items, index, attribute, focus = true) { items.forEach((item, i) => { item.setAttribute(attribute, String(i === index)); item.tabIndex = i === index ? 0 : -1; }); if (focus)
    items[index]?.focus(); }
function direction(event, index, length) { if (event.key === 'Home')
    return 0; if (event.key === 'End')
    return length - 1; if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
    return (index + 1) % length; if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
    return (index - 1 + length) % length; return null; }
export function setButtonLoading(button, loading) { if (loading) {
    if (button.dataset.loading === 'true')
        return;
    button._dsContent = Array.from(button.childNodes);
    button._dsWidth = button.style.minWidth;
    button._dsDisabled = button.disabled;
    button.style.minWidth = `${button.getBoundingClientRect().width}px`;
    button.replaceChildren(document.createTextNode('Loading…'));
    button.disabled = true;
    button.dataset.loading = 'true';
    button.setAttribute('aria-busy', 'true');
}
else if (button.dataset.loading === 'true') {
    button.replaceChildren(...button._dsContent);
    button.style.minWidth = button._dsWidth;
    button.disabled = button._dsDisabled;
    delete button.dataset.loading;
    button.removeAttribute('aria-busy');
} }
export function initButton(el) { if (!once(el, 'button'))
    return; if (!el.classList.contains('ds-btn--icon')) {
    const originalMin = parseFloat(getComputedStyle(el).minWidth) || 0;
    const reserve = () => { if (el.dataset.loading === 'true')
        return; const style = getComputedStyle(el), ctx = document.createElement('canvas').getContext('2d'); ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`; const width = Math.max(originalMin, Math.ceil(ctx.measureText('Loading…').width + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight))); if (el.style.minWidth !== `${width}px`)
        el.style.minWidth = `${width}px`; };
    reserve();
    new ResizeObserver(reserve).observe(el);
} el.addEventListener('click', e => { if (blocked(el)) {
    e.preventDefault();
    e.stopImmediatePropagation();
} }, true); if (el.hasAttribute('data-loading'))
    setButtonLoading(el, true); }
export function initSegmented(el) { if (!once(el, 'segmented'))
    return; const items = [...el.querySelectorAll('[role=radio]')], thumb = el.querySelector('.ds-seg__thumb'); const position = () => { const selected = items.find(i => i.getAttribute('aria-checked') === 'true') || items[0]; if (!selected || !thumb)
    return; thumb.style.width = `${selected.offsetWidth}px`; thumb.style.transform = `translateX(${selected.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft)}px)`; }; const select = (item, focus) => { if (blocked(item))
    return; roving(items, items.indexOf(item), 'aria-checked', focus); position(); el.dispatchEvent(new CustomEvent('ds-change', { bubbles: true, detail: { value: item.dataset.value || item.textContent.trim() } })); }; items.forEach(item => { item.tabIndex = item.getAttribute('aria-checked') === 'true' ? 0 : -1; item.addEventListener('click', () => select(item, false)); item.addEventListener('keydown', e => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key))
    return; const enabled = items.filter(i => !blocked(i)); const next = direction(e, enabled.indexOf(item), enabled.length); if (next !== null) {
    e.preventDefault();
    select(enabled[next], true);
} }); }); if (!items.some(i => i.tabIndex === 0) && items.length)
    roving(items, 0, 'aria-checked', false); new ResizeObserver(position).observe(el); document.fonts.ready.then(position); position(); }
export function initSwitch(el) { if (!once(el, 'switch'))
    return; el.addEventListener('click', () => { if (blocked(el))
    return; el.setAttribute('aria-checked', String(el.getAttribute('aria-checked') !== 'true')); el.dispatchEvent(new Event('change', { bubbles: true })); }); const row = el.closest('.ds-switch-row'); row?.addEventListener('click', e => { if (!el.contains(e.target) && !blocked(el)) {
    el.click();
    el.focus();
} }); }
export function initSelect(el) { if (!once(el, 'select'))
    return; const trigger = el.querySelector('.ds-select'), menu = el.querySelector('.ds-menu'), items = [...menu.querySelectorAll('[role=option]')]; let open = false; const close = (restore = false) => { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); open = false; if (restore)
    trigger.focus(); }; const show = () => { if (blocked(trigger))
    return; menu.hidden = false; menu.removeAttribute('data-side'); trigger.setAttribute('aria-expanded', 'true'); open = true; const box = menu.getBoundingClientRect(), t = trigger.getBoundingClientRect(); if (box.bottom > innerHeight && t.top > innerHeight - t.bottom)
    menu.dataset.side = 'top'; (items.find(i => i.getAttribute('aria-selected') === 'true' && !blocked(i)) || items.find(i => !blocked(i)))?.focus(); }; trigger.addEventListener('click', () => open ? close() : show()); trigger.addEventListener('keydown', e => { if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    e.preventDefault();
    show();
} }); items.forEach(item => { item.tabIndex = -1; item.addEventListener('click', () => { if (blocked(item))
    return; items.forEach(i => i.setAttribute('aria-selected', String(i === item))); trigger.querySelector('[data-value]').textContent = item.querySelector('[data-label]')?.textContent || item.textContent.trim(); close(true); el.dispatchEvent(new CustomEvent('ds-change', { bubbles: true, detail: { value: item.dataset.value || item.textContent.trim() } })); }); item.addEventListener('keydown', e => { const enabled = items.filter(i => !blocked(i)); const next = direction(e, enabled.indexOf(item), enabled.length); if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
    e.preventDefault();
    enabled[next]?.focus();
} if (e.key === 'Escape') {
    e.preventDefault();
    close(true);
} if (e.key === 'Tab')
    close(); }); }); document.addEventListener('pointerdown', e => { if (open && !el.contains(e.target))
    close(); }); el.addEventListener('focusout', () => queueMicrotask(() => { if (open && !el.contains(document.activeElement))
    close(); })); }
export function initField(el) { if (!once(el, 'field'))
    return; const input = el.querySelector('.ds-input'); if (input?.getAttribute('aria-invalid') === 'true') {
    const hint = el.querySelector('.ds-field__hint');
    if (hint) {
        hint.id ||= `ds-hint-${crypto.randomUUID()}`;
        input.setAttribute('aria-describedby', hint.id);
    }
} }
export function initCheckbox(el) { if (!once(el, 'checkbox'))
    return; const input = el.querySelector('input'); if (input && el.hasAttribute('data-indeterminate'))
    input.indeterminate = true; if (el.matches('.is-disabled,[aria-disabled=true]') && input)
    input.disabled = true; }
export function initRadio(el) { if (!once(el, 'radio'))
    return; const input = el.querySelector('input'); if (el.matches('.is-disabled,[aria-disabled=true]') && input)
    input.disabled = true; }
export function initSlider(el) { if (!once(el, 'slider'))
    return; const input = el.querySelector('input'), output = el.querySelector('output'), fill = el.querySelector('.ds-slider__fill'), thumb = el.querySelector('.ds-slider__thumb'); const update = () => { const min = Number(input.min || 0), max = Number(input.max || 100), fraction = (input.valueAsNumber - min) / (max - min); if (output)
    output.value = input.value; if (fill)
    fill.style.transform = `scaleX(${fraction})`; if (thumb)
    thumb.style.transform = `translate(${fraction * (input.clientWidth - thumb.offsetWidth)}px,-50%)`; }; if (el.matches('.is-disabled,[aria-disabled=true]'))
    input.disabled = true; input.addEventListener('input', update); new ResizeObserver(update).observe(input); update(); }
export function initTabs(el) { if (!once(el, 'tabs'))
    return; const items = [...el.querySelectorAll('[role=tab]')]; const select = (item, focus) => { if (blocked(item))
    return; roving(items, items.indexOf(item), 'aria-selected', focus); items.forEach(i => { const panel = document.getElementById(i.getAttribute('aria-controls')); if (panel)
    panel.hidden = i !== item; }); }; items.forEach(item => { item.tabIndex = item.getAttribute('aria-selected') === 'true' ? 0 : -1; item.addEventListener('click', () => select(item, false)); item.addEventListener('keydown', e => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key))
    return; const enabled = items.filter(i => !blocked(i)); const next = direction(e, enabled.indexOf(item), enabled.length); if (next !== null) {
    e.preventDefault();
    select(enabled[next], true);
} }); }); }
function initDisabledLink(el, name) { if (!once(el, name))
    return; el.addEventListener('click', e => { if (blocked(el))
    e.preventDefault(); }); if (blocked(el))
    el.tabIndex = -1; }
export function initRow(el) { initDisabledLink(el, 'row'); }
export function initCard(el) { initDisabledLink(el, 'card'); }
export function initPanel(el) { once(el, 'panel'); }
export function initTooltip(el) { if (!once(el, 'tooltip'))
    return; const tip = document.getElementById(el.getAttribute('aria-describedby')); if (!tip)
    return; let timer; const show = () => { if (blocked(el))
    return; tip.hidden = false; const rect = el.getBoundingClientRect(), box = tip.getBoundingClientRect(), gap = parseFloat(getComputedStyle(el).getPropertyValue('--ds-space-4')); tip.style.left = `${Math.max(gap, Math.min(innerWidth - box.width - gap, rect.left + (rect.width - box.width) / 2))}px`; tip.style.top = `${rect.top - box.height - gap >= 0 ? rect.top - box.height - gap : rect.bottom + gap}px`; }; const hide = () => { clearTimeout(timer); tip.hidden = true; }; el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && matchMedia('(hover:hover) and (pointer:fine)').matches)
    timer = setTimeout(show, ms(el, '--ds-motion-delay')); }); el.addEventListener('pointerleave', hide); el.addEventListener('focus', () => { if (el.matches(':focus-visible'))
    show(); }); el.addEventListener('blur', hide); el.addEventListener('keydown', e => { if (e.key === 'Escape')
    hide(); }); window.addEventListener('scroll', () => { hide(); if (el.matches(':hover') && matchMedia('(hover:hover) and (pointer:fine)').matches)
    timer = setTimeout(show, ms(el, '--ds-motion-delay')); }, { passive: true }); }
export function initDialog(el) { if (!once(el, 'dialog'))
    return; let opener; document.querySelectorAll(`[data-dialog-open="${el.id}"]`).forEach(trigger => trigger.addEventListener('click', () => { if (blocked(trigger))
    return; opener = trigger; el.showModal(); el.querySelector('button:not(:disabled),[href],input:not(:disabled),[tabindex="0"]')?.focus(); })); el.querySelectorAll('[data-dialog-close]').forEach(button => button.addEventListener('click', () => el.close())); el.addEventListener('close', () => opener?.focus()); }
export function initToast(el) { if (!once(el, 'toast'))
    return; if (el.hasAttribute('data-preview'))
    return; let remaining = TOAST_DURATION, started, timer; const reasons = new Set(); const resume = () => { if (reasons.size)
    return; started = performance.now(); timer = setTimeout(() => el.remove(), remaining); }; const pause = reason => { if (!reasons.size) {
    clearTimeout(timer);
    remaining -= performance.now() - started;
} reasons.add(reason); }; el.addEventListener('pointerenter', () => pause('pointer')); el.addEventListener('pointerleave', () => { reasons.delete('pointer'); resume(); }); el.addEventListener('focusin', () => pause('focus')); el.addEventListener('focusout', () => queueMicrotask(() => { if (!el.contains(document.activeElement)) {
    reasons.delete('focus');
    resume();
} })); resume(); }
export function showToast(message, { container = document.body, error = false, action } = {}) { let stack = container.querySelector(':scope > .ds-toast-stack'); if (!stack) {
    stack = document.createElement('div');
    stack.className = 'ds-toast-stack';
    container.append(stack);
} while (stack.children.length >= 3)
    stack.firstElementChild.remove(); const toast = document.createElement('div'); toast.className = 'ds-toast'; toast.setAttribute('role', error ? 'alert' : 'status'); if (error) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'ds-icon');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', 'm12 3 10 18H2Z M12 9v4m0 4h.01');
    svg.append(path);
    toast.append(svg);
} const text = document.createElement('span'); text.textContent = message; toast.append(text); if (action) {
    const button = document.createElement('button');
    button.className = 'ds-btn ds-btn--text';
    button.textContent = action.label;
    button.addEventListener('click', () => { action.onClick?.(); toast.remove(); });
    toast.append(button);
} stack.append(toast); initToast(toast); return toast; }
export function initEmpty(el) { if (!once(el, 'empty'))
    return; const rect = el.querySelector('rect'); const update = () => { if (rect) {
    const radius = parseFloat(getComputedStyle(el).borderRadius);
    rect.setAttribute('rx', radius);
    rect.setAttribute('x', '.5');
    rect.setAttribute('y', '.5');
    rect.setAttribute('width', Math.max(0, el.clientWidth - 1));
    rect.setAttribute('height', Math.max(0, el.clientHeight - 1));
} }; new ResizeObserver(update).observe(el); update(); }
export function initSkeleton(el) { if (!once(el, 'skeleton'))
    return; el.setAttribute('aria-hidden', 'true'); }
export function initLink(el) { initDisabledLink(el, 'link'); }
export function initChip(el) { initDisabledLink(el, 'chip'); }
export function initTag(el) { once(el, 'tag'); }
export function init(root = document) { root.querySelectorAll('[data-ds]').forEach(el => { for (const name of el.dataset.ds.split(/\s+/)) {
    const fn = initializers[name];
    fn?.(el);
} }); }
const initializers = { button: initButton, segmented: initSegmented, switch: initSwitch, select: initSelect, field: initField, checkbox: initCheckbox, radio: initRadio, slider: initSlider, tabs: initTabs, row: initRow, card: initCard, panel: initPanel, tooltip: initTooltip, dialog: initDialog, toast: initToast, empty: initEmpty, skeleton: initSkeleton, link: initLink, tag: initTag, chip: initChip };
init();
