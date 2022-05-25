require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const fs = require('fs')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const config = process.env;

const app = express();
app.use(express.json());
app.use(cors())

const options = {
    swaggerDefinition : {
        openapi : "3.0.0",
        components: {        
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
              }
            },
        },
        info : {
            title : "Numerical API",
            version : "1.0.0",
            description : "Teerapong Jangthanong"
        },
        servers:[
            {
                url : "http://localhost:4000"
            }
        ]
    },
    apis : ["app.js"],
};

const spacs = swaggerJsDoc(options)

app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(spacs))

/**
 * @swagger
 * /getKey:
 *   post:
 *      summary: Get new key.
 *      description: Get key with student id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          studentId:
 *                              type: string
 *      responses:
 *          200:
 *              description: Created   
 *              content:
 *                  application/json: 
 *                      schema:
 *                          type: object
 *                          properties:
 *                              studentId:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              token:
 *                                  type: string
 *          
 */


app.post("/getKey", (req, res) => {
    try {
        const { studentId } = req.body;
        if (!(studentId)) {
          res.status(400).send("All input is required");
        }
        const data = JSON.parse(fs.readFileSync('./user/userlist.json',{encoding:'utf8', flag:'r'}));
        const user = data.filter(ob=>ob.studentId === studentId)[0];
        console.log(req.body)
        if (studentId && studentId === user.studentId) {
            const token = jwt.sign(
                { user_id: user.studentId },
                process.env.TOKEN_KEY,
                {expiresIn: "365d"}
            );
            user.token = token;
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});


/**
 * @swagger
 * /checkkey:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      summary: Check Api Key.
 *      description: Check Api Key
 *      responses:
 *          200:
 *             description: get 
 *             
 */


app.post("/checkkey", auth,(req, res) => {
    console.log("Check User-Key By ",req.user['user_id'])
    return res.status(200).send("Correct Key")
});

/**
 * @swagger
 * /rootOfEquation:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      summary: Get proposition of root of Equation .
 *      description: get proposition of root of Equation .
 *      responses:
 *          200:
 *             description: send list proposition of root of Equation
 *             content:
 *              application/json: 
 *                  schema:
 *                      type: array
 *                      items:
 *                          properties:
 *                              equation:
 *                                  type: string
 *                              x1:
 *                                  type: number
 *                              x2:
 *                                  type: number
 *                              x:
 *                                  type: number
 *          
 *   
 */

app.post("/rootOfEquation",auth, (req, res) => {
    const data = require('./proposition/RootOfEquation.json');
    console.log("rootOfEquation : ",req.user)
    return res.json(data);
});

/**
 * @swagger
 * /linerSystem:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      summary: Get proposition of Liner System.
 *      description: get proposition of Liner System array
 *      responses:
 *          200:
 *             description: Send proposition of Liner System
 *             content:
 *              application/json: 
 *                  schema:
 *                      type: array
 *                      items:
 *                          properties:
 *                              A:
 *                                  type: array
 *                                  items: 
 *                                      type: integer
 *                              B:
 *                                  type: array
 *                                  items: 
 *                                      type: integer
 *                              size:
 *                                  type: integer
 *      
 *                                
 */

app.post("/linerSystem",auth,(req, res)=>{
    const data = require('./proposition/LinerSystem.json');
    console.log("LinerSystem : ",req.user)
    return res.json(data);
})

module.exports = app;