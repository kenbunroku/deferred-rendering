export function hsv2rgb(h, s, v) {
  s > 1.0 ? (s = 1.0) : s;
  v > 1.0 ? (v = 1.0) : v;

  let r, g, b;

  const th = h % 360;
  let i = Math.floor(th / 60);
  let f = th / 60 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return [r, g, b];
}

export function getValue(r, g, b) {
  return ((r * 0xff) << 16) | ((g * 0xff) << 8) | ((b * 0xff) << 0);
}
