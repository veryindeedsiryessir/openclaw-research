const state = {
  entries: [],
  q: '',
  category: 'all',
  type: 'all'
};

const els = {
  search: document.getElementById('searchInput'),
  category: document.getElementById('categoryFilter'),
  type: document.getElementById('typeFilter'),
  list: document.getElementById('entryList'),
  total: document.getElementById('statTotal'),
  shown: document.getElementById('statShown'),
  categories: document.getElementById('statCategories'),
  updated: document.getElementById('statUpdated')
};

function unique(arr) {
  return [...new Set(arr)];
}

function toDateSafe(v) {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

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

  els.categories.textContent = categories.length;
}

function filterEntries() {
  const q = state.q.trim().toLowerCase();

  return state.entries.filter((e) => {
    const matchQ = !q || [
      e.title,
      e.summary,
      e.category,
      e.source,
      ...(e.tags || [])
    ].join(' ').toLowerCase().includes(q);

    const matchCategory = state.category === 'all' || e.category === state.category;
    const matchType = state.type === 'all' || e.type === state.type;

    return matchQ && matchCategory && matchType;
  }).sort((a, b) => {
    const da = toDateSafe(a.lastUpdated)?.getTime() || 0;
    const db = toDateSafe(b.lastUpdated)?.getTime() || 0;
    return db - da;
  });
}

function badge(text) {
  return `<span class="meta">${text}</span>`;
}

function renderList() {
  const rows = filterEntries();
  els.shown.textContent = rows.length;

  const newest = rows
    .map(r => toDateSafe(r.lastUpdated))
    .filter(Boolean)
    .sort((a,b) => b - a)[0];
  els.updated.textContent = newest ? newest.toISOString().slice(0, 10) : '-';

  if (!rows.length) {
    els.list.innerHTML = `<div class="entry"><h4>No matches</h4><p>Try changing filters or search terms.</p></div>`;
    return;
  }

  els.list.innerHTML = rows.map((e) => `
    <article class="entry">
      <div class="entry-top">
        <div>
          <h4><a href="${e.url}" target="_blank" rel="noopener">${e.title}</a></h4>
          <p>${e.summary}</p>
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
      <div class="tags">
        ${(e.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </article>
  `).join('');
}

function bind() {
  els.search.addEventListener('input', (e) => {
    state.q = e.target.value;
    renderList();
  });

  els.category.addEventListener('change', (e) => {
    state.category = e.target.value;
    renderList();
  });

  els.type.addEventListener('change', (e) => {
    state.type = e.target.value;
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
