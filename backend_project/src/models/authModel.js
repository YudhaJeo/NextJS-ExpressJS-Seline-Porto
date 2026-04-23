// src/models/authModel.js
import db from '../core/config/knex.js';

export const getByEmail = (email) =>
  db('tb_users').where({ EMAIL: email }).first();

export const getByUsername = (username) =>
  db('tb_users').where({ USERNAME: username }).first();

export const create = (data) =>
  db('tb_users').insert(data);

export const getById = (id) =>
  db('tb_users').where({ IDUSER: id }).first();

export const getByToken = (token) =>
  db('tb_users').where({ VERIFY_TOKEN: token }).first();

export const updateStatus = (id, data) =>
  db('tb_users').where({ IDUSER: id }).update(data);