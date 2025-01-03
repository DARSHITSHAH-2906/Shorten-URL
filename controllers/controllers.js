const shortid = require('shortid')
const {url} = require('../models/models')

//Generating short id for requested URL
async function GenerateShortId(req,res){
    const body = req.body;

    if(!body.url){
        //Send some response
        return res.status(400).json({
            error : "Url is required"
        })
    }

    const shortId = shortid();
    await url.create({
        shortenurl: shortId,
        redirecturl: body.url,
        visithistory:[],
        createdby : req.user._id
    });
    // return res.status(201).json({id : shortId});
    res.status(201).redirect("/")

}

//updating the visit history and redirecting to url
async function RedirecttoURL(req , res){
    const id = req.params.id;

    const originalurl = await url.findOne({shortenurl : id});

    if(!originalurl){
        return res.status(404).json({error : "No such short url found"})
    }

    originalurl.visitcount+=1;
    originalurl.visithistory.push({
        timestamp : Date.now.toString(),
        ipaddress : req.ip,
    })

    await originalurl.save();

    return res.redirect(originalurl.redirecturl);

    // return res.status(200).json({URL : originalurl.redirecturl})
}

//deleting the requested url
async function DeleteURL(req , res){
    const id = req.params.id;

    const result = await url.deleteOne({shortenurl : id});

    if(result.deletedCount===0){
        return res.status(404).json({error : "No such short url found"})
    }
    const allurls = await url.find({});
    res.status(201).redirect("/" );
}

//Analytics of requested URL
async function GetAnalytics(req, res){
    const id = req.params.id;

    const originalurl = await url.findOne({shortenurl : id});

    if(!originalurl){
        return res.status(404).json({error : "No such short url found"})
    }    

    return res.json({Totalvisited : originalurl.visitcount , 
        Analytics : originalurl.visithistory
    });
}

module.exports = {
    GenerateShortId,
    RedirecttoURL,
    DeleteURL,
    GetAnalytics
}