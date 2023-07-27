// import { ModelServices } from "../Services/ModelServices";

// export const modelController = (Model) => ({

//     createInstance: async (req, res) => {
//         try {
//             const new_instance = ModelServices.createInstance(Model,req.body);
//             res.status(201).json(new_instance);
//         }
//         catch(error) {
//             res.status(500).json({
//             error: 'Error creating an instance', 
//             message: error.message
//             });
//         }
//     },

//     getInstanceById: async (req, res) => {
//         try {
//             const instance = ModelServices.getInstanceById(Model, req.body.id);
//             res.status(201).json(instance);
//         }
//         catch(error) {
//             res.status(500).json({
//                 error: 'Error finding an instance by id',
//                 message: error.message
//             });
//         }
//     },
    
//     getAllInstances: async (req, res) => {
//         try {
//             const instances = ModelServices.getAllInstances(Model);
//             res.status(201).json(instances);
//         }
//         catch(error) {
//             res.status(500).json({
//                 error: `Error getting all instances of ${Model}`,
//                 message: error.message
//             })
//         }
//     },

//     updateInstance: async (req, res) => {
//         try {
//             const updated_instance = ModelServices.updateInstance(Model,req.body);
//             res.status(201).json(updated_instance);
//         }

//         catch(error) {
//             res.status(500).json({
//                 error: 'Error updating an instance',
//                 message: error.message
//             })
//         }
//     },

//     deleteInstance: async (req, res) => {
//         try {
//             const deleted_instance = ModelServices.deleteInstance(Model, req.body);
//             res.status(201).json(deleted_instance);
//         }

//         catch(error) {
//             res.status(500).json({
//                 error: 'Error in deleting an instance',
//                 message: error.message
//             })
//         }
//     },

// })