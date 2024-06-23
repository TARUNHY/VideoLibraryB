var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var cors = require('cors');
require('dotenv').config();

var mongoUrl = process.env.MONGODB_URL;

var port = process.env.PORT || 5000; 
var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

console.log(`Connecting to MongoDB at ${mongoUrl}`);

app.get('/get-admin',(req,res)=>{
    mongoClient.connect(mongoUrl).then(clientObj=>{
        var database = clientObj.db('video-Library');
        database.collection('tableadmin').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })

    })
})
app.get('/get-category',(req,res)=>{
    mongoClient.connect(mongoUrl).then(clientObj=>{
        var database = clientObj.db('video-Library');
        database.collection('tablecategory').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })

    })
})
app.post('/add-videos',(req, res)=>{
    mongoClient.connect(mongoUrl).then(clientObj=>{

        var video = {
            VideoId :parseInt( req.body.VideoId),
            Title : req.body.Title,
            Url : req.body.Url,
            Description : req.body.Description,
            Likes : parseInt(req.body.Likes),
            Dislikes : parseInt(req.body.Dislikes),
            CategoryId : parseInt(req.body.CategoryId)
        }
        var database = clientObj.db('video-Library');
        database.collection('tablevideos').insertOne(video).then(()=>{
            console.log("Video Added");
            res.end();
        })
      

    })
});

app.get('/get-videos',(req,res)=>{
    mongoClient.connect(mongoUrl).then(clientObj=>{
        var database = clientObj.db('video-Library');
        database.collection('tablevideos').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })

    })
});

app.get('/get-video/:id',(req,res)=>{

    var id = parseInt(req.params.id);
    mongoClient.connect(mongoUrl).then(clientObj=>{
        var database = clientObj.db('video-Library');
        database.collection('tablevideos').find({VideoId:id}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })

    })
});


app.put('/edit-video/:VideoId',(req, res)=>{
    mongoClient.connect(mongoUrl).then(clientObj=>{
        var VideoId = parseInt(req.params.VideoId);
        var video = {
            VideoId :parseInt( req.body.VideoId , 10),
            Title : req.body.Title,
            Url : req.body.Url,
            Description : req.body.Description,
            Likes : parseInt(req.body.Likes),
            Dislikes : parseInt(req.body.Dislikes),
            CategoryId : parseInt(req.body.CategoryId)
        }
        var database = clientObj.db('video-Library');
        database.collection('tablevideos').updateOne({VideoId:VideoId},{$set:video}).then(()=>{
            console.log("Video Updated");
            res.end();
        })
      

    })
});


app.delete('/delete-video/:VideoId',(req,res)=>{

    var VideoId = parseInt(req.params.VideoId);
    mongoClient.connect(mongoUrl).then(clientObj=>{
        var database = clientObj.db('video-Library');
        database.collection('tablevideos').deleteOne({VideoId:VideoId}).then(()=>{
            console.log('Video Deleted');
            res.end();
        })

    })
});

app.post('/add-comment',(req, res)=>{
    mongoClient.connect(mongoUrl).then(clientObj=>{

        var comment = {
           CommentId : parseInt(req.body.CommentId),
           Description : req.body.Description,
           VideoId : parseInt(req.body.VideoId)
        }
        var database = clientObj.db('video-Library');
        database.collection('tablecomments').insertOne(comment).then(()=>{
            console.log("Comment Added");
            res.end();
        })
      

    })
});


app.get('/get-comment/:id',(req,res)=>{

    var id = parseInt(req.params.id);
    mongoClient.connect(mongoUrl).then(clientObj=>{
        var database = clientObj.db('video-Library');
        database.collection('tablecomments').find({CommentId:id}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })

    })
});

app.post('/register-user', (req , res)=>{
    mongoClient.connect(mongoUrl).then(clientObj=>{
    var user ={
        UserId :req.body.UserId,
        UserName:req.body.UserName,
        Password:req.body.Password,
        Email:req.body.Email,
        Mobile : req.body.Mobile
    }
  
    var database = clientObj.db('video-Library');
    database.collection('tableusers').insertOne(user).then(()=>{
        console.log("User Added");
        res.end();
    })

})
});

app.get('/get-users',(req,res)=>{
    mongoClient.connect(mongoUrl).then(clientObj=>{
        var database = clientObj.db('video-Library');
        database.collection('tableusers').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })

    })
});



app.listen(port);
console.log('Server Started : http://localhost:5000')