process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');
const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');
chai.use(chaiHttp);
describe('GET /users/:id/edit', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });

    afterEach(() => {
      passportStub.logout();
      return knex.migrate.rollback();
    });
    it('should return a success', (done) => {
      passportStub.login({
        id: 1,
        username: 'jeremy',
        password: 'johnson123'
      });
      chai.request(server)
      .get('/users/1/edit')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        done();
      });
    });
    it('should deny access to page', (done) => {
      passportStub.login({
        id: 1,
        username: 'jeremy',
        password: 'johnson123'
      });
      chai.request(server)
      .get('/users/2/edit')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('You do not have access to this page');
        done();
      });
    });
    it('should say no user exists', (done) => {
      passportStub.login({
        id: 1,
        username: 'jeremy',
        password: 'johnson123'
      });
      chai.request(server)
      .get('/users/3/edit')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('No such user exists');
        done();
      });
    });
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/users/2/edit')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Please log in');
        done();
      });
    });
  });
