/** Runs cb once the preloader has finished (or immediately when it is skipped). */
export function onReady(cb: () => void) {
  const root = document.documentElement;
  if (root.dataset.ready) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("twinpix:ready", handler, { once: true });
  return () => window.removeEventListener("twinpix:ready", handler);
}

export function markReady() {
  document.documentElement.dataset.ready = "1";
  window.dispatchEvent(new Event("twinpix:ready"));
}
