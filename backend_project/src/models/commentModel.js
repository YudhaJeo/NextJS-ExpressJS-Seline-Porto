import db from '../core/config/knex.js';

export const getAll = () => {
  return db('tb_comment') 
    .leftJoin('tb_users', 'tb_users.IDUSER', 'tb_comment.IDUSER')
    .select(
      'tb_comment.*',
      'tb_users.USERNAME'
    )
    .orderBy('tb_comment.CREATED_AT', 'desc');
};

export const getById = (id) =>
  db('tb_comment').where({ IDCOMMENT: id }).first();

export const create = (data) =>
  db('tb_comment').insert(data);

export const update = (id, data) =>
  db('tb_comment')
    .where({ IDCOMMENT: id })
    .update({
      ...data,
      UPDATED_AT: db.fn.now() 
    });

export const remove = (id) =>
  db('tb_comment').where({ IDCOMMENT: id }).del();