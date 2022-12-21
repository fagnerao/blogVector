const { v4: uuidv4 } = require('uuid');
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require('multer');
const SharpMulter = require('multer-sharp');
const mysql = require("mysql");


const db = mysql.createPool({
    host: '34.95.233.248', 
    user: 'root', 
    password: 'Xw10siadm', 
    database: 'blog', 
});

app.use(express.json());
app.use(cors());


/**
|--------------------------------------------------
| upload gallery
|--------------------------------------------------
*/

const storage = SharpMulter({
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
},
    bucket: 'vector_blog', 
    projectId: 'data-visitor-369316', 
    keyFilename: 'mykey.json', 
  size: {
    width: 1000,
    height: 1000
  },
  max: true
});

const upload = multer({ storage });
 
app.post('/upload', upload.array('file'), (req, res, next) => {


    if(req.files){

      const id_page = req.body.postId;
      const filename = [];
      const urlPath = [];
      const dataValues = [];
      
         
      for(let i =0; i < req.files.length; i++){

         filename.push (req.files[i].filename);
         urlPath.push  (req.files[i].path);
         
         // create sql data
         dataValues.push([id_page,req.files[i].path]);
         
        }

        // call create gallery 
        insertGallery(dataValues);
        
      res.status(200).send({msg: "Galeria enviada com sucesso" , type: "success", images: urlPath});

    }


});
   
 /**
 |--------------------------------------------------
 | Create gallery
 |--------------------------------------------------
 */   

  function insertGallery(values) {
        
        db.query(
         "INSERT INTO gallery (id_page, file) VALUES ?",
         [values], (error, result) => {
          if(error){
            console.log(error);
          }
           return ;
         }
         );

      return true
 }
/**
|--------------------------------------------------
| Novo Post
|--------------------------------------------------
*/

app.post("/post", (req, res) => {
  const postId      = req.body.postId;
  const title       = req.body.title;
  const content     = req.body.content;
  const active      = req.body.active;
  const slug        = req.body.slug;
  const id_category = req.body.id_category;
  const created_at  = req.body.created_at;
 
  if (postId == ''){
    db.query(
      "INSERT INTO posts (title, content, active, slug, id_category, created_at) VALUE (?,?,?,?,?,?)",
      [title, content, active,slug, id_category,created_at ], (error, result) => {
        if (error) {
          res.send({msg : error,  type: "error"});
        }
        else {
        
          res.send({ msg: "Post cadastrado com sucesso" , type: "success" , insertedId: result.insertId});
        }
       
      }
    );
  }
  else{
    db.query(
      "UPDATE posts SET  title = ?, content = ?, active = ?, slug = ?, id_category = ? WHERE  id= ?",
      [title, content, active,slug, id_category,postId ], (error, result) => {
        if (error) {
          res.send({msg : error,  type: "error"});
        }
        else {
        
          res.send({ msg: "Post Editado com sucesso" , type: "success" , insertedId: postId});
        }
       
      }
    );

   }
        
 
});
/**
|--------------------------------------------------
| Search
|--------------------------------------------------
*/

app.get("/search", (req, res) => {
  const search  = '%'+req.query.search+'%';
  
    db.query(
      "SELECT posts.* ,gallery.file ,category.category  FROM blog.posts left join category on category.id=posts.id_category left join gallery on gallery.id_page=posts.id  where gallery.is_main=1 AND posts.title LIKE ? ",
      [search], (error, result) => {
        if (error) {
          res.send({msg : error,  type: "error"});
        }
        else {
          res.send({ msg: "Pesquisa efetuada com sucesso" , type: "success" , result});
        }
      
      }
    );
 
});

/**
 * Get Galery by ID
 */

 app.get("/gallery", (req, res) => {
  const idPage = req.query.idPage;
  
  db.query("SELECT * from gallery WHERE id_page = ?", [idPage], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({msg: "Galeria atualizada", type: "sucess" ,result});
    
    } else {
      res.send({ msg: "Galeria vazia", type: "error" });
    }
  });
});

