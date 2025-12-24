const app = document.getElementById('app');
console.log(app);

// cache: name -> { html: string, fragment?: DocumentFragment }
const pageCache = new Map();

// buscar HTML (lazy) e cachear string
async function fetchPageHtml(name) {
  const entry = pageCache.get(name);
  if (entry && entry.html) return entry.html;

  const res = await fetch(`./pages/${name}.html`);
  if (!res.ok) throw new Error(`Falha ao carregar página ${name}`);
  const html = await res.text();
  pageCache.set(name, { html });
  return html;
}

// converte string HTML pra fragment clonável
function htmlToFragment(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  return tpl.content;
}

// monta a página (parse só a primeira vez se cachear fragmento)
async function mountPage(name, { keepDom = false } = {}) {
  // feedback imediato
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.textContent = 'Carregando…';
    app.replaceChildren(spinner);


  // 1) pega/parseia HTML
  const html = await fetchPageHtml(name);

  // 2) se já houver fragmento cached (keepDom), use cloneNode
  const cache = pageCache.get(name);
  let frag;
  if (cache && cache.fragment) {
    frag = cache.fragment.cloneNode(true);
  } else {
    const content = htmlToFragment(html);
    frag = content.cloneNode(true); // instantiate
    if (keepDom) {
      // armazena fragmento base para clonagem futura (usa mais RAM)
      pageCache.set(name, { ...cache, fragment: content });
    }
  }

  // 3) monta no app
  app.replaceChildren(frag);

  // 4) importa script da página se existir (dynamic import)
  try {
    await import(`./js/${name}.js`);
  } catch (e) {
    // se não existir módulo JS da página, ignora
    // console.debug('No page script for', name);
  }
}

// prefetch leve em hover (usa requestIdleCallback quando disponível)
function prefetchOnHover(btn) {
  const name = btn.dataset.tab;
  btn.addEventListener('mouseenter', () => {
    if (pageCache.has(name)) return;
    const prefetch = () => fetchPageHtml(name).catch(()=>{/* ignore */});
    if ('requestIdleCallback' in window) requestIdleCallback(prefetch);
    else prefetch();
  }, { once: true });
}

// liga botões
document.querySelectorAll('[data-tab]').forEach(btn => {
  const name = btn.dataset.tab;
  btn.addEventListener('click', () => mountPage(name));
  prefetchOnHover(btn);
});

// inicializa com home
mountPage('browse').catch(e => { app.textContent = 'Erro ao carregar app: ' + e.message; });


