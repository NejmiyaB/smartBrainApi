//moved our Api key to back end for security purposes
const Clarifai = require('clarifai');
const app =  new Clarifai.App({
  apiKey:'c3aa6b0ccb3f4526856c775da01f0510'
});

const handleApiCall = (req, res) => {
app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)

    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'));
}
const handleImage = (req, res, db) =>{
const {id} = req.body;
	
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries =>{
  	res.json(entries[0]);
  })
  
  .catch(err => res.status(400).json('unable to get entries'))
			//res.status(404).json('not found');
		
		
	}	
	
module.exports = {
handleImage : handleImage,
handleApiCall :handleApiCall
};
