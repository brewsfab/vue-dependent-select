module.exports = {
	css:{
		extract: false
	},
	configureWebpack: {
		devServer: {
			watchOptions: {
				ignored: /node_modules/,
		},
		}
	}
}