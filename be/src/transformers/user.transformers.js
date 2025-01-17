const Transformer = require("../core/transformers");
module.exports = class extends Transformer {
    ressponse(instance){
        return {
            UID: instance.id,
            name: instance.fullname,
            email: instance.email,
            status: instance.status,
            address: instance.address,
            createAt: instance.created_at,
            updateAt: instance.updated_at
        };
    };
};