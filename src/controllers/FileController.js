const File = require('../models/File');
const Box = require('../models/Box');

class FileController {
  async store(req, res) {
    const box = await Box.findById(req.params.id);

    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    box.files.push(file);

    await box.save();

    //realtime - websockets
    req.io.sockets.in(box._id).emit("file", file);

    return res.json(file);
  }
}

// Sem esse new, não é possível acessar os métodos dessa classe
module.exports = new FileController(); 