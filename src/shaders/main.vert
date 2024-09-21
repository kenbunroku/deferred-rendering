in vec3 a_position;
in vec3 a_normal;
in vec4 a_color;

uniform mat4 mvpMatrix;
uniform mat4 mMatrix;
uniform mat4 normalMatrix;

out vec4 v_position;
out vec4 v_dest;
out vec4 v_color;
out vec3 v_normal;
out float v_depth;

void main() {
  v_color = a_color;
  v_normal = (mMatrix * vec4(a_normal, 0.0)).xyz;

  vec4 pos = mvpMatrix * vec4(a_position, 1.0);
  gl_Position = pos;

  vec4 viewPos = mMatrix * vec4(a_position, 1.0);
  v_position = viewPos;
  v_depth = -viewPos.z / viewPos.w;
}
