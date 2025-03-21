const { default: mongoose } = require("mongoose");
const Lodging = require("../../models/lodging.model");
const LodgingType = require("../../models/lodgingtype.model");
const User = require("../../models/user.model");
const { deleteImagesFromCloudinary } = require("../../utils/cloudinaryUtils");
const { errorResponse, successResponse } = require("../../utils/response");

module.exports = {
  createLodging: async (req, res) => {
    try {
      const {
        name,
        price,
        address,
        description,
        title,
        area,
        detail_address,
        type,
      } = req.body;

      const imageUrls = req.files.map((file) => file.path);
      if (!name || !price || imageUrls.length === 0) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
      }
      const user = req.user;

      const newLodging = new Lodging({
        name,
        price,
        images: imageUrls,
        address,
        description,
        title,
        area,
        detail_address,
        user: user.UID,
        type,
      });
      await newLodging.save();
      res.status(201).json(newLodging);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
  getAllLodgings: async (req, res) => {
    try {
      // Giả sử limit mặc định là 5, bạn có thể thay đổi giá trị này thành 8 nếu cần
      const { price, address, area, page = 1, limit = null } = req.query;
      console.log(req.query.address);
      const filter = { status: 1 };
      // Lọc theo địa chỉ
      if (address) {
        const regexAddress = new RegExp(
          address
            .split(",")
            .map((part) => part.trim())
            .join(".*"),
          "i"
        );
        filter.address = { $regex: regexAddress };
      }

      // Lọc theo giá
      if (price) {
        const priceRanges = {
          "Dưới 1 triệu": [0, 1000000],
          "1 - 2 triệu": [1000000, 2000000],
          "2 - 3 triệu": [2000000, 3000000],
          "3 - 5 triệu": [3000000, 5000000],
          "5 - 7 triệu": [5000000, 7000000],
          "7 - 10 triệu": [7000000, 10000000],
          "10 - 15 triệu": [10000000, 15000000],
          "Trên 15 triệu": [15000000, Infinity],
        };
        const [min, max] = priceRanges[price] || [0, Infinity];
        filter.price = { $gte: min, $lte: max };
      }

      // Lọc theo diện tích
      if (area) {
        const areaRanges = {
          "Dưới 20 m²": [0, 20],
          "20 - 30 m²": [20, 30],
          "30 - 50 m²": [30, 50],
          "50 - 70 m²": [50, 70],
          "70 - 90 m²": [70, 90],
          "Trên 90 m²": [90, Infinity],
        };
        const [min, max] = areaRanges[area] || [0, Infinity];
        filter.area = { $gte: min, $lte: max };
      }
      // TEXT {
      //   filter.type = "id"
      // }
      // Tính skip dựa trên page
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const total = await Lodging.countDocuments(filter);

      // Query Lodging và áp dụng limit nếu có
      const query = Lodging.find(filter).skip(skip);

      if (limit) {
        query.limit(parseInt(limit)); // Áp dụng limit nếu limit có giá trị
      }

      const listings = await query
        .populate({ path: "type", select: "name -_id" })
        .populate({ path: "user", select: "fullname email phoneNumber -_id" });

      res.json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
        listings,
      });
    } catch (error) {
      console.error("Lỗi API:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  },

  getAllLodgingTypes: async (req, res) => {
    try {
      const lodgingTypes = await LodgingType.find({}).select("name");
      res.json(lodgingTypes);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getLodgingByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return errorResponse(res, "User not found", 404, "User không tồn tại");
      }
      const lodgings = await Lodging.find({ user: userId }).populate({
        path: "type",
        select: "name _id",
      });
      return successResponse(res, lodgings, {}, 200, "Lấy dữ liệu thành công");
    } catch (error) {
      return errorResponse(res, error.message, 500, error.message);
    }
  },
  updateStatusLoding: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, userId } = req.body;

      // Validate input
      if (status !== 0 && status !== 1) {
        return res.status(400).json({
          message: "Trạng thái không hợp lệ. Chỉ chấp nhận giá trị 0 hoặc 1.",
        });
      }
      // Validate id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID phòng trọ không hợp lệ" });
      }
      // Check if the lodging exists and belongs to the user
      const lodging = await Lodging.findOne({ _id: id, user: userId });
      if (!lodging) {
        return res.status(404).json({
          message: "Không tìm thấy phòng trọ hoặc bạn không có quyền cập nhật.",
        });
      }
      lodging.status = status;
      await lodging.save();
      return res.status(200).json({
        message: `Đã ${status === 1 ? "mở" : "đóng"
          } trạng thái phòng thành công.`,
        status,
      });
    } catch (error) {
      console.error("Error toggling lodging status:", error);
      return res
        .status(500)
        .json({ message: "Lỗi server khi cập nhật trạng thái phòng." });
    }
  },

  updateLodging: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        title,
        price,
        area,
        detail_address,
        existingImages,
      } = req.body;
      const filteredImages = existingImages.filter((img) => img !== "undefined");
      console.log("dang filter", filteredImages);
      
      const address = req.body.location || req.body.address;
      const newImageFiles = req.files || [];
      const newImageUrls = [];
      if (newImageFiles.length > 0) {
        newImageFiles.forEach((file) => {
          newImageUrls.push(file.path);
        });
      }
      const allImages = [...filteredImages, ...newImageUrls];
      if (allImages.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one image is required",
        });
      }
      const updateData = {
        name,
        description,
        title,
        price,
        area,
        detail_address,
        images: allImages,
      };
      if (address) {
        updateData.address = address;
      }
      console.log("Update data:", updateData);
      const updatedLodging = await Lodging.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedLodging) {
        return res.status(404).json({
          success: false,
          message: "Lodging not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Lodging updated successfully",
        data: updatedLodging,
      });
    } catch (error) {
      console.error("Error updating lodging:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update lodging",
        error: error.message,
      });
    }
  },
};
