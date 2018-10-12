### Fork of Caali/Meishuu's/Pinkie Pie's tera-proxy with built-in support for automatic updates
* It will auto-update your opcode mappings, packet definitions, and compatible installed modules. You no longer need do manually update _anything_!
* Feel free to visit my Discord server at https://discord.gg/y75BafU

### Installation instructions
* Download and run the setup from the #proxy channel in the Slack server linked above. A manual installation is possible, but not recommended!
* The first auto-update after installing the proxy or new mods may take a few seconds. This is because all required files will be downloaded automatically.
* The most popular modules are already pre-installed for your convenience - check out `bin/node_modules/`. If you don't want to use a particular mod, just delete the corresponding folder or prefix its folder name with an underscore (`_`).
* Run `TeraProxy.bat` *as Administrator*, then start the game

### Developers: Adding auto-update compatibility to your module
* You'll need to create two files in your root update directory (called UpdateRoot from now on): `module.json` and `manifest.json`.
* `module.json` contains the UpdateRoot URL and optional other data. See [here](https://github.com/caali-hackerman/data-logger/blob/master/update/CaaliLogger/module.json) for an example. If you're distributing paid modules, you can add a `drmKey` parameter representing a unique per-user key (string) there as well. It'll be sent as a HTTP GET parameter when `manifest.json` is requested.
* `manifest.json` contains a list of all files required for your module (relative to its root directory) and their corresponding SHA256 hashes. Furthermore, you must specify a list of all packet definitions and versions required by your module here. See [here](https://github.com/caali-hackerman/data-logger/blob/master/update/CaaliLogger/manifest.json) for an example. If you have files that shouldn't be overwritten, you can use `{"overwrite": false, "hash": [file hash]}` instead of just a string on a per-file basis. You can also specify for which game regions a file is downloaded.
* That's it! All you need to do now is tell your users to delete any legacy version of your module that they have already installed, and place the `module.json` file in a new, empty directory in their `bin/node_modules/` folder. `manifest.json` must not be distributed to your users, it only has to reside in your UpdateRoot. The proxy will recognize the module as auto-updating compatible and install all files from your UpdateRoot. It will also download required packet definitions, if necessary.
* SaltyMonkey wrote a neat tool that generates `manifest.json` automatically for you (though you might want to manually adjust stuff afterwards): https://github.com/SaltyMonkey/SHAGen/releases/
* Whenever you push an update, remember to update `manifest.json` as well!
* Keep in mind that everytime the user logs in, all files with checksums mismatching those in your manifest.json will be overwritten. This will overwrite any changes the user has made to them!
* Make sure to disable git auto-line ending conversion (`git config --global core.autocrlf false`) before pushing your updated files. This will ensure that your file contents won't be modified, so that the SHA256 hashes you generated for `manifest.json` won't become invalid!
* If you have any further questions on how to make your module compatible, feel free to ask me via PM or in my Slack server!
