// Import dependencies
const request = require('supertest');
const express = require('express');
const { expect } = require('chai');

// Import the route handler
const tasksRouter = require('../../src/api/handler');

// Create a test app instance
const app = express();
app.use(express.json());
app.use('/', tasksRouter);

describe('GET /tasks', () => {

  // ✅ Happy path test
  it('should return a list of tasks successfully', async () => {
    const res = await request(app).get('/tasks');

    // Check HTTP status
    expect(res.status).to.equal(200);

    // Validate response structure
    expect(res.body.success).to.be.true;
    expect(res.body.data).to.be.an('array');
    expect(res.body.error).to.be.null;
  });

  // ❌ Error case: invalid limit
  it('should return error for invalid limit parameter', async () => {
    const res = await request(app).get('/tasks?limit=-5');

    // Check HTTP status
    expect(res.status).to.equal(400);

    // Validate response structure
    expect(res.body.success).to.be.false;
    expect(res.body.data).to.be.null;
    expect(res.body.error).to.be.a('string');
  });

  // 🆕 Caso extra: la lista de tareas no está vacía
  it('should return a non-empty array of tasks', async () => {
    const res = await request(app).get('/tasks');

    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
    expect(res.body.data).to.be.an('array').that.is.not.empty;
    expect(res.body.error).to.be.null;
  });

});