const state = {
  entries: [],
  q: '',
  category: 'all',
  type: 'all',
  sort: 'updated-desc'
};

const els = {
  search: document.getElementById('searchInput'),
  category: document.getElementById('categoryFilter'),
  type: document.getElementById('typeFilter'),
  sort: document.getElementById('sortFilter'),
  clear: document.getElementById('clearFiltersBtn'),
  quick: document.getElementById('quickCategories'),
  list: document.getElementById('entryList'),
  hint: document.getElementById('resultHint'),
  total: document.getElementById('statTotal'),
  shown: document.getElementById('statShown'),
  categories: document.getElementById('statCategories'),
  updated: document.getElementById('statUpdated')
};

function unique(arr) { return [...new Set(arr)]; }
function toDateSafe(v) { const d = new Date(v); return Number.isNaN(d.getTime()) ? null : d; }
function esc(s = '') { return s.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

function renderFilters() {
  const categories = unique(state.entries.map(e => e.category)).sort();
  const types = unique(state.entries.map(e => e.type)).sort();

  for (const c of categories) {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    els.category.appendChild(opt);
  }
  for (const t of types) {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    els.type.appendChild(opt);
  }

  els.quick.innerHTML = ['all', ...categories].map((c) =>
    `<button class="chip ${c === 'all' ? 'active' : ''}" data-category="${c}">${c === 'all' ? 'All' : c}</button>`
  ).join('');

  els.quick.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-category]');
    if (!btn) return;
    state.category = btn.dataset.category;
    els.category.value = state.category;
    renderList();
  });

  els.categories.textContent = categories.length;
}

function scoreQuery(entry, q) {
  if (!q) return 0;
  const hay = `${entry.title} ${entry.summary} ${entry.category} ${entry.source} ${(entry.tags || []).join(' ')}`.toLowerCase();
  return hay.includes(q) ? 1 : 0;
}

function filterEntries() {
  const q = state.q.trim().toLowerCase();

  let rows = state.entries.filter((e) => {
    const matchQ = !q || scoreQuery(e, q) > 0;
    const matchCategory = state.category === 'all' || e.category === state.category;
    const matchType = state.type === 'all' || e.type === state.type;
    return matchQ && matchCategory && matchType;
  });

  rows.sort((a, b) => {
    const da = toDateSafe(a.lastUpdated)?.getTime() || 0;
    const db = toDateSafe(b.lastUpdated)?.getTime() || 0;
    switch (state.sort) {
      case 'updated-asc': return da - db;
      case 'title-asc': return a.title.localeCompare(b.title);
      case 'impact-desc': {
        const weight = { High: 3, Medium: 2, Low: 1 };
        return (weight[b.impact] || 0) - (weight[a.impact] || 0) || (db - da);
      }
      case 'updated-desc':
      default: return db - da;
    }
  });

  return rows;
}

function badge(text) { return `<span class="meta">${esc(text)}</span>`; }

function renderList() {
  const rows = filterEntries();
  els.shown.textContent = rows.length;

  const newest = rows.map(r => toDateSafe(r.lastUpdated)).filter(Boolean).sort((a, b) => b - a)[0];
  els.updated.textContent = newest ? newest.toISOString().slice(0, 10) : '-';

  els.hint.textContent = `Showing ${rows.length} of ${state.entries.length} entries`;

  [...els.quick.querySelectorAll('.chip')].forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.category === state.category);
  });

  if (!rows.length) {
    els.list.innerHTML = `<div class="entry"><h4>No matches</h4><p>Try changing filters or search terms.</p></div>`;
    return;
  }

  els.list.innerHTML = rows.map((e) => `
    <article class="entry">
      <div class="entry-top">
        <div>
          <h4><a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.title)}</a></h4>
          <p>${esc(e.summary)}</p>
        </div>
      </div>
      <div class="entry-meta">
        ${badge(e.category)}
        ${badge(e.type)}
        ${badge(e.source)}
        ${badge(e.difficulty || 'n/a')}
        ${badge(e.impact || 'n/a')}
        ${badge(`Updated ${e.lastUpdated || '-'}`)}
      </div>
      <div class="tags">${(e.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    </article>
  `).join('');
}

function bind() {
  els.search.addEventListener('input', (e) => { state.q = e.target.value; renderList(); });
  els.category.addEventListener('change', (e) => { state.category = e.target.value; renderList(); });
  els.type.addEventListener('change', (e) => { state.type = e.target.value; renderList(); });
  els.sort.addEventListener('change', (e) => { state.sort = e.target.value; renderList(); });
  els.clear.addEventListener('click', () => {
    state.q = '';
    state.category = 'all';
    state.type = 'all';
    state.sort = 'updated-desc';
    els.search.value = '';
    els.category.value = 'all';
    els.type.value = 'all';
    els.sort.value = 'updated-desc';
    renderList();
  });
}

async function init() {
  try {
    const res = await fetch('./data/library.json');
    const data = await res.json();
    state.entries = Array.isArray(data) ? data : [];

    els.total.textContent = state.entries.length;
    renderFilters();
    bind();
    renderList();
  } catch (err) {
    els.list.innerHTML = `<div class="entry"><h4>Failed to load library data</h4><p>${String(err)}</p></div>`;
  }
}

init();
