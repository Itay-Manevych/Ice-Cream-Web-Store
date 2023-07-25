
const createInstance = async (Model, data) => {
    const model_instance= new Model(data);
    return await model_instance.save();
}

const getInstanceById = async (Model, id) => {
    return await Model.getModelById(id);
}

const getAllInstances = async (Model) => {
    return await Model.find({});    
}

const updateInstance = async (Model, id, updated_data) => {
    return await Model.findByIdAndUpdate(id,updated_data,{new: true});
}

const deleteInstance = async (Model, id) => {
    return await Model.findByIdAndDelete(id);
}

export const ModelServices = {createInstance, getInstanceById, getAllInstances, updateInstance, deleteInstance};
