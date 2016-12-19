var mocha=require('mocha');
//var test = require('unit.js');
var request=require('request');
var fs=require("fs");
var chai=require('chai');
var chaiHttp=require('chai-http');
var should=chai.should();
var server=require('../app');
chai.use(chaiHttp);

describe("/ POST json", function(){
  var url="http://localhost:8000/";
  var example_req=parse(String(fs.readFileSync("data/request.json")));
  var example_res=JSON.parse(String(fs.readFileSync("data/response.json")));
  it("example output", ()=>{

    chai.request(server)
        .post('/')
        .send(example_req)
        .end((err, res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('response');
          res.body.response.should.be.a('array');
          res.body.response.length.be.eql(7);
          //res.body.should.be.eql(exmple_res);
          done();
        });
  });
  // it("error"
  //
  // );
})
