import joi from 'joi'

export async function validateSignUp(req,res,next){
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword:joi.ref('password')
    })
    const {error} = schema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log(error.details)
        res.sendStatus(422)
    }else{
        next()
    }
}
export async function validateSignIn(req,res,next){
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    const {error} = schema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log(error.details)
        res.sendStatus(422)
    }else{
        next()
    }
}