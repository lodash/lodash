BUILD_DIR = ${CURDIR}/build
DIST_DIR = ${CURDIR}/dist
VENDOR_DIR = ${CURDIR}/vendor

JS_ENGINE ?= `which node nodejs 2>/dev/null`

LODASH_TMP = ${BUILD_DIR}/lodash.tmp.js
LODASH_COMPILER = ${DIST_DIR}/lodash.compiler.js
LODASH_UGLIFY = ${DIST_DIR}/lodash.uglify.js

UGLIFY = ${VENDOR_DIR}/uglifyjs/bin/uglifyjs
CLOSURE_COMPILER = java -jar ${VENDOR_DIR}/closure-compiler/compiler.jar

PRE_COMPILER = ${JS_ENGINE} ${BUILD_DIR}/pre-compile.js
POST_COMPILER = ${JS_ENGINE} ${BUILD_DIR}/post-compile.js

core:
	mkdir -p ${DIST_DIR}
	cp ${CURDIR}/lodash.js ${LODASH_TMP}
	${PRE_COMPILER} ${LODASH_TMP}

	${CLOSURE_COMPILER} \
	  --compilation_level=ADVANCED_OPTIMIZATIONS \
	  --language_in=ECMASCRIPT5_STRICT \
	  --warning_level=QUIET \
	  --js ${LODASH_TMP} \
	  --js_output_file ${LODASH_COMPILER}
	${POST_COMPILER} ${LODASH_COMPILER}
	gzip -9f -c ${LODASH_COMPILER} > ${LODASH_COMPILER}.gz

	${UGLIFY} \
	  --unsafe \
      --max-line-len 500 \
	  -o ${LODASH_UGLIFY} \
	  ${LODASH_TMP}
	${POST_COMPILER} ${LODASH_UGLIFY}
	gzip -9f -c ${LODASH_UGLIFY} > ${LODASH_UGLIFY}.gz

	rm -f ${LODASH_TMP}
