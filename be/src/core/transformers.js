module.exports = class {
    #data;
    constructor(resource){
        if(Array.isArray(resource)){
            this.#data = resource.map((instance) => {
                return this.ressponse(instance);
            })
        } else {
            this.#data = this.ressponse(resource);
        }
        return this.#data;
    }
}