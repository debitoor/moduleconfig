"use strict";
const path = require("path");
const fs = require("fs");
const existsSync = fs.existsSync || path.existsSync;

module.exports = function getErrorConfigFilePath(startDir, paths) {
	let dir = startDir;
	let lastDir;
	while (lastDir !== dir) {
		for (let i = 0; i < paths.length; i++) {
			if (existsSync(path.join(dir, paths[i]))) {
				return path.join(dir, paths[i]);
			}
		}
		lastDir = dir;
		dir = path.join(dir, "..");
	}
	return false;
};