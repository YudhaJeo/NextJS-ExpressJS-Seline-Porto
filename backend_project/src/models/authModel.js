// src/models/authModel.js
import db from '../core/config/knex.js';

export const getByUsername = (username) => 
  db('tb_users').where({ USERNAME: username }).first();

export const create = (data) =>
  db('tb_users').insert(data);

export const getById = (id) =>
  db('tb_users').where({ IDUSER: id }).first();