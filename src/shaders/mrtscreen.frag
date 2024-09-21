precision mediump float;

uniform vec2 u_texelSize;
uniform sampler2D texturePosition;
uniform sampler2D textureNormal;
uniform sampler2D textureColor;
uniform sampler2D textureDepth;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec4 destColor = vec4(0.0);
  vec2 uv = gl_FragCoord.st * u_texelSize * vec2(2.0, 2.0);

  if(uv.x < 1.0 && uv.y >= 1.0) {
    vec3 pos = texture(texturePosition, uv + vec2(0.0, -1.0)).xyz;
    destColor += vec4(pos, 1.0);
  }

  if(uv.x >= 1.0 && uv.y >= 1.0) {
    vec3 normal = texture(textureNormal, uv + vec2(-1.0, -1.0)).xyz;
    destColor += vec4(normal, 1.0);
  }

  if(uv.x < 1.0 && uv.y < 1.0) {
    destColor += texture(textureColor, uv);
  }

  if(uv.x >= 1.0 && uv.y < 1.0) {
    destColor += texture(textureDepth, uv + vec2(-1.0, 0.0));
  }

  fragColor = destColor;
}
