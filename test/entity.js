process.env.NODE_ENV = process.env.NODE_ENV || 'test';

let mongoose = require("mongoose");
let Entity = require('../app/models/entity');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Entities', () => {
  beforeEach((done) => {
    Entity.deleteMany({}, (err) => {
      done();
    });
  });
  describe('/GET entity', () => {
    it('it should GET all entities', (done) => {
      chai.request(server)
        .get('/entity')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe('/POST entity', () => {
    it('it should not POST a entity without property field', (done) => {
      let entity = {}
      chai.request(server)
        .post('/entity')
        .send(entity)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('property');
          res.body.errors.property.should.have.property('kind').eql('required');
          done();
        });
    });
    it('it should POST a entity', (done) => {
      let entity = {
        property: "value"
      }
      chai.request(server)
        .post('/entity')
        .send(entity)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Entity successfully added!');
          res.body.entity.should.have.property('property');
          done();
        });
    });
  });

  describe('/GET/:id entity', () => {
    it('it should GET a entity by the given id', (done) => {
      let entity = new Entity({ property: "value" });
      entity.save((err, entity) => {
        chai.request(server)
          .get('/entity/' + entity.id)
          // ???
          .send(entity)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('property');
            res.body.should.have.property('_id').eql(entity.id);
            done();
          });
      });
    });
  });

  describe('/PUT/:id entity', () => {
    it('it should UPDATE a entity given the id', (done) => {
      let entity = new Entity({ property: "value" })
      entity.save((err, entity) => {
        chai.request(server)
          .put('/entity/' + entity.id)
          .send({ property: "different value" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Entity updated!');
            res.body.entity.should.have.property('property').eql("different value");
            done();
          });
      });
    });
  });

  describe('/DELETE/:id entity', () => {
    it('it should DELETE a entity given the id', (done) => {
      let entity = new Entity({ property: "value" })
      entity.save((err, entity) => {
        chai.request(server)
          .delete('/entity/' + entity.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Entity successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });

});