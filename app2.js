const { mat4 } = glMatrix;

var vertexshaderText = [
  'precision mediump float;',
  '',
  'attribute vec3 vertPosition;',
  'attribute vec3 vertColor;',
  'varying vec3 fragColor;', 
  'uniform mat4 mWorld;',
  'uniform mat4 mView;',
  'uniform mat4 mProj;',
  '',
  'void main() {',
    '  fragColor = vertColor;',
  '  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 0.0, 1.0);',
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
  var canvas = document.getElementById("myCanvas2");
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

  
  var triangleVertices = [ // x, y, z,   r,g,b
    0.0, 0.5, 0.0, 1,1,0, // Top vertex
    -0.5, -0.5, 0.0, 0,1,1, // Bottom left vertex
    0.5, -0.5, 0.0, 1,0,1, // Bottom right vertex
  ];

  var triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  var positionAttributeLocation = gl.getAttribLocation(program, "vertPosition");
  var colorAttributeLocation = gl.getAttribLocation(program, "vertColor");
  

  gl.vertexAttribPointer(
    positionAttributeLocation, // attribute location
    3, // number of elements per attribute
    gl.FLOAT, // type of elements
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex
    0 // offset from the beginning of each vertex to this attribute  
  );
  gl.vertexAttribPointer(
    colorAttributeLocation, 
    3, // number of elements per attribute
    gl.FLOAT, // type of elements
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT// offset from the beginning of each vertex to this attribute
  );
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.enableVertexAttribArray(colorAttributeLocation);

  // tell webGL which program to use and it should be active
    gl.useProgram(program);

  var matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
  var matViewUniformLocation = gl.getUniformLocation(program, "mView");
  var matProjUniformLocation = gl.getUniformLocation(program, "mProj");

  var projectionMatrix = new Float32Array(16);
  var viewMatrix = new Float32Array(16);
  var worldMatrix = new Float32Array(16);
  mat4.identity(worldMatrix);
  mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);//this is the camra [camra position], [where it is looking], [up vector/ what is up]
  mat4.perspective(projectionMatrix, glMath.toRadians(45), 1, 10000, 0.1);

  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projectionMatrix);

  //
  // main render loop
  //

  gl.drawArrays(gl.TRIANGLES, 0, 3);

};
