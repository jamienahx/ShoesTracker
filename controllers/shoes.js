const shoesModels= require('../models/shoes');

module.exports = {
    displayAllShoes,
    createNewShoe,
    deleteShoe,
    updateShoe,
    searchShoesByCriteria,
    displayShoesById
}

function displayAllShoes (req, res) {

    try {
        const displayedShoes = shoesModels.readShoes();
    
        if(!displayedShoes || displayedShoes.length === 0) {
            return res.status(404).json({message:"No shoes found"});
        }

        res.status(200).json(displayedShoes);
    } catch (err) {
        res.status(500).json({message:err.message});
    }


}

function displayShoesById (req, res) {
    try{
    const displayedShoeId = shoesModels.readShoesById(req.params.id);
     if(!displayedShoeId) {
            return res.status(404).json({message:"Shoe Id not found"});
        }

        res.status(200).json(displayedShoeId);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

function createNewShoe (req,res) {
    try{
        const newShoe = shoesModels.createShoes(req.body);
        res.status(201).json(newShoe);
    }catch(err) {
         if (err.message.includes("required")) {
            return res.status(400).json({ message: err.message });
         }
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
        } catch(err) {
        if (err.message.includes("required")) {
            return res.status(400).json({ message: err.message });      
            }
         res.status(500).json({message:err.message});

        }
    }

    function searchShoesByCriteria(req,res) {
        try {
            const searchedShoe = shoesModels.searchShoes(req.body)
            if(!searchedShoe || searchedShoe.length === 0) {
                return res.status(404).json({message:"Shoe model not found"});
            }
            res.status(200).json({message:"Shoe found!", data: searchedShoe})
        }catch(err) {
            res.status(500).json({message:err.message});
        }

    }


