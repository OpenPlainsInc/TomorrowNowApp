/*
 * Filename: convolve.js
 * Project: TomorrowNow
 * File Created: Tuesday April 5th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Tue Apr 05 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 TomorrowNow
 * 
 * TomorrowNow is an open-source geospatial participartory modeling platform
 * to enable stakeholder engagment in socio-environmental decision-makeing.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */
// import webglUtils from './webglUtils';

import WebGLTileLayerRenderer from 'ol/renderer/webgl/TileLayer';
import WebGLRenderTarget from 'ol/webgl/RenderTarget';


// https://openlayers.org/en/latest/examples/image-filter.html
var vertexShaderSource = `


    attribute vec2 a_position;
    attribute vec2 a_texCoord;

    uniform vec2 u_resolution;

    varying vec2 v_texCoord;

    void main() {
        // convert the rectangle from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

        // pass the texCoord to the fragment shader
        // The GPU will interpolate this value between points.
        v_texCoord = a_texCoord;
}`;




var fragmentShaderSource = `
 
    precision mediump float;

    // our texture
    uniform sampler2D u_image;
    uniform vec2 u_textureSize;
    uniform float u_kernel[9];
    uniform float u_kernelWeight;

    // the texCoords passed in from the vertex shader.
    varying vec2 v_texCoord;

    void main() {
        vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
        vec4 colorSum =
            texture2D(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 0, -1)) * u_kernel[1] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 1, -1)) * u_kernel[2] +
            texture2D(u_image, v_texCoord + onePixel * vec2(-1,  0)) * u_kernel[3] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 0,  0)) * u_kernel[4] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 1,  0)) * u_kernel[5] +
            texture2D(u_image, v_texCoord + onePixel * vec2(-1,  1)) * u_kernel[6] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 0,  1)) * u_kernel[7] +
            texture2D(u_image, v_texCoord + onePixel * vec2( 1,  1)) * u_kernel[8] ;

        gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1);
}
`;

function convolve(e, kernel){
    const gl = e.context
    const canvas = gl.canvas
    // const webGLRenderer = new WebGLTileLayerRenderer(e.target, {
    //     vertexShader: vertexShaderSource,
    //     fragmentShader: fragmentShaderSource,
    // })
    console.log("context", gl)
    console.log("canvas", canvas)
    // console.log("webGLRenderer", webGLRenderer)
    console.log("kernel", kernel)

    const width = canvas.width;
    const height = canvas.height;
  
    const size = Math.sqrt(kernel.length);
    const half = Math.floor(size / 2);

    // const inputData = canvas.getImageData(0, 0, width, height).data;
    // Create a texture.
    // const texture = gl.createTexture();
    // gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    const inputData =  new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
            gl.readPixels(
            0, 
            0, 
            gl.drawingBufferWidth, 
            gl.drawingBufferHeight, 
            gl.RGBA, 
            gl.UNSIGNED_BYTE, 
            inputData);

    console.log("input data", inputData)
    const blankCanvas = document.createElement('canvas');
    const context = blankCanvas.getContext('2d');

    let output = context.createImageData(width, height);
    const outputData = output.data;
    for (let pixelY = 0; pixelY < height; ++pixelY) {
        const pixelsAbove = pixelY * width;
        for (let pixelX = 0; pixelX < width; ++pixelX) {
          let r = 0,
            g = 0,
            b = 0,
            a = 0;
          for (let kernelY = 0; kernelY < size; ++kernelY) {
            for (let kernelX = 0; kernelX < size; ++kernelX) {
              const weight = kernel[kernelY * size + kernelX];
              const neighborY = Math.min(
                height - 1,
                Math.max(0, pixelY + kernelY - half)
              );
              const neighborX = Math.min(
                width - 1,
                Math.max(0, pixelX + kernelX - half)
              );
              const inputIndex = (neighborY * width + neighborX) * 4;
              r += inputData[inputIndex] * weight;
              g += inputData[inputIndex + 1] * weight;
              b += inputData[inputIndex + 2] * weight;
              a += inputData[inputIndex + 3] * weight;
            }
          }
          const outputIndex = (pixelsAbove + pixelX) * 4;
          outputData[outputIndex] = r;
          outputData[outputIndex + 1] = g;
          outputData[outputIndex + 2] = b;
          outputData[outputIndex + 3] = kernel.normalized ? a : 255;
        }
      }

    function setRectangle(gl, x, y, width, height) {
        let x1 = x;
        let x2 = x + width;
        let y1 = y;
        let y2 = y + height;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2,
        ]), gl.STATIC_DRAW);
    }



    // const wgTarget = new WebGLRenderTarget()
    // const output = gl.createImageData(width, height);
    // const output= setRectangle(gl, 0, 0, width, height)
    console.log(output)
    context.putImageData(output, 0, 0);
    console.log("Updated Context", context)


    // gl.bufferData(gl.ARRAY_BUFFER, outputData, gl.STATIC_DRAW);
    // let offset = 0;
    // let count = 6;
    // gl.drawArrays(gl.TRIANGLES, offset, outputData);
    // const outputData = output.data;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, context.canvas);

}





