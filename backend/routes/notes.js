const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get All notes using GET ""
router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");      
    }
})


//ROUTE 2: Add a new note using: POST "/api/auth/addnote" .Login required 
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
    
], async (req, res)=>{

    try {
        const {title, description, tag } = req.body;
        //if there are errors return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }    
})

//ROUTE 3: Update an existing note using: PUT "/api/auth/updatenote" .Login required 
router.put('/updatenote/:id',fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    try {
        //Create a new Note object
        const newNote = {};
        if(title){
            newNote.title = title
        }
        if(description){
            newNote.description = description
        }
        if(tag){
            newNote.tag = tag
        }

        //Find the note to be Updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found")
        }

        if(note.user.toString() !== req.user.id){
            return res.staus(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }  
})


//ROUTE 4: Delete an existing note using: DELETE "/api/auth/deletenote" .Login required 
router.delete('/deletenote/:id',fetchuser, async (req, res)=>{
    
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found")
        }

        //Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.staus(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }  
})


module.exports = router;