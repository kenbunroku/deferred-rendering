import { WebGLMath } from "./math.js";

export function createCubeGeometry() {
  const positions = [
    // Front face
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
    // Back face
    -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
    // Top face
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
    // Bottom face
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
    // Right face
    1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
    // Left face
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
  ];

  const normals = [
    // Front face
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    // Back face
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
    // Top face
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    // Bottom face
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
    // Right face
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    // Left face
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
  ];

  const uvs = [
    // Front face
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Back face
    0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0,
    // Top face
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Bottom face
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Right face
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Left face
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
  ];

  const colors = [
    // Front face
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0,
    // Back face
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0,
    // Top face
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0,
    // Bottom face
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0,
    // Right face
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0,
    // Left face
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0,
  ];

  const indices = [
    // Front face
    0, 1, 2, 0, 2, 3,
    // Back face
    4, 5, 6, 4, 6, 7,
    // Top face
    8, 9, 10, 8, 10, 11,
    // Bottom face
    12, 13, 14, 12, 14, 15,
    // Right face
    16, 17, 18, 16, 18, 19,
    // Left face
    20, 21, 22, 20, 22, 23,
  ];

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices),
  };
}

export function createPlaneGeometry(width, height, color) {
  const w = width / 2;
  const h = height / 2;
  const pos = [-w, h, 0.0, w, h, 0.0, -w, -h, 0.0, w, -h, 0.0];
  const nor = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0];
  const col = [
    color[0],
    color[1],
    color[2],
    color[3],
    color[0],
    color[1],
    color[2],
    color[3],
    color[0],
    color[1],
    color[2],
    color[3],
    color[0],
    color[1],
    color[2],
    color[3],
  ];
  const st = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0];
  const indices = [0, 2, 1, 1, 2, 3];
  return {
    positions: new Float32Array(pos),
    normals: new Float32Array(nor),
    uvs: new Float32Array(st),
    colors: new Float32Array(col),
    indices: new Uint16Array(indices),
  };
}

