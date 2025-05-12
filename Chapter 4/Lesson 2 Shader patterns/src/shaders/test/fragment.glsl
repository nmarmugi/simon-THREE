varying vec2 vUv;

void main()
{
    // gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
    // gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0); // Pattern 1
    // gl_FragColor = vec4(vUv, 0.5, 1.0); // Pattern 2
    // gl_FragColor = vec4(vec3(vUv.x), 1.0); // Pattern 3
    // gl_FragColor = vec4(vec3(vUv.y), 1.0); // Pattern 4
    // gl_FragColor = vec4(vec3(1.0 - vUv.y), 1.0); // Pattern 5
    // gl_FragColor = vec4(vec3(vUv.y * 10.0), 1.0); // Pattern 6
    // gl_FragColor = vec4(vec3(mod(vUv.y * 10.0, 1.0)), 1.0); // Pattern 7

    // float strength = mod(vUv.y * 10.0, 1.0);
    // if (strength < 0.5) {
    //     strength = 0.0;
    // } else {
    //     strength = 1.0;
    // }
    // gl_FragColor = vec4(vec3(strength), 1.0); // Pattern 8

    // float strength = mod(vUv.y * 10.0, 1.0);
    // if (strength < 0.8) {
    //     strength = 0.0;
    // } else {
    //     strength = 1.0;
    // }
    // gl_FragColor = vec4(vec3(strength), 1.0); // Pattern 9

    // float strength = mod(vUv.x * 10.0, 1.0);
    // if (strength < 0.8) {
    //     strength = 0.0;
    // } else {
    //     strength = 1.0;
    // }
    // gl_FragColor = vec4(vec3(strength), 1.0); // Pattern 10

    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(vec3(strength), 1.0); // Pattern 11

    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(vec3(strength), 1.0); // Pattern 12

    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(vec3(strength), 1.0); // Pattern 13

    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = barX + barY;

    // gl_FragColor = vec4(vec3(strength), 1.0); // Pattern 14

    float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    float strength = barX + barY;

    gl_FragColor = vec4(vec3(strength), 1.0); // Pattern 15
}