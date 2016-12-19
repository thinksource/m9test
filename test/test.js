var mocha=require('mocha');
//var test = require('unit.js');
var fs=require("fs");
var chai=require('chai');
var chaiHttp=require('chai-http');
var should=chai.should();
var server=require('../app');
chai.use(chaiHttp);

describe("/ POST json", function(){
  var url="http://localhost:8000/";
  var example_req=String(fs.readFileSync("data/request.json"));
  var error_req=String(fs.readFileSync("data/error.json"));
  var example_res=JSON.parse(String(fs.readFileSync("data/response.json")));
  it("example output", ()=>{

    chai.request(server)
        .post('/')
        .send(example_req)
        .end((err, res)=>{
          res.should.have.status(200);
          expect(req).to.be.json;
          res.body.should.have.property('response');
          res.body.response.should.be.a('array');
          res.body.response.length.be.eql(7);
          res.body.should.be.eql(exmple_res);
          done();
        })
  });
  it("error response", ()=>{
    chai.request(server)
        .post('/')
        .send(error_req)
        .end((err, res)=>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql("Could not decode request: JSON parsing failed");
          done();
        })
  });
  it("Get method is invalid",()=>{
    chai.request(server)
      .get('/')
      .end((err, res)=>{
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql("Only post method accept for this service");
        done();
      })
  });

  it("Empty playload",()=>{
    var empty_json={
      "skip": 0,
      "take": 10,
      "totalRecords": 75
    };
    chai.request(server)
    .post('/')
    .send(empty_json)
    .end((err, res)=>{
      res.should.have.status(200);
      expect(req).to.be.json;
      res.body.should.have.property('response');
      res.body.response.should.be.a('array');
      res.body.response.length.be.eql(0);
      res.body.should.be.eql(exmple_res);
      done();
    })
  });
  it("plain text request test", ()=>{
    chai.request(server)
        .post('/')
        .send('simple test')
        .end((err, res)=>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql("Could not decode request: JSON parsing failed");
          done();
        })
  });
  it("Form request request test", ()=>{
    chai.request(server)
        .post('/')
        .field('_method', 'put')
        .field('password', '123')
        .field('confirmPassword', '123')
        .end((err, res)=>{
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql("Could not decode request: JSON parsing failed");
          done();
        })
  });
})
