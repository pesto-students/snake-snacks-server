/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/index');

describe('Get route', () => {
  it('page should return hello world', async (done) => {
    const res = await request(app).get('/');
    expect.assertions(2);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{ title: 'Hello, world (again)!' }]);
    done();
  });
});

afterAll(async () => { await app.close(); });
