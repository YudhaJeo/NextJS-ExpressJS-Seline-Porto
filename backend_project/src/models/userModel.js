import db from '../core/config/knex.js';

export const getAll = () => db('tb_users').select();

export const getById = (id) =>
  db('tb_users').where({ IDUSER: id }).first();

export const create = (data) =>
  db('tb_users').insert(data);

export const update = (id, data) =>
  db('tb_users').where({ IDUSER: id }).update(data);

export const remove = (id) =>
  db('tb_users').where({ IDUSER: id }).del();