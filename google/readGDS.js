const { yyyymmdd } = require('./util')

exports.readGDS = async (req, res) => {
    try {
        const { Datastore } = require('@google-cloud/datastore');
        const datastore = new Datastore({
            projectId: 'tribal-isotope-228803',
            keyFilename: 'tribal-isotope-228803-8d000bd04e4c.json'
        });
        const kindName = ['posts', yyyymmdd(new Date())];
        const key = datastore.key(kindName);
        datastore.get(key, function(err, entity) {
            res.status(200).send(entity);
        }); 

    } catch (error) {
        console.error('ERROR:', error);

    }
}