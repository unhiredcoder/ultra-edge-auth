const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        fullname: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        mobile: Joi.string()
            .pattern(/^[0-9]{10}$/) // Ensures a 10-digit mobile number
            .required()
            .messages({ 'string.pattern.base': 'Mobile must be a 10-digit number' }),
        password: Joi.string().min(4).pattern(/^(?=.*[A-Za-z])(?=.*\d).{4,}$/).max(50).required().messages({
            "string.pattern.base": "Password must contain at least one letter and one number"})
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
