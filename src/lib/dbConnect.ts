import mongoose from "mongoose";


type ConnectionObject={
    isConnected?: number 
}
const Connection: ConnectionObject= {}

async function connect() {
    if(Connection.isConnected) {
        console.log("already connected");
        return;
        }


try{
    await mongoose.connect(process.env.MONGODB_URI="")
    Connection.isConnected = Date.now()
    console.log("connected to db")
    }catch(error){
        console.log("error connecting to db",error)
        process.exit(1)
        }
        }
        export default connect;  //exporting the function connect
        
      
   




