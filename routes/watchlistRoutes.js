const router = require('express').Router();
const verify = require('./verifyToken');

const User = require('../models/user.model');
const Flix = require('../models/flix.model');

router.post('/add', verify, async (req, res) => { 
    if (req.headers.email) {
        let userEmail = req.headers.email;
        let flixID = req.body.flixID;

        try {
            let user = await User.findOne({email: userEmail});
            let flix = await Flix.findOne({ flixID: flixID, userID: user._id });
            if (flix) {
                return res.json('Flix already saved!')
            } else {
                flix = new Flix({
                    flixID: flixID,
                    userID: user._id,
                    overview: req.body.overview,
                    title: req.body.title,
                    voteAverage: req.body.voteAverage,
                    voteCount: req.body.voteCount,
                    runtime: req.body.runtime,
                    releaseDate: req.body.releaseDate,
                    homepage: req.body.homepage,
                    posterPath: req.body.posterPath,
                    backdropPath: req.body.backdropPath,
                    date: new Date()
                });
                flix.save()
                    .then( () => {
                        res.json('Flix saved!');
                    })
                    .catch( err => {
                        console.log(err)
                        res.status(400).json('Error: ' + err)
                    });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server Error');
        }
    }

})

router.get('/get', verify, async (req, res) => {
    if (req.headers.email) {
        let userEmail = req.headers.email;
        let user = await User.findOne({email: userEmail});

        await Flix.find({userID: user._id})
            .then(flix => {
                res.json(flix)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
})

router.delete('/:id', verify, async (req,res) => {
    if (req.headers.email) {
        let userEmail = req.headers.email;
        let user = await User.findOne({email: userEmail});
        await Flix.findOneAndDelete({flixID: req.params.id, userID: user._id})
            .then(flix => res.json('Flix deleted!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});

module.exports = router;