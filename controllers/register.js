const handleRegister = (req, res, db, bcrypt) =>{
	const {email, name, password } = req.body;

	const hash = bcrypt.hashSync(password);
	if(!email || !name || !password){
		return res.status(400).json('incorrect submission');
	}
	//we first insert in the login table
	db.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
		//return the loginEmail and then use the loginEmail to return another trx transaction
		//to insert into the users then respond with json.
		//inorder to get the information added we have to commit
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
					email:loginEmail[0],
					name:name,
					joined: new Date()

				})
				.then(user => {
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
// bcrypt.compareSync("bacon", hash); // true
// bcrypt.compareSync("veggies", hash); // false
	//if users returns the user registered and return all the columns..if that works, respond


.catch(err => res.status(400).json('unable to register'));

}
module.exports = {
handleRegister: handleRegister
};