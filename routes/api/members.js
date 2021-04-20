const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

// Gets all members
router.get('/', (req, res) => {
    res.json(members);
});

// Get single member
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(m => m.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: 'Member not found'});
    }
});

// Create member
router.post('/', (req, res) => {
   // res.send(res.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name
    }

    if (!newMember.name) {
        return res.status(400).json({ message: 'Please include name' });
    }

    members.push(newMember);

    res.json(members);
    // res.redirect('/');
});

// Update member
router.put('/:id', (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;

        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
            }
        });

        res.json({ msg: 'Member was updated', member })

    } else {
        res.status(400).json({ msg: 'Member not found'});
    }
});


// Delete member
router.delete('/:id', (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Member deleted',
            members: members.filter(m => m.id === parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: 'Member not found'});
    }
});

module.exports = router;