#!/bin/bash
set -e
# https://github.com/openlayers/openlayers/issues/7401
# OpenLayers is distributed as ES6 modules which cannot be directly loaded by jest.
# So we pre-compile it using esbuild to a single file and tell Jest to resolve imports
# of "ol/<X>" to that output file in package.json.
if [ ! -d "node_modules/.compiled/ol" ]; then
   echo "Compiling node_modules/ol using esbuild..."

   npx esbuild ./node_modules/ol --bundle --outdir=node_modules/.compiled/ol

   # It's also possible to do it with babel, but that needs to be installed and is slower.
   # NOTE: when using babel, the module mapping in package.json needs to be changed to:
   #
   #   "^ol/(.*)$": "<rootDir>/node_modules/.compiled/ol/$1.js"

   # echo "Compiling node_modules/ol using babel... (this may take a few seconds)"
   # ./node_modules/.bin/babel node_modules/ol \
   #     --extensions .js \
   #     --out-dir node_modules/.compiled/ol \
   #     --presets @babel/preset-env \
   #     --source-maps
else
   echo "node_modules/ol is already compiled, skipping."
fi