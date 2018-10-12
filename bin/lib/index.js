const { disableAutoUpdateSelf, disableAutoUpdateModules } = require("../config.json");

console.log(`[proxy] Auto-Update Proxy: ${disableAutoUpdateSelf ? '\x1b[31mOFF' : '\x1b[32mON'}\x1b[0m Auto-Update Modules: ${disableAutoUpdateModules ? '\x1b[31mOFF' : '\x1b[32mON'}\x1b[0m `);

async function updateSelf() {
  delete require.cache[require.resolve('./update-self')];
  const autoUpdateSelf = require("./update-self");
  try {
    let result = await autoUpdateSelf();
    if(result)
      return updateSelf();
    else
      return true;
  } catch(_) {
    return false;
  }
}

if (!disableAutoUpdateSelf) {
  updateSelf().then((result) => {
    if(result)
      require("./proxy");
    else
      console.log("Failed to auto-update the proxy, terminating...");
  });
} else {
  require("./proxy");
}
