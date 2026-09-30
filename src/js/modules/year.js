export function initYear() {
  const el = document.getElementById('anoAtual');
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}
