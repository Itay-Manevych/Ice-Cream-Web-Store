import { AddressService } from "../Services/address.js";

const createAddress = async (req, res) => {
    try {
        const new_address = await AddressService.createAddress(req.body);
        res.status(201).json(new_address);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating an address model", 
        message: error.message,
        });
    }
}

const getAddressById = async (req, res) => {
    try {
        const address = await AddressService.getAddressById(req.params.id);
        if(!address) {
            throw new Error("There is not an existing address model with that id");
        }
        res.status(201).json(address);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding an address model by id",
            message: error.message,
        });
    }
}

const getAllAddresses = async (req, res) => {
    try {
        const addresses = await AddressService.getAllAddresses();
        if(!addresses) {
            throw new Error("There are no existing address models");
        }
        res.status(201).json(addresses);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all address models",
            message: error.message,
        })
    }
}

const updateAddress = async (req, res) => {
    try {
        const updated_address = await AddressService.updateAddress(req.body.id, req.body);
        res.status(201).json(updated_address);
    }
    catch(error) {
        res.status(500).json({
            error: "Error updating an address model",
            message: error.message,
        })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const deleted_address = await AddressService.deleteAddress(req.body.id);
        if(!deleted_address) {
            throw new Error("The address model you are trying to delete does not exist");
        }
        res.status(201).json(deleted_address);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting an address model",
            message: error.message,
        })
    }
}

export const AddressController = {createAddress, getAddressById, getAllAddresses, updateAddress, deleteAddress};