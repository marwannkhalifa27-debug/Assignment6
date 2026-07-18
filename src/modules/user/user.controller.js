import userModel from "../../DB/models/users.models.js";

export const signup = async (req,res) => {
    try {
        const existingUser = await userModel.findOne({
            where: { email: req.body.email }
        })

        if(existingUser){
            return res.status(409).json({message:"Email already exists."})
        }

        const user = userModel.build(req.body)
        await user.save()

        return res.status(201).json({message:"User added successfully.", user})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const putUser = async (req,res) => {
    try {
        const { id } = req.params
        const [user,created] = await userModel.upsert(
            {
                id,
                ...req.body
            },
            {
                validate: false
            }
        )
        return res.status(200).json({message:"User has been changed"})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getByEmail = async (req,res) => {
    try {
        const { email } = req.query
        const user = await userModel.findOne(
            {
                where:{
                    email,
                },
            }
        )
        if(!user){
            return res.status(404).json("This user doesn't exist")
        }
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const getByID = async (req,res) => {
    try{
        const { id } = req.params
        const user = await userModel.findByPk(id)
        
        if(!user){
            return res.status(404).json("This user doesn't exist")
        }
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json(error.message)
    }
}