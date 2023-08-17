moduleconfig
============

loading configuration files for node modules. 
If you are building a node module that needs a configuration file, that the user of the module creates, 
you have come to the right place.

You are building a module `MyModule` with a user config file
------------------------------------------------

The module `MyModule` has a configuration, by convention this configuration specified in in the file `config.js`.

- In project `Main` the module `MyModule` is required.
- In project `Main` the module `ExternalModule` is also required.
- `ExternalModule` also requires `MyModule`

This means that when the module `ExternalModule` uses `MyModule` the configuration should be loaded from `Main/node_modules/ExternalModule/config.js`,
and when the project `Main` uses the module `MyModule` the configuration should be loaded from `Main/config.js`

Problem
-------
Because `Main` and `ExternalModule` both require the same version of `MyModule`. 
`npm` only installs `MyModule` in `Main/node_modules/MyModule`.
`MyModule` is *not* installed in `Main/node_modules/ExternalModule/node_modules/MyModule`. 

Therefore the `require`-ing `MyModule` from the code `ExternalModule` in does not load the correct
config. It loads the config from `Main/config.js` and *not* from `Main/node_modules/ExternalModule/config.js` as it should.
The `Main` projects config overrides the `ExternalModule` config.


Solution
----------------------------------------------
Use `moduleconfig` in the module `MyModule`

MyModule.js is the main file pointed to by the `package.json` in the `MyModule` module
```js
const moduleConfig = require("moduleconfig");
module.exports = moduleConfig(["config.js"], function(configFilePath){
	return instantiateMyModulefromConfig(require(configFilePath));
});
```

You will have to implement the `instantiateMyModulefromConfig` function yourself.


This will mean that this:
```
const myModule = require("MyModule");
```

will return an `myModule` based on `Main/node_modules/ExternalModule/config.js` when `MyModule` is required 
from a javascript file anywhere in the path `Main/node_modules/ExternalModule/...`

and it will return an `myModule` based on `Main/config.js` when `MyModule` is required by code in `Main`.


License
-------

[MIT](http://opensource.org/licenses/MIT)