/**
 * Get POst by ID
 */

 app.get("/postById", (req, res) => {
  const postId = req.query['postId'];
  
  db.query("SELECT posts.* , category.category, category.id as catId  FROM blog.posts left join category on category.id=posts.id_category WHERE posts.id = ?", [postId], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({result});
    
    } else {
      res.send({ msg: "Lista vazia", type: "error" });
    }
  });
});

/**
 * Get POst by SLUG
 */

 app.get("/postBySlug", (req, res) => {
  const slug = req.query['slug'];

  db.query("SELECT posts.* , category.category, category.id as catId  FROM blog.posts left join category on category.id=posts.id_category WHERE posts.slug = ?", [slug], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({result});
    
    } else {
      res.send({ msg: "Lista vazia", type: "error" });
    }
  });
});

/**
 * Get POst Blog
 */

 app.get("/blog", (req, res) => {
  db.query("SELECT posts.* ,gallery.file ,category.category  FROM blog.posts left join category on category.id=posts.id_category left join gallery on gallery.id_page=posts.id  where gallery.is_main=1", [], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({result});
    } else {
      res.send({ msg: "Lista vazia", type: "error" });
    }
  });
});


/**
 * Get POst List
 */

 app.get("/posts", (req, res) => {
  db.query("SELECT posts.* , category.category  FROM blog.posts left join category on category.id=posts.id_category", [], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({result});
    } else {
      res.send({ msg: "Lista vazia", type: "error" });
    }
  });
});
/**
 * Get Category List
 */

 app.get("/categories", (req, res) => {
  db.query("SELECT * FROM category", [], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({result});
    } else {
      res.send({ msg: "Lista vazia", type: "error" });
    }
  });
});

/**
 * Get Banner List
 */

 app.get("/bannersList", (req, res) => {

  db.query("SELECT * FROM banners", [], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({result});
    } else {
      res.send({ msg: "Lista vazia", type: "error" });
    }
  });
});

/**
|--------------------------------------------------
| sistema de cadastro
|--------------------------------------------------
*/

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
 

  db.query("SELECT * FROM vz_users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO vz_users (name, email, password, user_level) VALUE (?,?,?,1)",
          [name, email, hash],
          (error, response) => {
            if (err) {
              res.send({msg : err,  type: "error"});
            }

            res.send({ msg: "Usuário cadastrado com sucesso" , type: "success" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado em nosso sistema" ,  type: "error"});
    }
  });
});


/**
 * Sistema de login
 */

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM vz_users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "Usuário logado", type: "success", dataUser : result});
         
        } else {
          res.send({ msg: "Senha incorreta",type: "error" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!", type: "error" });
    }
  });
});


/**
|--------------------------------------------------
| New Category
|--------------------------------------------------
*/

app.post("/category", (req, res) => {
  const catId       = req.body.catId;
  const category    = req.body.category;
  const category_up = req.body.categoryUp;
  const active      = req.body.active;
  const slug        = req.body.slug;

  if (catId == ''){
    db.query(
      "INSERT INTO category (category, slug, active, category_up) VALUE (?,?,?,?)",
      [category, slug, active,category_up ], (error, result) => {
        if (error) {
          res.send({msg : error,  type: "error"});
        }
        else {
        
          res.send({ msg: "Categoria cadastrada com sucesso" , type: "success" , insertedId: result.insertId});
        }
       
      }
    );
  }
  else{
    db.query(
      "UPDATE category SET  category = ?, slug = ?, active = ?, category_up = ? WHERE  id= ?",
      [category, slug, active,category_up, catId ], (error, result) => {
        if (error) {
          res.send({msg : error,  type: "error"});
        }
        else {
        
          res.send({ msg: "Categoria Editada com sucesso" , type: "success" , insertedId: catId});
        }
       
      }
    );

   }
        
 
});


