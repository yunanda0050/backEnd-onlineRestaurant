
const {makanan, pesanan} = require('../models');
const R = require('ramda');


//POST 
const createNew = async (req, res) => {
    try {
        const { nama_makanan, harga, deskripsi } = req.body;

        const createMakanan = R.pick(['nama_makanan', 'harga', 'deskripsi'], req.body);

        const data = await makanan.create(createMakanan);

        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam membuat menu makanan baru'
        });
    }
}



// GET 
const getAll = async (req, res) => {
    try {
        const list_makanan = await makanan.findAll();
        const response = R.pick(['list_makanan'], { list_makanan });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam memanggil list menu makanan',
        });
    }
};


//GET BY ID 
const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await makanan.findByPk(id);

        if (data) {
            const responseData = R.pick(['id', 'nama_makanan', 'harga', 'deskripsi', 'createdAt', 'updatedAt'], data);
            return res.status(200).json(responseData);
        } else {
            return res.status(404).json({
                message: `Makanan dengan id ${id} tidak ditemukan`
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam memanggil list menu makanan by ID'
        });
    }
}



// PUT 

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_makanan, harga, deskripsi } = req.body;

    const data = await makanan.findByPk(id);

    if (!data) {
      return res.status(404).json({
        message: `Makanan dengan id ${id} tidak tersedia`,
      });
    }

    const updatedData = R.compose(
        R.assoc('nama_makanan', nama_makanan),
        R.assoc('harga', harga),
        R.assoc('deskripsi', deskripsi),
        R.assoc('updatedAt', new Date())
      )(data.get({ plain: true })); // Gunakan get({ plain: true }) untuk mendapatkan data dalam bentuk plain JavaScript object
  
      await makanan.update(updatedData, { where: { id } });
  
      return res.status(200).json(updatedData);

  } catch (error) {
    return res.status(500).json({
      message: 'Gagal dalam mengaupdate data makanan',
    });
  }
};


// PATCH 

const updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { harga, deskripsi } = req.body;
  
      const data = await makanan.findByPk(id);
  
      if (!data) {
        return res.status(404).json({
          message: `Makanan dengan id ${id} tidak tersedia`,
        });
      }
  
      const updatedData = R.compose(
          R.assoc('harga', harga),
          R.assoc('deskripsi', deskripsi),
          R.assoc('updatedAt', new Date())
        )(data.get({ plain: true })); 
    
        await makanan.update(updatedData, { where: { id } });
    
        return res.status(200).json(updatedData);
  
    } catch (error) {
      return res.status(500).json({
        message: 'Gagal dalam mengaupdate data makanan',
      });
    }
  };



// DEL 


const deleteData = async (req, res) => {
    try {
        const makananId = req.params.id;
        const data = await makanan.findByPk(makananId)

        if (!data) {
            return res.status(404).json({
                message: `Makanan dengan id ${makananId} tidak tersedia`
            })
        }

        const namaMakanan = R.prop('nama_makanan', data);

        await data.destroy();

        res.status(200).json({
            message: `Makanan ${namaMakanan} telah dihapus`
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam menghapus makanan, silahkan coba lagi'
        });
    }
}





module.exports = {createNew, getAll, getById, update, updateStatus, deleteData}






  
