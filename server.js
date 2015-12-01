var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
morgan = require("morgan"),
db = require("./models"),
apiRouter = express.Router();


app.set("view engine", "ejs");
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', apiRouter);


// app.get('/', function (req,res){
//   res.redirect('/icecreams');
// });

// ROOT
app.get('/', function(req,res){
  res.render('index.ejs');
});

// apiRouter.route('/icecreams')
// .get(function (req,res){
//   db.Icecream.find({}, function (error,response){
//     res.json(response);
//   });
// })
// .post(function (req,res){
//   db.Icecream.create (req.body, function (error){
//     if(error) return res.json({error:error.message});
//     res.json({message: "Ice-cream created"});
//   });
// });

// apiRouter.route('/icecreams/:icecreamId')
// .get(function(req,res){
//   db.Icecream.findById(req.params.icecreamId,function(error,icecream){
//     if (error) return res.json({message: "Sorry, there was an error finding that ice-cream!", error: error});
//     res.json(icecream);
//   });
// })
// .put(function (req,res){
//   db.Icecream.findByIdAndUpdate(req.params.icecreamId, req.body, function (error,icecream){
//     if(error) return res.json({message: "Sorry, there was an error!", error:error});
//     if(icecream && !icecream.imageUrl){
//       icecream.imageUrl = "http://www.purpledooricecream.com/content/images/mystery-icecream_website(1).jpg";
//       icecream.save();
//     }
//     res.json({message: "Ice-cream updated!"});
//   });
// })
// .delete(function (req,res){
//   db.Icecream.findById(req.params.icecreamId, function(error, icecream){
//     if(error) return res.json({message: "Sorry, there was an error finding that ice-cream!", error: error});
//     icecream.remove();
//     res.json({message: "Ice-cream successfully deleted"});
//   });
// });




// app.get('/icecreams', function (req,res){
//   db.Icecream.find({}, function (err, icecream){
//     if(err){
//       console.log(err);
//     }
//     else{
//       res.render("icecream/index", {icecreams: icecream});
//     }
//   });
// });

app.get('/icecreams/new', function (req,res){
  res.render("icecream/new");
});

// app.post('/icecreams', function (req,res){
//   db.Icecream.create(req.body.icecream, function (err,icecream){
//     if(err){
//       res.render('404');
//     }
//     else{
//       res.redirect('/icecreams');
//     }
//   });
// });

app.get('/icecreams/:id/edit', function (req,res){
  db.Icecream.findById(req.params.id, function (err, icecream){
    if(err){
      res.render('404');
    }
    else{
      res.render('icecream/edit', {icecream: icecream});
    }
  });
});

app.put('/icecreams/:id', function (req,res){
  db.Icecream.findByIdAndUpdate(req.params.id, req.body.icecream, function (err, doc){
    if(err){
      res.render('404');
    }
    else{
      res.redirect('/icecreams');
    }
  });
});


app.get('/icecreams/:id', function (req,res){
  db.Icecream.findById(req.params.id, function (err, icecream){
    if(err){
      res.render('404');
    }
    else{
      res.render('icecream/show', {icecream: icecream});
    }
  });
});

app.delete('/icecreams/:id', function (req,res){
  db.Icecream.findByIdAndRemove(req.params.id, function (err,icecream){
    if(err){
      res.render('404');
    }
    else{
      res.redirect('/icecreams');
    }
  });
});

app.get('*', function (req,res){
  res.render('404');
});

var PORT = 3001;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT); });