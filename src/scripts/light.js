import { hsv2rgb } from "./color";

function createPointLight(pos, color, intensity, distance, attenuation) {
  return {
    pos: new Float32Array(pos),
    intensity: intensity,
    distance: distance,
    attenuation: attenuation,
    colorVec: new Float32Array([color[0], color[1], color[2], 1.0]),
  };
}

export function createPointLightList(numOfLights) {
  const lights = [];
  const rad = Math.PI / 180;
  const phaseShiftFactor = (Math.PI * 2) / numOfLights;

  for (let i = 0; i < numOfLights; i++) {
    const hue = (360 / numOfLights) * i;
    const lightColor = hsv2rgb(hue, 1, 1);
    const theta = (360 / numOfLights) * i * rad;
    const lightPos = [
      2 * Math.cos(theta),
      Math.cos(phaseShiftFactor * i),
      2 * Math.sin(theta),
    ];
    lights.push(createPointLight(lightPos, lightColor, 1.0, 3.0, 2.0));
  }

  return lights;
}
