uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec4 tangent;

uniform sampler2D uDisplace;
uniform float uTime;
uniform vec2 uParam;

varying float vPeak;
varying vec2 vUv;
varying vec3 vNormal;
varying float vTime;
varying float vSpeed;

float displace(vec2 vUv) {
    return texture2D(uDisplace, vUv).x;
}

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec2 offsetUV = uv * 1.5 + vec2(uTime * uParam.y, 0.0);
    float displaced = texture2D(uDisplace, offsetUV).x * uParam.x;
    modelPosition.y += displaced;
    vPeak = modelPosition.y;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    vUv = uv;
    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vTime = uTime;
    vSpeed = uParam.y;
}