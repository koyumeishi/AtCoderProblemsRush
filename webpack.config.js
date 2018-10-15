module.exports = {
	entry: "./src/appRoot.tsx",
	output: {
		filename: "bundle.js",
		path: __dirname + "/dst"
	},

	devtool: "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},

	optimization: {
		minimize: false
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},

			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	}
}