// function convolve(e) {
//     // console.log("webglUtils", webglUtils)
//     const gl = e.context
//     const image = e;
//     const topWindow = this;
//     function createShader(gl, type, source) {
//         var shader = gl.createShader(type);
//         gl.shaderSource(shader, source);
//         gl.compileShader(shader);
//         var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
//         if (success) {
//           return shader;
//         }
       
//         // console.log(gl.getShaderInfoLog(shader));
//         gl.deleteShader(shader);
//       }

//    /**
//    * Wrapped logging function.
//    * @param {string} msg The message to log.
//    */
//     function error(msg) {
//         if (topWindow.console) {
//           if (topWindow.console.error) {
//             topWindow.console.error(msg);
//           } else if (topWindow.console.log) {
//             topWindow.console.log(msg);
//           }
//         }
//       }
//   /**
//    * Creates a program, attaches shaders, binds attrib locations, links the
//    * program and calls useProgram.
//    * @param {WebGLShader[]} shaders The shaders to attach
//    * @param {string[]} [opt_attribs] An array of attribs names. Locations will be assigned by index if not passed in
//    * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
//    * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors. By default it just prints an error to the console
//    *        on error. If you want something else pass an callback. It's passed an error message.
//    * @memberOf module:webgl-utils
//    */
//   function createProgram(
//     gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
//   const errFn = opt_errorCallback || error;
//   const program = gl.createProgram();
//   shaders.forEach(function(shader) {
//     gl.attachShader(program, shader);
//   });
//   if (opt_attribs) {
//     opt_attribs.forEach(function(attrib, ndx) {
//       gl.bindAttribLocation(
//           program,
//           opt_locations ? opt_locations[ndx] : ndx,
//           attrib);
//     });
//   }
//   gl.linkProgram(program);

//   // Check the link status
//   const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
//   if (!linked) {
//       // something went wrong with the link
//       const lastError = gl.getProgramInfoLog(program);
//       errFn('Error in program linking:' + lastError);

//       gl.deleteProgram(program);
//       return null;
//   }
//   return program;
// }
// // setup GLSL program

// //   const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
// //   const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
// //   function createProgram(gl, vertexShader, fragmentShader) {
// //     let program = gl.createProgram();
    
// //     gl.attachShader(program, vertexShader);
// //     gl.attachShader(program, fragmentShader);
// //     gl.linkProgram(program);
// //     let success = gl.getProgramParameter(program, gl.LINK_STATUS);
// //     if (success) {
// //       return program;
// //     }
   
// //     console.log(gl.getProgramInfoLog(program));
// //     gl.deleteProgram(program);
// //   }

//   /**
//    * Loads a shader from a script tag.
//    * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
//    * @param {string} scriptId The id of the script tag.
//    * @param {number} opt_shaderType The type of shader. If not passed in it will
//    *     be derived from the type of the script tag.
//    * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors.
//    * @return {WebGLShader} The created shader.
//    */
//    function createShaderFromScript(
//     gl, scriptId, opt_shaderType, opt_errorCallback) {
//     let shaderSource = '';
//     let shaderType;
//     const shaderScript = document.getElementById(scriptId);
//     if (!shaderScript) {
//         throw ('*** Error: unknown script element' + scriptId);
//     }
//     shaderSource = shaderScript.text;

//     if (!opt_shaderType) {
//         if (shaderScript.type === 'x-shader/x-vertex') {
//         shaderType = gl.VERTEX_SHADER;
//         } else if (shaderScript.type === 'x-shader/x-fragment') {
//         shaderType = gl.FRAGMENT_SHADER;
//         } else if (shaderType !== gl.VERTEX_SHADER && shaderType !== gl.FRAGMENT_SHADER) {
//         throw ('*** Error: unknown shader type');
//     }
//   }