export const createIcosahedron = (order = 0, uvMap = false, radius = 1) => {
  const vec3 = WebGLMath.Vec3;

  if (order > 10) throw new Error(`Max order is 10, but given ${order}.`);

  const f = (1 + Math.sqrt(5)) / 2;

  let vertices = [
    // Initial 12 vertices of an icosahedron
    -1,
    f,
    0,
    1,
    f,
    0,
    -1,
    -f,
    0,
    1,
    -f,
    0,
    0,
    -1,
    f,
    0,
    1,
    f,
    0,
    -1,
    -f,
    0,
    1,
    -f,
    f,
    0,
    -1,
    f,
    0,
    1,
    -f,
    0,
    -1,
    -f,
    0,
    1,
  ];

  let indices = [
    // Initial 20 faces of the icosahedron
    0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10,
    2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5,
    2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
  ];

  // Subdivide faces
  let subdivisions = order;
  while (subdivisions-- > 0) {
    const newIndices = [];
    const midpointCache = new Map();

    const getMidpoint = (i1, i2) => {
      // Order the indices to prevent duplicating midpoints
      const key = [Math.min(i1, i2), Math.max(i1, i2)].toString();
      if (midpointCache.has(key)) {
        return midpointCache.get(key);
      }
      const v1 = vertices.slice(i1 * 3, i1 * 3 + 3);
      const v2 = vertices.slice(i2 * 3, i2 * 3 + 3);
      const midpoint = vec3.normalize(vec3.add(v1, v2));
      vertices.push(...midpoint);
      const index = vertices.length / 3 - 1;
      midpointCache.set(key, index);
      return index;
    };

    for (let i = 0; i < indices.length; i += 3) {
      const i0 = indices[i];
      const i1 = indices[i + 1];
      const i2 = indices[i + 2];

      const a = getMidpoint(i0, i1);
      const b = getMidpoint(i1, i2);
      const c = getMidpoint(i2, i0);

      newIndices.push(i0, a, c, i1, b, a, i2, c, b, a, b, c);
    }
    indices = newIndices;
  }

  // Convert vertices to Float32Array
  vertices = new Float32Array(vertices);

  // Scale vertices to the desired radius and calculate normals
  const numVertices = vertices.length / 3;
  const normals = new Float32Array(vertices.length);
  for (let i = 0; i < numVertices; i++) {
    const x = vertices[i * 3];
    const y = vertices[i * 3 + 1];
    const z = vertices[i * 3 + 2];
    const length = Math.hypot(x, y, z);

    // Normalize position vector and scale to radius
    vertices[i * 3] = (x / length) * radius;
    vertices[i * 3 + 1] = (y / length) * radius;
    vertices[i * 3 + 2] = (z / length) * radius;

    // Normals are the normalized position vectors
    normals[i * 3] = x / length;
    normals[i * 3 + 1] = y / length;
    normals[i * 3 + 2] = z / length;
  }

  // Generate colors (optional)
  const colors = new Float32Array(numVertices * 4);
  for (let i = 0; i < numVertices; i++) {
    colors[i * 4] = 1.0; // Red
    colors[i * 4 + 1] = 1.0; // Green
    colors[i * 4 + 2] = 1.0; // Blue
    colors[i * 4 + 3] = 1.0; // Alpha
  }

  // Generate UV coordinates if requested
  let uvs = null;
  if (uvMap) {
    uvs = new Float32Array(numVertices * 2);
    for (let i = 0; i < numVertices; i++) {
      const x = normals[i * 3];
      const y = normals[i * 3 + 1];
      const z = normals[i * 3 + 2];

      const u = 0.5 + Math.atan2(z, x) / (2 * Math.PI);
      const v = 0.5 - Math.asin(y) / Math.PI;

      uvs[i * 2] = u;
      uvs[i * 2 + 1] = v;
    }

    // Fix UV seams by duplicating vertices where necessary
    const newVertices = [];
    const newNormals = [];
    const newColors = [];
    const newUVs = [];
    const newIndices = [];

    for (let i = 0; i < indices.length; i += 3) {
      const ia = indices[i];
      const ib = indices[i + 1];
      const ic = indices[i + 2];

      const uva = uvs.slice(ia * 2, ia * 2 + 2);
      const uvb = uvs.slice(ib * 2, ib * 2 + 2);
      const uvc = uvs.slice(ic * 2, ic * 2 + 2);

      const duvAB = Math.abs(uva[0] - uvb[0]);
      const duvBC = Math.abs(uvb[0] - uvc[0]);
      const duvCA = Math.abs(uvc[0] - uva[0]);

      // Check for UV seam crossing
      if (duvAB > 0.5 || duvBC > 0.5 || duvCA > 0.5) {
        // Duplicate vertices
        const indexMap = {};

        const indicesToProcess = [ia, ib, ic];
        const newFaceIndices = [];

        for (const idx of indicesToProcess) {
          if (indexMap[idx] !== undefined) {
            newFaceIndices.push(indexMap[idx]);
          } else {
            // Duplicate vertex
            const x = vertices[idx * 3];
            const y = vertices[idx * 3 + 1];
            const z = vertices[idx * 3 + 2];
            const nx = normals[idx * 3];
            const ny = normals[idx * 3 + 1];
            const nz = normals[idx * 3 + 2];
            const r = colors[idx * 4];
            const g = colors[idx * 4 + 1];
            const b = colors[idx * 4 + 2];
            const a = colors[idx * 4 + 3];
            let u = uvs[idx * 2];
            const v = uvs[idx * 2 + 1];

            // Adjust U coordinate
            if (u < 0.25) {
              u += 1.0;
            }

            const newIndex = newVertices.length / 3;
            newVertices.push(x, y, z);
            newNormals.push(nx, ny, nz);
            newColors.push(r, g, b, a);
            newUVs.push(u, v);
            indexMap[idx] = newIndex;
            newFaceIndices.push(newIndex);
          }
        }

        newIndices.push(...newFaceIndices);
      } else {
        // Use existing vertices
        newIndices.push(ia, ib, ic);
      }
    }

    // Append new vertices to existing ones
    if (newVertices.length > 0) {
      const totalVertices = vertices.length / 3 + newVertices.length / 3;
      const combinedVertices = new Float32Array(totalVertices * 3);
      combinedVertices.set(vertices);
      combinedVertices.set(new Float32Array(newVertices), vertices.length);

      const combinedNormals = new Float32Array(totalVertices * 3);
      combinedNormals.set(normals);
      combinedNormals.set(new Float32Array(newNormals), normals.length);

      const combinedColors = new Float32Array(totalVertices * 4);
      combinedColors.set(colors);
      combinedColors.set(new Float32Array(newColors), colors.length);

      const combinedUVs = new Float32Array(totalVertices * 2);
      combinedUVs.set(uvs);
      combinedUVs.set(new Float32Array(newUVs), uvs.length);

      vertices = combinedVertices;
      normals = combinedNormals;
      colors = combinedColors;
      uvs = combinedUVs;
      indices = newIndices;
    }
  }

  // Convert indices to typed array
  const IndexArrayType =
    vertices.length / 3 > 65535 ? Uint32Array : Uint16Array;
  indices = new IndexArrayType(indices);

  return {
    positions: vertices,
    normals: normals,
    colors: colors,
    uvs: uvs,
    indices: indices,
  };
};
