const path = require('path')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { wpPath } = require('./utils')

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'app.js?[contenthash]',
		path: path.resolve(__dirname, '../public/build'),
		publicPath: wpPath('public/build', 'remato'), // TODO: verify
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					{
						// bable-loader can compile TS, but it isn't supported with Vue3 yet; that's where ts-loader comes in.
						// More: https://github.com/Coldsewoo/babel-preset-typescript-vue3
						loader: 'ts-loader',
						options: {
							transpileOnly: true, // skip typechecking here, use ForkTsCheckerWebpackPlugin instead
							appendTsSuffixTo: [/\.vue$/],
						},
					},
				],
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					optimizeSSR: false,
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: 'asset/resource',
				generator: {
					filename: '[name][ext]?[hash]',
				},
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'app.css?[contenthash]',
		}),
		new ESLintPlugin({
			context: 'src',
			extensions: ['ts'],
		}),
		new StylelintPlugin({
			context: 'src',
			extensions: ['css', 'scss'],
		}),
		new ForkTsCheckerWebpackPlugin({
			eslint: {
				files: './src/**/*.{vue,ts,tsx,js}',
			},
			typescript: {
				extensions: {
					vue: {
						enabled: true,
						compiler: '@vue/compiler-sfc',
					},
				},
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
			},
		}),
		new CleanWebpackPlugin(),
	],
	resolve: {
		extensions: ['.ts', '.js', '.vue', '.json'],
	},
}
