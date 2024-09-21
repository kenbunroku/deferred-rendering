export function createDrawState(
  gl,
  { vert, frag, attributes, indices, count, offset = 0, type = gl.TRIANGLES }
) {
  const program = createProgram(gl, vert, frag);
  const uniforms = getUniformLocations(gl, program);
  const vao = createVertexArray(gl, program, attributes, indices);

  if (!count && ArrayBuffer.isView(indices)) count = indices.length;

  return {
    uniforms,
    use() {
      gl.useProgram(program);
      gl.bindVertexArray(vao);
    },
    draw() {
      if (indices) {
        gl.drawElements(type, count, gl.UNSIGNED_SHORT, offset);
        gl.bindVertexArray(null);
      } else {
        gl.drawArrays(type, offset, count);
        gl.bindVertexArray(null);
      }
    },
  };
}

function createProgram(gl, vertexSrc, fragmentSrc) {
  const vert = gl.createShader(gl.VERTEX_SHADER);
  const frag = gl.createShader(gl.FRAGMENT_SHADER);

  const pragma = `#version 300 es\n`;
  gl.shaderSource(vert, pragma + vertexSrc);
  gl.shaderSource(frag, pragma + fragmentSrc);

  gl.compileShader(vert);
  gl.compileShader(frag);

  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const progLog = gl.getProgramInfoLog(program);
    const vertLog = gl.getShaderInfoLog(vert);
    const fragLog = gl.getShaderInfoLog(frag);
    throw new Error([progLog, vertLog, fragLog].filter(Boolean).join("\n"));
  }

  gl.deleteShader(vert);
  gl.deleteShader(frag);

  return program;
}

function createVertexArray(gl, program, attributes, indices) {
  const vao = gl.createVertexArray();
  const names = Object.keys(attributes);
  gl.bindVertexArray(vao);

  for (let i = 0; i < names.length; i++) {
    let {
      size = 1,
      type = gl.FLOAT,
      normalize = false,
      stride = 0,
      offset = 0,
      buffer,
      data,
    } = attributes[names[i]];

    if (data && !buffer) buffer = createBuffer(gl, data);

    gl.bindAttribLocation(program, i, names[i]);
    gl.enableVertexAttribArray(i);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(i, size, type, normalize, stride, offset);
  }

  if (indices) {
    if (ArrayBuffer.isView(indices)) indices = createIndexBuffer(gl, indices);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
  }

  gl.bindVertexArray(null);

  return vao;
}

function createBuffer(
  gl,
  data,
  usage = gl.STATIC_DRAW,
  type = gl.ARRAY_BUFFER
) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, data, usage);
  gl.bindBuffer(type, null);
  return buffer;
}

function createIndexBuffer(gl, data, usage = gl.STATIC_DRAW) {
  return createBuffer(gl, data, usage, gl.ELEMENT_ARRAY_BUFFER);
}

function getUniformLocations(gl, program) {
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  const locations = {};
  for (let i = 0; i < numUniforms; i++) {
    const { name } = gl.getActiveUniform(program, i);
    locations[name] = gl.getUniformLocation(program, name);
  }
  return locations;
}

export function createFramebufferMRT(gl, count) {
  const frameBuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

  const fTextures = [];
  for (let i = 0; i < count; i++) {
    fTextures[i] = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, fTextures[i]);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.canvas.width,
      gl.canvas.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0 + i,
      gl.TEXTURE_2D,
      fTextures[i],
      0
    );
  }

  const depthRenderBuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
  gl.renderbufferStorage(
    gl.RENDERBUFFER,
    gl.DEPTH_COMPONENT16,
    gl.canvas.width,
    gl.canvas.height
  );
  gl.framebufferRenderbuffer(
    gl.FRAMEBUFFER,
    gl.DEPTH_ATTACHMENT,
    gl.RENDERBUFFER,
    depthRenderBuffer
  );
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  return {
    framebuffer: frameBuffer,
    renderbuffer: depthRenderBuffer,
    textures: fTextures,
  };
}
