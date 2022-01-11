function wpPath(assetsPath, wpTheme) {
	return `/wp-content/themes/${wpTheme}/${assetsPath}/`
}

module.exports = {
	wpPath,
}
