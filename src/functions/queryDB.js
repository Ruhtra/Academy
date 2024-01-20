const { ObjectId } = require("mongodb");
const { connect, connectSession } = require('../config/mongoDB.js')

async function testConnect() {
    const db = await connect();
    await db.command({ ping: 1 })
    return ("  ~ Successfully connected to MongoDB!");
}

function criarDataComHora(data, hora) {
    //Tratando os dados
    const dataSemTempo = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    const [horas, minutos] = hora.split(':').map(Number);

    // Adicione as horas e minutos à data sem tempo
    const dataComHora = new Date(dataSemTempo);
    dataComHora.setHours(horas);
    dataComHora.setMinutes(minutos);
    
    return dataComHora;
}

function convert(data) {
    data.musculos = data.musculos.map(e => new ObjectId(e))


    data.data = new Date()
    data.inicio = criarDataComHora(data.data, data.inicio)
    data.fim = criarDataComHora(data.data, data.fim)
    return data;
}


const gym = {
    get: async (userid) => {
        const db = await connect();
        return await db.collection('treino').findOne({
            _id: new ObjectId(userid)
        }) 
    },
    post: async(data) => {
        const { session, db } = await connectSession();
        try {
            session.startTransaction();

            // validate ids
            if (data.musculos != undefined) {
                promises = data.musculos.map(async (id) => {
                    let find = await db.collection('musculos').findOne({_id: new ObjectId(id)})
                    if (!find) throw new Error("Musculo id não encontrado")
                })
                await Promise.all(promises);
            }


            let response = await db.collection('treino').insertOne(convert(data))
            
            await session.commitTransaction()
            return response
        } catch (err) {
            session.abortTransaction()
            throw err
        } finally { session.endSession(); }
    }
}

const user = {
    get: async (userid) =>  {
        const db = await connect();
        return await db.collection('user').findOne({
            _id: new ObjectId(userid)
        }) 
    }
}


const auth = {
    login: async (username) => {
        const db = await connect();
        return await db.collection('user').findOne({
            username: username
        })
    }
}

module.exports = {
    user,
    gym,
    auth,
    testConnect
}