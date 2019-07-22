const Storage = require('./storage.js')

module.exports = {
  add,
  count,
  exists,
  list,
  listAll,
  remove
}

async function exists(path, itemid) {
  return Storage.exists(`list/${path}/${itemid}`)
}

async function add(path, itemid) {
  const exists = await Storage.exists(`list/${path}/${itemid}`)
  if (exists) {
    return callback()
  }
  return Storage.write(`list/${path}/${itemid}`, '')
}

async function count(path) {
  const all = Storage.list(`list/${path}`)
  if (!all || !all.length) {
    return 0
  }
  return all.length
}

async function listAll(path) {
  const list = Storage.list(`list/${path}`)
  if (!list || !list.length) {
    return null
  }
  for (const i in list) {
    list[i] = list[i].split('/').pop()
  }
  return list
}

async function list(path, offset, pageSize) {
  offset = offset || 0
  if (pageSize === null || pageSize === undefined) {
    pageSize = global.pageSize
  }
  if (offset < 0) {
    throw new Error('invalid-offset')
  }
  list = await Storage.list(`list/${path}`)
  if (!list || !list.length) {
    return null
  }
  if (offset) {
    list.splice(0, offset)
  }
  if (list.length > pageSize) {
    list = list.slice(0, pageSize)
  }
  for (const i in list) {
    list[i] = list[i].split('/').pop()
  }
  return list
}

async function remove(path, itemid) {
  return Storage.deleteFile(`list/${path}/${itemid}`)
}