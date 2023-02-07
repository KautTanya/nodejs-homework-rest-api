const { getList } = require('./getList');
const { getListById } = require('./getListById');
const { deleteContact } = require('./deleteContact');
const {putById} = require('./putContact');
const {postContact} = require ('./postContact');
const {updateStatusContact} = require('./updateStatusContact');

module.exports = {
    getList,
    getListById,
    deleteContact,
    putById,
    postContact,
    updateStatusContact,
}