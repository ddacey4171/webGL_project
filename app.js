var vertexshaderText = [
  'precision mediump float;',
  '',
  'attribute vec2 vertPosition;',
  'attribute vec3 vertColor;',
  'varying vec3 fragColor;', 
  '',
  'void main() {',
    '  fragColor = vertColor;',
  '  gl_Position = vec4(vertPosition, 0.0, 1.0);',
  '}'
].join("\n");

var fragmentShaderText = [
  'precision mediump float;',
  '',
  'varying vec3 fragColor;', 
  'void main(){',
  '  gl_FragColor = vec4(fragColor, 1.0);',
  '}'
].join("\n");

var initDemo = function() {
  console.log("this is working");
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) {
    alert("Your browser does not support WebGL.");
    return;
  }

  // Clear background to a dark purple
  gl.clearColor(0.5, 0.0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Creates shaders
  var vertexshader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexshader, vertexshaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  // Compile and check Vertex Shader
  gl.compileShader(vertexshader);
  if (!gl.getShaderParameter(vertexshader, gl.COMPILE_STATUS)){
    console.error('ERROR compiling vertex shader', gl.getShaderInfoLog(vertexshader));
    return;
  }

  // Compile and check Fragment Shader
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
    console.error('ERROR compiling fragment shader', gl.getShaderInfoLog(fragmentShader));
    return;
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertexshader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error('ERROR linking program', gl.getProgramInfoLog(program));
    return;
  }

  
  gl.validateProgram(program);
  
 
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('ERROR Validating program ', gl.getProgramInfoLog(program));
    return;
  }

  
  var triangleVertices = [ // x, y.   r,g,b
    0.0, 0.5,   1,1,0, // Top vertex
    -0.5, -0.5, 0,1,1, // Bottom left vertex
    0.5, -0.5, 1,0,1, // Bottom right vertex
    0.45,-0.55, 0,0,0,
    0.4,-1, 0,0,0,
    0.35,-0.55, 0,0,0,
  ];

  var triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  var positionAttributeLocation = gl.getAttribLocation(program, "vertPosition");
  var colorAttributeLocation = gl.getAttribLocation(program, "vertColor");
  

  gl.vertexAttribPointer(
    positionAttributeLocation, // attribute location
    2, // number of elements per attribute
    gl.FLOAT, // type of elements
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex
    0 // offset from the beginning of each vertex to this attribute  
  );
  gl.vertexAttribPointer(
    colorAttributeLocation, 
    3, // number of elements per attribute
    gl.FLOAT, // type of elements
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex
    2 * Float32Array.BYTES_PER_ELEMENT// offset from the beginning of each vertex to this attribute
  );
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.enableVertexAttribArray(colorAttributeLocation);


  // main render loop
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.drawArrays(gl.TRIANGLES, 3, 3);
};
