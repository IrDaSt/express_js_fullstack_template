const fse = require("fs-extra");
const Async = require("async");

// Make sure directory exist, if not exist will create one
const ensureDir = (path) => {
  return fse.ensureDir(path);
};

// Move or rename file or folder
const moveOrRename = (src_path, dest_path) => {
  return fse.move(src_path, dest_path);
};

// Delete one file of folder
const deleteOne = async (path) => {
  if (fse.existsSync(path)) {
    await fse.remove(path);
  }
};

// Delete multiple file or folder
const deleteMultiTempUpload = async (paths = []) => {
  await Async.each(paths, async (path, cb) => {
    if (fse.existsSync(path)) {
      await fse.remove(path);
    }
    cb();
  });
};

const fsUtils = {
  ensureDir,
  moveOrRename,
  deleteOne,
  deleteMultiTempUpload,
};

module.exports = fsUtils;
