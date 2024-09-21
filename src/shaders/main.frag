precision mediump float;
layout(location = 0) out vec4 color0;
layout(location = 1) out vec4 color1;
layout(location = 2) out vec4 color2;
layout(location = 3) out vec4 color3;

in vec4 v_position;
in vec4 v_dest;
in vec4 v_color;
in vec3 v_normal;
in float v_depth;

void main() {
  color0 = v_position;
  color1 = vec4((v_normal + 1.0) / 2.0, 1.0);
  color2 = v_color;
  color3 = vec4(vec3((v_depth + 1.0) / 2.0), 1.0);
}
