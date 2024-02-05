import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use('/images', express.static('images'));

const accounts=[]
const posts=[]

app.get("/",(req,res)=>{
    res.render("login.ejs",{
        msg:""
    })
});
app.post("/login",(req,res)=>{
    let id=""
    let pass=""
    try{
        accounts.forEach((user)=>{
            id=user.id
            pass=user.pass
            if((id===req.body.id) && (pass===req.body.pass)){
                res.redirect("/homepage")
            }
        })
        res.redirect("/")
    } catch (error){
        console.log(error.message)
        res.render("error.ejs")
    }
   
});
app.get("/homepage",(req,res)=>{
    res.render("index.ejs",{
        post:posts,
        msg:""
    })
})

app.get("/register",(req,res)=>{
    res.render("register.ejs")
})
app.post("/confirmRegister",(req,res)=>{
    let id=req.body.id;
    let pass=req.body.pass;
    const user={"id":id,"pass":pass}
    const msg="User succesful registered"
    accounts.push(user)
    res.render("login.ejs",{
        msg:msg
    })
})

app.get("/crear",(req,res)=>{
    res.render("crear.ejs",{
        msg:""})
})

app.post("/crearPost",(req,res)=>{
    const postTitle=req.body.postTitle
    const postContent=req.body.postContent
    const post={"title":postTitle,"content":postContent}
    let title=""
    let content=""
    posts.forEach((post)=>{
        title=post.title
        content=post.content
        if((postTitle)===(title)){
            res.redirect("/crear")
        } 
    })
    posts.push(post)
            res.redirect("/homepage")
})

app.get("/views/:blogID",(req,res)=>{
    let postTitle=req.params.blogID
    let content=""
    let title=""
    posts.forEach((post)=>{
        title=post.title
        content=post.content
        if((postTitle)===(title)){
            res.render("post.ejs",{
                title:title,
                content:content
            })
        }
    })

})

app.listen(port,()=>{
    console.log(`server running in port ${port}`)
})