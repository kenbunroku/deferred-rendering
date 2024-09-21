precision mediump float;

uniform sampler2D textureColor;
uniform vec4 ambientColor;
uniform float ambientIntensity;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec4 color = texture(textureColor, vUv);
  vec4 ambient = color * clamp(ambientColor * vec4(vec3(ambientIntensity), 1.0), 0.0, 1.0);
  fragColor = ambient;
}
