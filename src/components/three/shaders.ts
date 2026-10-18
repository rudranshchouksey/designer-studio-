export const vertexShader = /* glsl */ `
  uniform float uFrom;
  uniform float uTo;
  uniform float uT;
  uniform float uTime;
  uniform float uSize;
  uniform float uPx;
  uniform float uWave;
  uniform float uDrift;
  uniform float uBurst;

  attribute vec3 aP1;
  attribute vec3 aP2;
  attribute vec3 aP3;
  attribute vec3 aP4;
  attribute vec4 aRand;
  attribute float aColor;

  varying float vColor;
  varying float vShade;

  vec3 pick(float i) {
    if (i < 0.5) return position;
    if (i < 1.5) return aP1;
    if (i < 2.5) return aP2;
    if (i < 3.5) return aP3;
    return aP4;
  }

  void main() {
    vec3 a = pick(uFrom);
    vec3 b = pick(uTo);

    // per-point stagger: each point starts a little later, finishes by uT = 1
    float p = clamp((uT - aRand.x * 0.5) / 0.5, 0.0, 1.0);
    p = p * p * (3.0 - 2.0 * p);

    vec3 pos = mix(a, b, p);

    // outward burst, peaks mid-flight
    pos += normalize(aRand.yzw + 0.0001) * sin(3.14159265 * p) * uBurst * (0.45 + aRand.x);

    // living frame
    pos.z += sin(pos.x * 2.2 + uTime * 1.3 + pos.y) * 0.08 * uWave;
    pos += uDrift * 0.045 * vec3(
      sin(uTime * 0.5 + aRand.x * 40.0),
      cos(uTime * 0.4 + aRand.y * 40.0),
      sin(uTime * 0.3 + aRand.z * 40.0)
    );

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = uSize * uPx * (6.0 / -mv.z) * (0.7 + aRand.x * 0.8);
    gl_PointSize = max(1.0, floor(size + 0.5));

    vColor = aColor;
    // far points fade a little for depth
    vShade = mix(1.0, 0.4, smoothstep(5.0, 8.0, -mv.z));
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uAlpha;
  varying float vColor;
  varying float vShade;

  void main() {
    vec3 ultra = vec3(0.357, 0.357, 1.0);
    vec3 flame = vec3(1.0, 0.416, 0.239);
    // square pixel: no discard, no rounding
    gl_FragColor = vec4(mix(ultra, flame, vColor), uAlpha * vShade);
  }
`;
