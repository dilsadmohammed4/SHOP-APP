import mongoose from "mongoose";

export class DBUtil {
    public static connectToDb(dbUrl: string, dbName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            mongoose.connect(dbUrl, {
                dbName: dbName
            }).then(() => {
                resolve("Db connection Success")
            }).catch((error) => {
                if (error) {
                    console.log(error)
                    reject("Db connection Failed")
                }
            })
        })
    }
}