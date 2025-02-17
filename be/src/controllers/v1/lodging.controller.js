const Lodging = require("../../models/lodging.model");

// Tạo mới Lodging với nhiều ảnh
exports.createLodging = async (req, res) => {
    try {
        console.log("chào create");
        // const { name, price } = req.body;
        const fileData = req.file;
        console.log(fileData);

        // const imageUrls = req.files.map(file => file.path); 
        // if (!name || !price || imageUrls.length === 0) {
        //     return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
        // }
        // const newLodging = new Lodging({ name, price, imageUrls });
        // await newLodging.save();
        res.status(201).json({
            message:"ok"
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Lấy tất cả Lodging
exports.getAllLodgings = async (req, res) => {
    try {
        const lodgings = await Lodging.find();
        res.json(lodgings);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};
