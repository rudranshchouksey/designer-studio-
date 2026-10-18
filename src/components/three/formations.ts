/**
 * Point formations for the 3D scene. Every formation is an N*3 array; point i always
 * belongs to the same "twin" (first half = ultramarine, second half = flame), so a
 * point simply travels from its slot in one shape to its slot in the next.
 *
 *  0 hero     two spheres
 *  1 services wavy 16:9 frame
 *  2 work     two interlocking rings
 *  3 process  vertical double helix (also team)
 *  4 contact  two overlapping discs (the Twinpix mark)
 */

export const STAGE_COUNT = 5;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Writer = (i: number, x: number, y: number, z: number) => void;

function make(n: number, fill: (twin: 0 | 1, j: number, half: number, rnd: () => number, put: Writer) => void, seed: number) {
  const out = new Float32Array(n * 3);
  const rnd = mulberry32(seed);
  const half = n / 2;
  const put: Writer = (i, x, y, z) => {
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  };
  for (let i = 0; i < n; i++) {
    const twin = i < half ? 0 : 1;
    fill(twin, i - twin * half, half, rnd, (_, x, y, z) => put(i, x, y, z));
  }
  return out;
}

const gauss = (rnd: () => number) => (rnd() + rnd() + rnd() - 1.5) * 0.8;

function rotate(arr: Float32Array, rx: number, ry: number) {
  const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
  for (let i = 0; i < arr.length; i += 3) {
    const x = arr[i], y = arr[i + 1], z = arr[i + 2];
    const y1 = y * cx - z * sx;
    const z1 = y * sx + z * cx;
    arr[i] = x * cy + z1 * sy;
    arr[i + 1] = y1;
    arr[i + 2] = -x * sy + z1 * cy;
  }
  return arr;
}

export function buildFormations(n: number): Float32Array[] {
  // 0 — twin spheres
  const spheres = make(
    n,
    (twin, _j, _h, rnd, put) => {
      const R = 0.88;
      const cx = twin ? 0.98 : -0.98;
      const u = rnd() * 2 - 1;
      const phi = rnd() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const r = rnd() < 0.78 ? R : R * Math.cbrt(rnd());
      put(0, cx + r * s * Math.cos(phi), r * u, r * s * Math.sin(phi));
    },
    11,
  );

  // 1 — wavy 16:9 video frame (two slightly offset layers)
  const frame = make(
    n,
    (twin, _j, _h, rnd, put) => {
      const W = 4.1, H = (W * 9) / 16;
      let x: number, y: number;
      if (rnd() < 0.3) {
        // border
        const p = rnd() * (2 * W + 2 * H);
        if (p < W) { x = p - W / 2; y = H / 2; }
        else if (p < W + H) { x = W / 2; y = H / 2 - (p - W); }
        else if (p < 2 * W + H) { x = W / 2 - (p - W - H); y = -H / 2; }
        else { x = -W / 2; y = -H / 2 + (p - 2 * W - H); }
      } else {
        x = (rnd() - 0.5) * W;
        y = (rnd() - 0.5) * H;
      }
      const z = Math.sin(x * 1.3 + 0.6) * 0.32 + Math.cos(y * 1.8) * 0.12 + (twin ? 0.12 : -0.12);
      put(0, x + (twin ? 0.07 : -0.07), y, z);
    },
    23,
  );

  // 2 — interlocking rings
  const rings = rotate(
    make(
      n,
      (twin, _j, _h, rnd, put) => {
        const R = 1.2;
        const a = rnd() * Math.PI * 2;
        const jx = gauss(rnd) * 0.09, jy = gauss(rnd) * 0.09, jz = gauss(rnd) * 0.09;
        if (twin === 0) put(0, -0.6 + R * Math.cos(a) + jx, R * Math.sin(a) + jy, jz);
        else put(0, 0.6 + R * Math.cos(a) + jx, jy, R * Math.sin(a) + jz);
      },
      37,
    ),
    0.55,
    -0.45,
  );

  // 3 — double helix with rungs
  const helix = make(
    n,
    (twin, _j, _h, rnd, put) => {
      const H = 4.6, R = 0.9, turns = 2.4, rungs = 26;
      if (rnd() < 0.82) {
        const s = rnd();
        const a = s * turns * Math.PI * 2 + twin * Math.PI;
        put(0, Math.cos(a) * R + gauss(rnd) * 0.07, (s - 0.5) * H + gauss(rnd) * 0.04, Math.sin(a) * R + gauss(rnd) * 0.07);
      } else {
        const s = Math.floor(rnd() * rungs) / rungs + 0.5 / rungs;
        const a = s * turns * Math.PI * 2 + twin * Math.PI;
        const f = rnd() * 0.5;
        put(0, Math.cos(a) * R * (1 - f) , (s - 0.5) * H + gauss(rnd) * 0.02, Math.sin(a) * R * (1 - f));
      }
    },
    41,
  );

  // 4 — the mark: two overlapping discs
  const mark = make(
    n,
    (twin, _j, _h, rnd, put) => {
      const R = 1.25;
      const a = rnd() * Math.PI * 2;
      const r = R * Math.sqrt(rnd());
      put(0, (twin ? 0.62 : -0.62) + r * Math.cos(a), r * Math.sin(a), gauss(rnd) * 0.12);
    },
    53,
  );

  return [spheres, frame, rings, helix, mark];
}

/** Random vec4 per point: x = stagger, yzw = burst direction. */
export function buildRandoms(n: number) {
  const rnd = mulberry32(99);
  const out = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    out[i * 4] = rnd();
    out[i * 4 + 1] = rnd() * 2 - 1;
    out[i * 4 + 2] = rnd() * 2 - 1;
    out[i * 4 + 3] = rnd() * 2 - 1;
  }
  return out;
}

export function buildColors(n: number) {
  const out = new Float32Array(n);
  for (let i = n / 2; i < n; i++) out[i] = 1;
  return out;
}
