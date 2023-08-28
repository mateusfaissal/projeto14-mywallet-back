export function validateSchema(schema) {
    return (req, res, next) => {

        const { type } = req.params;
        const { value, description } = req.body;
        
        let validation;

        if(type === undefined || type === null) {
            validation = schema.validate(req.body, {abortEarly: false});
        } else {
            validation = schema.validate({value, type, description}, {abortEarly: false});
        }

        if (validation.error) {
            const errors = validation.error.details.map(det => det.message)
            return res.status(422).send(errors)
        }

        next()
    }
}