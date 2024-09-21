import { Pane } from "tweakpane";

import { createDrawState, createFramebufferMRT } from "./utils.js";
import { createPlaneGeometry, createIcosahedron } from "./geometry.js";
import { WebGLMath } from "./math.js";
import { WebGLOrbitCamera } from "./camera.js";
import { createPointLightList } from "./light.js";
import vert from "../shaders/main.vert";
import frag from "../shaders/main.frag";
import quadVert from "../shaders/quad.vert";
import pointLightFrag from "../shaders/point_light.frag";
import ambientLightFrag from "../shaders/ambient_light.frag";
import mrtScreenFrag from "../shaders/mrtscreen.frag";

const params = {
  gbuffer: false,
};

const render = (gl, camera) => {
  const plane = createPlaneGeometry(2, 2, [0.5, 0.5, 0.5]);
  const sphere = createIcosahedron(3, false, 2);

  const sphereState = createDrawState(gl, {
    attributes: {
      a_position: { data: sphere.positions, size: 3 },
      a_normal: { data: sphere.normals, size: 3 },
      a_color: { data: sphere.colors, size: 4 },
    },
    indices: sphere.indices,
    vert: vert,
    frag: frag,
  });

  const ambientLightState = createDrawState(gl, {
    attributes: {
      a_position: { data: plane.positions, size: 3 },
      a_uv: { data: plane.uvs, size: 2 },
    },
    indices: plane.indices,
    vert: quadVert,
    frag: ambientLightFrag,
  });

  const planeState = createDrawState(gl, {
    attributes: {
      a_position: { data: plane.positions, size: 3 },
      a_uv: { data: plane.uvs, size: 2 },
    },
    indices: plane.indices,
    vert: quadVert,
    frag: pointLightFrag,
  });

  const mrtScreenState = createDrawState(gl, {
    attributes: {
      a_position: { data: plane.positions, size: 3 },
      a_uv: { data: plane.uvs, size: 2 },
    },
    indices: plane.indices,
    vert: quadVert,
    frag: mrtScreenFrag,
  });

  const lights = createPointLightList(10);

  // create framebuffer for multi render target
  const fBuffer = createFramebufferMRT(gl, 4);
  const bufferList = [
    gl.COLOR_ATTACHMENT0,
    gl.COLOR_ATTACHMENT1,
    gl.COLOR_ATTACHMENT2,
    gl.COLOR_ATTACHMENT3,
  ];

  // camera setting
  const fov = 45;
  const aspect = gl.canvas.width / gl.canvas.height;
  const near = 0.5;
  const far = 100;

  const m4 = WebGLMath.Mat4;
  const v3 = WebGLMath.Vec3;
  const rotateAxis = v3.create(0.0, 1.0, 0.0);

  return animate(gl, () => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fBuffer.framebuffer);
    gl.drawBuffers(bufferList);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const m = m4.rotate(m4.identity(), performance.now() / 1000, rotateAxis);
    const v = camera.update();
    const p = m4.perspective(fov, aspect, near, far);
    const vp = m4.multiply(p, v);
    const mvp = m4.multiply(vp, m);
    const normalMatrix = m4.transpose(m4.inverse(m));

    // sphere object
    sphereState.use();
    gl.uniform1f(sphereState.uniforms.u_time, performance.now() / 1000);
    gl.uniformMatrix4fv(sphereState.uniforms.mvpMatrix, false, mvp);
    gl.uniformMatrix4fv(sphereState.uniforms.mMatrix, false, m);
    gl.uniformMatrix4fv(sphereState.uniforms.normalMatrix, false, normalMatrix);
    sphereState.draw();

    // Clear the framebuffer before rendering lights
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (params.gbuffer) {
      mrtScreenState.use();
      gl.uniform2fv(mrtScreenState.uniforms.u_texelSize, [
        1.0 / gl.canvas.width,
        1.0 / gl.canvas.height,
      ]);
      gl.uniform1i(mrtScreenState.uniforms.texturePosition, 0);
      gl.uniform1i(mrtScreenState.uniforms.textureNormal, 1);
      gl.uniform1i(mrtScreenState.uniforms.textureColor, 2);
      gl.uniform1i(mrtScreenState.uniforms.textureDepth, 3);
      mrtScreenState.draw();
    } else {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.blendEquation(gl.FUNC_ADD);

      gl.disable(gl.DEPTH_TEST);
      gl.depthMask(false);

      // ambient light
      ambientLightState.use();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fBuffer.textures[2]);
      gl.uniform1i(ambientLightState.uniforms.textureColor, 0);
      gl.uniform4fv(
        ambientLightState.uniforms.ambientColor,
        [0.2, 0.2, 0.2, 1.0]
      );
      gl.uniform1f(ambientLightState.uniforms.ambientIntensity, 1.0);
      ambientLightState.draw();

      // point light
      for (let i = 0; i < lights.length; i++) {
        const phaseShiftFactor = (Math.PI * 2) / lights.length;
        lights[i].pos[1] = Math.cos(
          (phaseShiftFactor * i * performance.now()) / 1000
        );

        planeState.use();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, fBuffer.textures[0]);
        gl.uniform1i(planeState.uniforms.texturePosition, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, fBuffer.textures[1]);
        gl.uniform1i(planeState.uniforms.textureNormal, 1);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, fBuffer.textures[2]);
        gl.uniform1i(planeState.uniforms.textureColor, 2);
        gl.activeTexture(gl.TEXTURE3);
        gl.bindTexture(gl.TEXTURE_2D, fBuffer.textures[3]);
        gl.uniform1i(planeState.uniforms.textureDepth, 3);
        gl.uniform3fv(planeState.uniforms.pointPosition, lights[i].pos);
        gl.uniform4fv(planeState.uniforms.pointColor, lights[i].colorVec);
        gl.uniform1f(planeState.uniforms.pointIntensity, lights[i].intensity);
        gl.uniform1f(planeState.uniforms.pointDistance, lights[i].distance);
        gl.uniform1f(
          planeState.uniforms.pointAttenuation,
          lights[i].attenuation
        );
        planeState.draw();
      }
    }

    // Re-enable depth testing and writing after light passes
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);

    // Disable blending after light rendering
    gl.disable(gl.BLEND);
  });
};

