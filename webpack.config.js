const webpack = require('webpack');
const path = require('path');

const config = {
	entry: [
			path.join(__dirname, '/client/index.jsx')
	],
	output: {
		path: path.resolve(__dirname, 'client', 'bundle'),
		filename: 'bundle.js',
		publicPath: '/bundle/'
	},
	node: {
      	child_process: 'empty',
      	fs: "empty",
      	net: "empty",
      	tls: "empty"
    },
  devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: [/node_modules/]
			},
			{
			  test: /\.css$/,
			  loader: 'style-loader!css-loader'
			}
		]
	}
}

module.exports = config;