//    /**
//    * Loads a shader.
//    * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
//    * @param {string} shaderSource The shader source.
//    * @param {number} shaderType The type of shader.
//    * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors.
//    * @return {WebGLShader} The created shader.
//    */
//     function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
//         const errFn = opt_errorCallback || error;
//         // Create the shader object
//         const shader = gl.createShader(shaderType);
    
//         // Load the shader source
//         gl.shaderSource(shader, shaderSource);
    
//         // Compile the shader
//         gl.compileShader(shader);
    
//         // Check the compile status
//         const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
//         if (!compiled) {
//           // Something went wrong during compilation; get the error
//           const lastError = gl.getShaderInfoLog(shader);
//           errFn('*** Error compiling shader \'' + shader + '\':' + lastError + `\n` + shaderSource.split('\n').map((l,i) => `${i + 1}: ${l}`).join('\n'));
//           gl.deleteShader(shader);
//           return null;
//         }
    
//         return shader;
//       }

//   return loadShader(
//       gl, shaderSource, opt_shaderType ? opt_shaderType : shaderType,
//       opt_errorCallback);
// }

// const defaultShaderType = [
//   'VERTEX_SHADER',
//   'FRAGMENT_SHADER',
// ];

// function createProgramFromScripts(
//     gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
//   const shaders = [];
//   for (let ii = 0; ii < shaderScriptIds.length; ++ii) {
//     shaders.push(createShaderFromScript(
//         gl, shaderScriptIds[ii], gl[defaultShaderType[ii]], opt_errorCallback));
//   }
//   return createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
// }
//   var program = createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);

// //   const program = createProgram(gl, [vertexShader, fragmentShader]);


//   // look up where the vertex data needs to go.
//   var positionLocation = gl.getAttribLocation(program, "a_position");
//   var texcoordLocation = gl.getAttribLocation(program, "a_texCoord");

//   // Create a buffer to put three 2d clip space points in
//   var positionBuffer = gl.createBuffer();
//   // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//   // Set a rectangle the same size as the image.
//   setRectangle( gl, 0, 0, image.width, image.height);

//   // provide texture coordinates for the rectangle.
//   var texcoordBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//       0.0,  0.0,
//       1.0,  0.0,
//       0.0,  1.0,
//       0.0,  1.0,
//       1.0,  0.0,
//       1.0,  1.0,
//   ]), gl.STATIC_DRAW);

//   // Create a texture.
//   var texture = gl.createTexture();
//   gl.bindTexture(gl.TEXTURE_2D, texture);

//   // Set the parameters so we can render any size image.
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

//   const inputData =  new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
//         gl.readPixels(
//         0, 
//         0, 
//         gl.drawingBufferWidth, 
//         gl.drawingBufferHeight, 
//         gl.RGBA, 
//         gl.UNSIGNED_BYTE, 
//         inputData);

//     console.log("look here",gl)
//   // Upload the image into the texture.
//   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

//   // lookup uniforms
//   var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
//   var textureSizeLocation = gl.getUniformLocation(program, "u_textureSize");
//   var kernelLocation = gl.getUniformLocation(program, "u_kernel[0]");
//   var kernelWeightLocation = gl.getUniformLocation(program, "u_kernelWeight");


//   var initialSelection = 'edgeDetect2';

//   drawWithKernel(initialSelection);

//   function computeKernelWeight(kernel) {
//     var weight = kernel.reduce(function(prev, curr) {
//         return prev + curr;
//     });
//     return weight <= 0 ? 1 : weight;
//   }


//   function drawWithKernel(name) {
//     // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
//     function resizeCanvasToDisplaySize(canvas, multiplier) {
//         multiplier = multiplier || 1;
//         const width  = canvas.clientWidth  * multiplier | 0;
//         const height = canvas.clientHeight * multiplier | 0;
//         if (canvas.width !== width ||  canvas.height !== height) {
//           canvas.width  = width;
//           canvas.height = height;
//           return true;
//         }
//         return false;
//       }
//     resizeCanvasToDisplaySize(gl.canvas)

//     // Tell WebGL how to convert from clip space to pixels
//     gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

//     // Clear the canvas
//     gl.clearColor(0, 0, 0, 0);
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     // Tell it to use our program (pair of shaders)
//     gl.useProgram(program);

//     // Turn on the position attribute
//     gl.enableVertexAttribArray(positionLocation);

//     // Bind the position buffer.
//     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

//     // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
//     var size = 2;          // 2 components per iteration
//     var type = gl.FLOAT;   // the data is 32bit floats
//     var normalize = false; // don't normalize the data
//     var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
//     var offset = 0;        // start at the beginning of the buffer
//     gl.vertexAttribPointer(
//         positionLocation, size, type, normalize, stride, offset)