window.addEventListener("load", () => {
  const { gl, camera } = setup();

  render(gl, camera);
});

window.addEventListener("resize", () => {
  const { gl, camera } = setup();

  render(gl, camera);
});

function makeCanvasFullScreen(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function setup() {
  const canvas = document.querySelector("canvas");
  makeCanvasFullScreen(canvas);
  createDebugPane();
  const cameraOption = {
    distance: 8.5,
    min: 1.0,
    max: 10.0,
    move: 2.0,
  };
  const camera = new WebGLOrbitCamera(canvas, cameraOption);
  const v3 = WebGLMath.Vec3;
  camera.setPosition(v3.create(0.0, 2.0, cameraOption.distance));

  let gl;
  try {
    gl = canvas.getContext("webgl2");
    gl.clearColor(0.02, 0.0, 0.05, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);
    return { gl, camera };
  } catch (e) {
    alert("WebGL not supported." + e);
    console.error(e);
    return;
  }
}

function animate(gl, fn) {
  let frameId = requestAnimationFrame(function draw() {
    fn();
    frameId = requestAnimationFrame(draw);
  });
  Inputs.disposal(gl.canvas).then(() => {
    cancelAnimationFrame(frameId);
    gl.getExtension("WEBGL_lose_context").loseContext();
  });
  return gl.canvas;
}

const Inputs = {
  disposal: (canvas) => {
    return new Promise((resolve) => {
      window.addEventListener("beforeunload", () => {
        resolve();
      });
    });
  },
};

const createDebugPane = () => {
  const pane = new Pane();

  pane.addBinding(params, "gbuffer").on("change", (e) => {
    params.gbuffer = e.value;
  });
};
