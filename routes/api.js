const express = require('express');

const router = express.Router();

const PoesiaPost = require('../models/PoesiaPost');
const RicettaPost = require('../models/RicettaPost');


// Routes
router.get('/poesia', (req, res) => {

    PoesiaPost.find({  })
        .then((data) => {
            // console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post('/save/poesia', (req, res) => {
    const data = req.body;
    const payload_data = {
        intro: data.intro,
        desc: data.desc,
        poesia: data.poesia
      };

    const newPoesiaPost = new PoesiaPost(payload_data);
    if(data.pwd=="poesiaPienessere2020"){
        newPoesiaPost.save((error) => {
            if (error) {
                res.status(500).json({ msg: 'Sorry, internal server errors' });
                return;
            }
            // BlogPost
            return res.json({
                msg: 'Your data has been saved!!!!!!'
            });
        });
    }else{
        res.status(500).json({ msg: 'Sorry, wrong password' });
    }
   
});

router.delete('/delete/poesia', (req, res) => {
    const data = req.body;
   
    if(data.pwd=="poesiaPienessere2020"){
        PoesiaPost.findOneAndRemove({_id: data._id }, 
            function (err, docs) { 
            if (err){ 
                res.status(500).json({ msg: 'Sorry, internal server errors' });
                return;
            } 
            else{ 
                return res.json({
                    msg: 'Removed post'+docs
                });
            } 
        }); 
    }else{
        res.status(500).json({ msg: 'Sorry, wrong password' });
    }

});

//-------------------------------RICETTA-----------------------------------------------------------------

router.get('/ricetta', (req, res) => {

    RicettaPost.find({  })
        .then((data) => {
            // console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post('/save/ricetta', (req, res) => {
    const data = req.body;
    // console.log(data)
    const payload_data = {
        title:data.title,
        desc: data.desc,
        ricetta: data.ricetta,
        preparazione:data.preparazione
      };

    const newRicettaPost = new RicettaPost(payload_data);
    if(data.pwd=="ricettaPienessere2020"){
        newRicettaPost.save((error) => {
            if (error) {
                res.status(500).json({ msg: 'Sorry, internal server errors' });
                return;
            }
            // BlogPost
            return res.json({
                msg: 'Your data has been saved!!!!!!'
            });
        });
    }else{
        res.status(500).json({ msg: 'Sorry, wrong password' });
    }
   
});

router.delete('/delete/ricetta', (req, res) => {
    const data = req.body;
   
    if(data.pwd=="ricettaPienessere2020"){
        RicettaPost.findOneAndRemove({_id: data._id }, 
            function (err, docs) { 
            if (err){ 
                res.status(500).json({ msg: 'Sorry, internal server errors' });
                return;
            } 
            else{ 
                return res.json({
                    msg: 'Removed post'+docs
                });
            } 
        }); 
    }else{
        res.status(500).json({ msg: 'Sorry, wrong password' });
    }

});


module.exports = router;