
const R = require('ramda');
const {makanan, minuman, pesanan} = require('../models');


//POST 


const createNew = async (req, res) => {
    try {
        const { makananId, jumlah_makanan, minumanId, jumlah_minuman } = req.body;
        const Makanan = await makanan.findByPk(makananId);
        const Minuman = await minuman.findByPk(minumanId);
        const user = req.authUser;

        const notFoundResponse = (itemType) => res.status(404).json({ message: `${itemType} yang di pesan tidak tersedia` });

        if (!Makanan) {
            return notFoundResponse("Makanan");
        }
        if (!Minuman) {
            return notFoundResponse("Minuman");
        }

        const hargaMakanan = R.propOr(0, 'harga', Makanan);
        const hargaMinuman = R.propOr(0, 'harga', Minuman);
        const jumlah = R.add(R.multiply(hargaMakanan, jumlah_makanan), R.multiply(hargaMinuman, jumlah_minuman));

        const cetak_struk = await pesanan.create({
            userId: R.path(['id'], user),
            makananId: R.path(['id'], Makanan),
            jumlah_makanan,
            minumanId: R.path(['id'], Minuman),
            jumlah_minuman,
            totalHarga: jumlah
        });

        await cetak_struk.reload({
            include: [
                {
                    model: makanan,
                    as: "Makanan yang dipesan :", 
                },
                {
                    model: minuman,
                    as: "Minuman yang dipesan :", 
                },
            ],
        });


        return res.status(201).json({ cetak_struk });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Gagal membuat pesanan'
        });
    }
};


// GET 

const getAll = async (req, res) => {
    try {
        const list_pesanan = await pesanan.findAll({
            include: R.pipe(
                R.append({ model: makanan, as: 'Makanan yang dipesan :' }),
                R.append({ model: minuman, as: 'Minuman yang dipesan :' })
            )([]),
        });

        return res.status(200).json({ list_pesanan });
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam memanggil list pesanan',
        });
    }
};



// GET BY ID
const getById = async (req, res) => {
    try {
        const pesananId = req.params.id; // Ambil ID pesanan dari parameter URL
        const pesananData = await pesanan.findByPk(pesananId, {
            include: [
                { model: makanan, as: 'Makanan yang dipesan :' },
                { model: minuman, as: 'Minuman yang dipesan :' }
            ]
        });

        if (pesananData) {
            return res.status(200).json({ pesanan: pesananData });
        } else {
            return res.status(404).json({ message: `Pesanan dengan id ${pesananId} tidak ditemukan` });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam memanggil pesanan',
        });
    }
};




// PUT 

const update = async (req, res) => {
    try {
        const pesananId = req.params.id;
        const { makananId, jumlah_makanan, minumanId, jumlah_minuman } = req.body;
        const data = await pesanan.findByPk(pesananId);
        const food = await makanan.findByPk(makananId); // ganti makanan dengan nama model sesuai dengan kode Anda
        const foodPrice = food.harga;
        const drink = await minuman.findByPk(minumanId); // ganti minuman dengan nama model sesuai dengan kode Anda
        const drinkPrice = drink.harga;

        if (!data) {
            return res.status(404).json({
                status: 'Failed',
                message: `Makanan dengan id ${pesananId} tidak tersedia`
            });
        }

        const calculatedTotalHarga = (foodPrice * jumlah_makanan) + (drinkPrice * jumlah_minuman);


        // Fungsi-fungsi Ramda untuk mengganti properti objek
        const updateDataWithTotalHarga = R.compose(
            R.when(R.always(makananId), R.assoc('makananId', makananId)),
            R.when(R.always(jumlah_makanan), R.assoc('jumlah_makanan', jumlah_makanan)),
            R.when(R.always(minumanId), R.assoc('minumanId', minumanId)),
            R.when(R.always(jumlah_minuman), R.assoc('jumlah_minuman', jumlah_minuman)),
            R.assoc('totalHarga', calculatedTotalHarga),
        );

        // Mengganti data pada objek Sequelize
        const updatedDataWithTotalHarga = updateDataWithTotalHarga(data.get());
        
        // Simpan perubahan ke database
        await data.update(updatedDataWithTotalHarga);

        return res.status(200).json({
            id: updatedDataWithTotalHarga.id,
            userId: updatedDataWithTotalHarga.userId,
            makananId: updatedDataWithTotalHarga.makananId,
            jumlah_makanan: updatedDataWithTotalHarga.jumlah_makanan,
            minumanId: updatedDataWithTotalHarga.minumanId,
            jumlah_minuman: updatedDataWithTotalHarga.jumlah_minuman,
            totalHarga: updatedDataWithTotalHarga.totalHarga,
            createdAt: updatedDataWithTotalHarga.createdAt,
            updatedAt: updatedDataWithTotalHarga.updatedAt,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Gagal dalam mengupdate pesanan'
        });
    }
}







// DEL 
const deleteData = async (req, res) => {
    try {
        const pesananId = req.params.id;
        const data = await pesanan.findByPk(pesananId)

        if (!data) {
            return res.status(404).json({
                message: `Pesanan dengan id ${pesananId} tidak tersedia`
            })
        }

        await data.destroy();

        res.status(200).json({
            message: `Pesanan dengan id ${pesananId} telah dihapus`
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Gagal dalam menghapus makanan'
        });
    }
}




module.exports = {createNew, getAll, getById, update, deleteData}

