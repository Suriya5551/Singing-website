const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',  {useNewUrlParser: true });

const bodyParser = require('body-parser'); 
const app = express();
const port = 80;

// mongoose stuff


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String, 
    concern: String
    
  });

const Contact = mongoose.model('contact', contactSchema);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    
    
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    

    myData.save().then(()=>{
       
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
}); 