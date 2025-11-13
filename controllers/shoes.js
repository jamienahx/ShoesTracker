const shoesModels= require('../models/shoes');

module.exports = {
    displayAllShoes,
    createNewShoe,
    deleteShoe,
    updateShoe
}

function displayAllShoes (req, res) {

    try {
        const displayedShoes = shoesModels.readShoes();
    
        if(!displayedShoes || displayedShoes.length === 0) {
            return res.status(200).json({message:"No shoes found", data: []});
        }

        res.status(200).json(displayedShoes);
    } catch (err) {
        res.status(500).json({message:err.message});
    }


}

function createNewShoe (req,res) {
    try{
        const newShoe = shoesModels.createShoes(req.body);
        res.status(201).json(newShoe);
    }catch(err) {
        res.status(500).json({message:err.message});
    }
}

function deleteShoe(req, res) {
    try{
        const deletedShoe = shoesModels.deleteShoesById(req.params.id);
        if(!deletedShoe) {
            return res.status(404).json({message:"Shoe model not found"});
        }
        res.status(200).json({message:"Successfully deleted"});
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }
}

function updateShoe(req,res) {
    try{
        const updatedShoe = shoesModels.updateShoeById(req.params.id,req.body);
        if(!updatedShoe){
            return res.status(404).json({message:"Shoe model not found"});
        }
        res.status(200).json({message:"Successfully updated"});
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }
}

