import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import nativePlugin from 'rollup-plugin-natives';

export default [

	// Browser-friendly UMD build
	{
		input: 'src/esc-pos-encoder.js',
		output: {
			name: 'EscPosEncoder',
			file: 'dist/esc-pos-encoder.umd.js',
			format: 'umd'
		},
		plugins: [
			nativePlugin({
				copyTo: 'dist'
			}),
			resolve({ browser: true }), 
			commonjs(),
            terser()
		]
	},

	// Browser-friendly ES module build
	{
		input: 'src/esc-pos-encoder.js',
		output: { 
			file: 'dist/esc-pos-encoder.esm.js', 
			format: 'es' 
		},
		plugins: [
			nativePlugin({
				copyTo: 'dist'
			}),
			resolve({ browser: true }), 
			commonjs(),
            terser()
		]
	},

    // CommonJS (for Node) and ES module (for bundlers) build
    {
		input: 'src/esc-pos-encoder.js',
		external: ['@napi-rs/canvas', 'canvas-dither', 'canvas-flatten', 'codepage-encoder', 'linewrap'],
		output: [
			{ file: 'dist/esc-pos-encoder.cjs', format: 'cjs' },
			{ file: 'dist/esc-pos-encoder.mjs', format: 'es' }
		]
	}
];
