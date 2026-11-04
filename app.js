var vertexshaderText= [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    '',
    'void main() {',
    '    gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join("\n");
 
var fragmentShaderText = [
    'precision mediump float;',
    '',
    'void main(){',
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
    '}',

].join("\n");

var initDemo = function() {
    console.log("this is working");

    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("WebGL is not supported, using experemental.");
        return;
    }
    if (!gl) {
        alert("your browser duse not suport webGL.");
    }

    gl.clearColor(0.5, 0.0, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //
    //creates shaders
    //
    var vertexshader =  gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSourse(vertexshader, vertexshaderText);
    gl.shaderSourse(fragmentShader, fragmentShaderText);
}