/**
 * Get Category by ID
 */

 app.get("/catById", (req, res) => {
  const catId = req.query['catId'];
  
  db.query("SELECT *   FROM  category  WHERE id = ?", [catId], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({result});
    
    } else {
      res.send({ msg: "Lista vazia", type: "error" });
    }
  });
});
/**
|--------------------------------------------------
| New Banner
|--------------------------------------------------
*/

app.post("/newBanner", (req, res) => {
  const bannerId     = req.body.bannerId;
  const title        = req.body.title;
  const localization = req.body.localization;
  const url          = req.body.url;
  const active       = req.body.active;
  const file         = req.body.file;

  if (bannerId == ''){
    db.query(
      "INSERT INTO banners (title, url,localization, active,file) VALUE (?,?,?,?,?)",
      [title, url, localization, active,file ], (error, result) => {
        if (error) {
          res.send({msg : error,  type: "error"});
        }
        else {
        
          res.send({ msg: "Banner cadastrado com sucesso" , type: "success" , insertedId: result.insertId});
        }
       
      }
    );
  }
  else{
    db.query(
      "UPDATE banners SET  title = ?, url = ?, localization= ?, active = ?, file= ? WHERE  id= ?",
      [title, url, localization , active,file, bannerId ], (error, result) => {
        if (error) {
          res.send({msg : error,  type: "error"});
        }
        else {
        
          res.send({ msg: "Banner Editado com sucesso" , type: "success" , insertedId: bannerId});
        }
       
      }
    );

   }
        
 
});
/**
|--------------------------------------------------
| set Is main
|--------------------------------------------------
*/

app.get("/isMain", (req, res) => {
  const id     = req.query['id'];
  const post   = req.query['post'];
 
    db.query(
      "UPDATE gallery SET  is_main = 0 WHERE  id_page = ?",
      [post], (error, result) => {
        if (error) {
          res.send({msg : error,  type: "error"});
        }
        else {
          db.query(
            "UPDATE gallery SET  is_main = 1 WHERE  id = ?",
            [id], (error, result) => {
              if (error) {
                res.send({msg : error,  type: "error"});
              }
              else {
                res.send({ msg: "Imagem setada" , type: "success"});
              }
             
            })
        }
       
      })
    
 
});


/**
 * Get Banner by ID
 */

 app.get("/bannerById", (req, res) => {
  const bannerId = req.query['id'];

  db.query("SELECT  *   FROM  banners  WHERE id = ?", [bannerId], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({result});
      console.log(result)
    
    } else {
      res.send({ msg: "Lista vazia", type: "error" });
    }
  });
});


/**
 * Remove Post from database
 */

 app.get("/delPost", (req, res) => {
  const id = req.query['postId'];

  db.query("DELETE  posts, gallery FROM  posts LEFT JOIN gallery ON posts.id = gallery.id_page  WHERE posts.id = ?", [ id], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({ msg: "Item removido com sucesso", type: "success",result});
    
    } else {
      res.send({ msg: "Item não encontrado", type: "error" });
    }
  });
});

/**
 * Remove img from gallery
 */

 app.get("/delImg", (req, res) => {
  const id = req.query['id'];

  db.query("DELETE FROM  gallery  WHERE id = ?", [ id], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({ msg: "Item removido com sucesso", type: "success",result});
    
    } else {
      res.send({ msg: "Item não encontrado", type: "error" });
    }
  });
});

/**
 * Remove Category from database
 */

 app.get("/delItem", (req, res) => {
  const id = req.query['catId'];
  
  db.query("DELETE  FROM  category  WHERE id = ?", [ id], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({ msg: "Item removido", type: "success",result});
    
    } else {
      res.send({ msg: "Item não encontrado", type: "error" });
    }
  });
});
/**
 * Remove Banner from database
 */

 app.get("/delBanner", (req, res) => {
  const id = req.query['id'];
  
  db.query("DELETE  FROM  banners  WHERE id = ?", [ id], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({ msg: "Banner removido", type: "success",result});
    
    } else {
      res.send({ msg: "Item não encontrado", type: "error" });
    }
  });
});


app.listen(3001, () => {
  console.log("rodando na porta 3001");
});