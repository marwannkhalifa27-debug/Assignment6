import { Sequelize } from "sequelize"

export const sequelize = new Sequelize("social", "root", "123456", {
    dialect:"mysql",
    host:"localhost"
})

export const connectionDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established")
    } catch (error) {
        console.log(error.message)
    }
}
export const syncDB = async () => {
    try {
        await sequelize.sync({alter:false, force:false})
        console.log("syncDB has been established")
    } catch (error) {
        console.log(error.message)
    }
}