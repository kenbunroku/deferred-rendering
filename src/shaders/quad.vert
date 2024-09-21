layout(location = 0) in vec3 a_position;
layout(location = 1) in vec2 a_uv;

out vec2 vUv;

void main() {
  vUv = vec2(a_uv.x, 1.0 - a_uv.y);
  gl_Position = vec4(a_position, 1.0);
}
