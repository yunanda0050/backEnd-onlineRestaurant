
const {minuman, pesanan} = require('../models');
const R = require('ramda');


//POST 
const createNew = async (req, res) => {
    try {
        const { nama_minuman, harga, deskripsi } = req.body;

        const createMinuman = R.pick(['nama_minuman', 'harga', 'deskripsi'], req.body);

        const data = await minuman.create(createMinuman);

        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam membuat menu minuman baru'
        });
    }
}



// GET 
const getAll = async (req, res) => {
    try {
        const list_minuman = await minuman.findAll();
        const response = R.pick(['list_minuman'], { list_minuman });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam memanggil list menu minuman',
        });
    }
};


//GET BY ID 
const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await minuman.findByPk(id);

        if (data) {
            const responseData = R.pick(['id', 'nama_minuman', 'harga', 'deskripsi', 'createdAt', 'updatedAt'], data);
            return res.status(200).json(responseData);
        } else {
            return res.status(404).json({
                message: 'Minuman tidak tersedia'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam memanggil list menu minuman by ID'
        });
    }
}



// PUT 

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_minuman, harga, deskripsi } = req.body;

    const data = await minuman.findByPk(id);

    if (!data) {
      return res.status(404).json({
        message: `Minuman dengan id ${id} tidak tersedia`,
      });
    }

    const updatedData = R.compose(
        R.assoc('nama_minuman', nama_minuman),
        R.assoc('harga', harga),
        R.assoc('deskripsi', deskripsi),
        R.assoc('updatedAt', new Date())
      )(data.get({ plain: true }));
  
      await minuman.update(updatedData, { where: { id } });
  
      return res.status(200).json(updatedData);

  } catch (error) {
    return res.status(500).json({
      message: 'Gagal dalam mengaupdate data minuman',
    });
  }
};


// PATCH 

const updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { harga, deskripsi } = req.body;
  
      const data = await minuman.findByPk(id);
  
      if (!data) {
        return res.status(404).json({
          message: `Minuman dengan id ${id} tidak tersedia`,
        });
      }
  
      const updatedData = R.compose(
          R.assoc('harga', harga),
          R.assoc('deskripsi', deskripsi),
          R.assoc('updatedAt', new Date())
        )(data.get({ plain: true }));
    
        await minuman.update(updatedData, { where: { id } });
    
        return res.status(200).json(updatedData);
  
    } catch (error) {
      return res.status(500).json({
        message: 'Gagal dalam mengaupdate data minuman',
      });
    }
  };



// DEL 


const deleteData = async (req, res) => {
    try {
        const minumanId = req.params.id;
        const data = await minuman.findByPk(minumanId)

        if (!data) {
            return res.status(404).json({
                message: `Minuman dengan id ${minumanId} tidak tersedia`
            })
        }

        const namaMinuman = R.prop('nama_minuman', data);

        await data.destroy();

        res.status(200).json({
            message: `Minuman ${namaMinuman} telah dihapus`
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam menghapus minuman, silahkan coba lagi'
        });
    }
}





module.exports = {createNew, getAll, getById, update, updateStatus, deleteData}






  
