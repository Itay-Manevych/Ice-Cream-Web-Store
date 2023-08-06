import Address from "../Models/Schemas/address.js";

const createAddress = async (data) => {
    const new_address = new Address(data);
    return await new_address.save();
}

const getAddressById = async (id) => {
    return await Address.findById(id);
}

const getAllAddresses = async () => {
    return await Address.find({});    
}

const updateAddress = async (id, updated_data) => {
    return await Address.findByIdAndUpdate(id, updated_data, {new: true});
}

const deleteAddress = async (id) => {
    return await Address.findByIdAndDelete(id);
}

export const AddressService = {createAddress, getAddressById, getAllAddresses, updateAddress, deleteAddress};