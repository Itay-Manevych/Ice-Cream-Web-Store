
function makeAllRequired(schema) {
    for (let i in schema.paths) {
        const attribute = schema.paths[i]
        if (attribute.isRequired == undefined) {
            attribute.required(true);
        }
    }
}
export default makeAllRequired;