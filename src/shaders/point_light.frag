precision mediump float;

uniform sampler2D texturePosition;
uniform sampler2D textureNormal;
uniform sampler2D textureColor;
uniform sampler2D textureDepth;
uniform vec3 pointPosition;
uniform vec4 pointColor;
uniform float pointIntensity;
uniform float pointDistance;
uniform float pointAttenuation;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec4 destColor = vec4(0.0);
  vec3 pos = texture(texturePosition, vUv).xyz;
  vec3 normal = texture(textureNormal, vUv).xyz;
  vec4 color = texture(textureColor, vUv);
  vec3 lightVector = pointPosition - pos;
  float diffuse = clamp(dot(normal, normalize(lightVector)), 0.0, 1.0);
  float attenuation = pow(clamp(1.0 - length(lightVector) / pointDistance, 0.0, 1.0), pointAttenuation);
  vec4 diffuseColor = color * (pointColor * vec4(vec3(pointIntensity * diffuse * attenuation), 1.0));

  fragColor = diffuseColor;
}
