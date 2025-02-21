const Lodging = require("../../models/lodging.model");
const { deleteImagesFromCloudinary } = require("../../utils/cloudinaryUtils");
module.exports = {
    createLodging: async (req, res) => {
        try {
            const { name, price } = req.body;
            const imageUrls = req.files.map(file => file.path);
            if (!name || !price || imageUrls.length === 0) {
                return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
            }
            const newLodging = new Lodging({ name, price, imageUrls });
            await newLodging.save();
            res.status(201).json(newLodging);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error });
        }
    },
    getAllLodgings : async (req, res) => {
        try {
            const lodgings = await Lodging.find();
            res.json(lodgings);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error });
        }
    },
    updateLogding: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price } = req.body;
    
            let lodging = await Lodging.findById(id);
            if (!lodging) return res.status(404).json({ message: "Lodging không tồn tại" });
            // Nếu có ảnh mới, xóa ảnh cũ trước
            if (req.files.length > 0) {
                await deleteImagesFromCloudinary(lodging.imageUrls);
            }
            // Lưu ảnh mới vào database
            const imageUrls = req.files.map(file => file.path);
    
            lodging.name = name || lodging.name;
            lodging.price = price || lodging.price;
            lodging.imageUrls = imageUrls.length > 0 ? imageUrls : lodging.imageUrls;
            await lodging.save();
    
            res.json({ message: "Cập nhật thành công", lodging });
        } catch (error) {
            res.status(500).json({ message: "Lỗi cập nhật lodging", error });
        }
    },
    deleteLodging:  async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id);
            let lodging = await Lodging.findById(id);
            console.log(lodging);
            
            if (!lodging) return res.status(404).json({ message: "Lodging không tồn tại" });
            // Xóa tất cả ảnh của lodging trên Cloudinary
             await deleteImagesFromCloudinary(lodging.imageUrls);
            // Xóa lodging trong database
            await Lodging.findByIdAndDelete(id);
            res.json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa lodging", error });
        }
    }
}


