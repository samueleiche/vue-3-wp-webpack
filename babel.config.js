module.exports = {
	// @babel/preset-env includes many features of ES2020 like @babel/plugin-proposal-optional-chaining
	presets: ['@babel/preset-env', '@babel/preset-typescript'],
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: 3,
			},
		],
	],
}
