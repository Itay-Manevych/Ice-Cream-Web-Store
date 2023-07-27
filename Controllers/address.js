import { AddressService } from "../Services/address";

const createAddress = async (req, res) => {
    try {
        const new_address = await AddressService.createAddress(req.body);
        await res.status(201).json(new_address);
    }
    catch(error) {
        res.status(500).json({
        error: 'Error creating an address', 
        message: error.message
        });
    }
}

const getAddressById = async (req, res) => {
    try {
        const address = await AddressService.getAddressById(req.body.id);
        res.status(201).json(address);
    }
    catch(error) {
        res.status(500).json({
            error: 'Error finding an address by id',
            message: error.message
        });
    }
}

const getAllAddresses = async (req, res) => {
    try {
        const addresses = await AddressService.getAllAddresses();
        res.status(201).json(addresses);
    }
    catch(error) {
        res.status(500).json({
            error: `Error getting all addresses`,
            message: error.message
        })
    }
}

const updateAddress = async (req, res) => {
    try {
        const updated_address = AddressService.updateAddress(req.body.id,req.body);
        res.status(201).json(updated_address);
    } 
    catch(error) {
        res.status(500).json({
            error: 'Error updating an instance',
            message: error.message
        })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const deleted_instance = AddressServices.deleteAddress(req.body.id);
        res.status(201).json(deleted_instance);
    }
    catch(error) {
        res.status(500).json({
            error: 'Error deleting an instance',
            message: error.message
        })
    }
}