//     // Turn on the teccord attribute
//     gl.enableVertexAttribArray(texcoordLocation);

//     // Bind the position buffer.
//     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

//     // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
//     var size = 2;          // 2 components per iteration
//     var type = gl.FLOAT;   // the data is 32bit floats
//     var normalize = false; // don't normalize the data
//     var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
//     var offset = 0;        // start at the beginning of the buffer
//     gl.vertexAttribPointer(
//         texcoordLocation, size, type, normalize, stride, offset)

//     // set the resolution
//     gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

//     // set the size of the image
//     gl.uniform2f(textureSizeLocation, image.width, image.height);

//     // set the kernel and it's weight
//     gl.uniform1fv(kernelLocation, kernels[name]);
//     gl.uniform1f(kernelWeightLocation, computeKernelWeight(kernels[name]));

//     // Draw the rectangle.
//     var primitiveType = gl.TRIANGLES;
//     var offset = 0;
//     var count = 6;
//     console.time('draw');
//     gl.drawArrays(primitiveType, offset, count);
//         console.timeEnd('draw');
//     }

//     function setRectangle(gl, x, y, width, height) {
//         var x1 = x;
//         var x2 = x + width;
//         var y1 = y;
//         var y2 = y + height;
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//            x1, y1,
//            x2, y1,
//            x1, y2,
//            x1, y2,
//            x2, y1,
//            x2, y2,
//         ]), gl.STATIC_DRAW);
//     }

//     console.log("Made it to the end", gl)
// }


/**
 * Apply a convolution kernel to canvas.  This works for any size kernel, but
 * performance starts degrading above 3 x 3.
 * @param {CanvasRenderingContext2D} context Canvas 2d context.
 * @param {Array<number>} kernel Kernel.
 */
//  import {toContext} from 'ol/render';

function convolve1(e, kernel) {
    console.log("Convolve Kernel:", kernel)
    const context = e.context;
    console.log("Convolve Context:", context)

    const canvas = context.canvas;
    console.log("Convolve Canvas:", canvas)

    const width = canvas.width;
    const height = canvas.height;
    console.log("Convolve Canvas Width:", width)
    console.log("Convolve Canvas Height:", height)
  
    const size = Math.sqrt(kernel.length);
    const half = Math.floor(size / 2);
    // context = canvas.getImageData(0, 0, width, height).data
    const inputData =  new Uint8Array(context.drawingBufferWidth * context.drawingBufferHeight * 4);
        context.readPixels(
        0, 
        0, 
        context.drawingBufferWidth, 
        context.drawingBufferHeight, 
        context.RGBA, 
        context.UNSIGNED_BYTE, 
        inputData);
    console.log("Convolve Canvas Context input Data:", inputData)

    // const inputData = render.context.getImageData(0, 0, width, height).data;
    // const output = context.createImageData(width, height);
    const outputBuffer = context.createRenderbuffer();
    const output = context.bindBuffer(context.ARRAY_BUFFER, outputBuffer)
    console.log("Convolve Canvas Context output createRenderbuffer:", output)



    const outputData = output.data;
    console.log("Convolve Canvas Context output data:", outputData)

    for (let pixelY = 0; pixelY < height; ++pixelY) {
      const pixelsAbove = pixelY * width;
      for (let pixelX = 0; pixelX < width; ++pixelX) {
        let r = 0,
          g = 0,
          b = 0,
          a = 0;
        for (let kernelY = 0; kernelY < size; ++kernelY) {
          for (let kernelX = 0; kernelX < size; ++kernelX) {
            const weight = kernel[kernelY * size + kernelX];
            const neighborY = Math.min(
              height - 1,
              Math.max(0, pixelY + kernelY - half)
            );
            const neighborX = Math.min(
              width - 1,
              Math.max(0, pixelX + kernelX - half)
            );
            const inputIndex = (neighborY * width + neighborX) * 4;
            r += inputData[inputIndex] * weight;
            g += inputData[inputIndex + 1] * weight;
            b += inputData[inputIndex + 2] * weight;
            a += inputData[inputIndex + 3] * weight;
          }
        }
        const outputIndex = (pixelsAbove + pixelX) * 4;
        outputData[outputIndex] = r;
        outputData[outputIndex + 1] = g;
        outputData[outputIndex + 2] = b;
        outputData[outputIndex + 3] = kernel.normalized ? a : 255;
      }
    }
    context.putImageData(output, 0, 0);
  }

export default convolve