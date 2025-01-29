precision mediump float;
uniform vec3 cameraPosition;
uniform float uTransparency;
uniform sampler2D uTexture;
uniform sampler2D uFlowmap;
uniform float uTiling;

varying float vPeak;
varying vec2 vUv;
varying vec3 vNormal;
varying float vTime;
varying float vSpeed;

void main()
{
    vec3 baseColor = vec3(0.1, 0.35, 1.0);
    vec3 normal = normalize(vNormal);
    vec3 lighting = vec3(0.0);

    // Lighting
    vec3 dirLight = normalize(vec3(0.5, 1.0, 0.5));
    vec3 lightColor = vec3(1.0, 0.5, 0.9);
    float dp = max(0.0, dot(dirLight, normal));

    vec3 diffuse = dp * lightColor;
    // End
    lighting = diffuse;

    // Flowmap
    vec2 flow = texture2D(uFlowmap, vUv).rg;
    flow = (flow - 0.5) * 2.0;

    float time = fract(vTime * vSpeed);
    float time_offset = fract(time + 0.5);

    float sin_singnal = abs((time - 0.5) * 2.0);

    vec2 uv = vUv * uTiling;
    vec3 c1 = texture2D(uTexture, uv + (flow * time * 2.0)).xyz;
    vec3 c2 = texture2D(uTexture, uv + (flow * time_offset * 2.0)).xyz;

    vec3 texture = mix(c1, c2, sin_singnal) * 2.0;
    // End

    vec3 color = texture * baseColor * lighting;
    color = pow(color, vec3(1.0 / 2.2));

    color *= vPeak * 1.5 + 1.0;
    color += 0.1;
    
    gl_FragColor = vec4(color, uTransparency);
}