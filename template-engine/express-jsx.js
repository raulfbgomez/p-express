const fs = require('fs')

function getKeysFromOptions(options) {
  const { settings, _locals, ...objectKeys } = options
  return Object.keys(objectKeys) // Regresa un array con los keys
}
/**
 * 
 * Busca los keys que vienen como opciones desde res.render 
 * y los reemplaza por su contenido
 */
function getRenderedContent(content, options) {
  const keys = getKeysFromOptions(options)
  let contentString = content.toString()

  for(let key of keys) {
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, "gi"),
      options[key]
    )
  }
  return contentString
}

function expressJsx(filepath, options, callback) {
  fs.readFile(filepath, function(err, content) {
    if(err) {
      return callback(err)
    }
    const rendered = getRenderedContent(content, options)
    return callback(null, rendered)
  })
}

module.exports = expressJsx