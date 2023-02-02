const { getList } = require('./getList');
const { getListById } = require('./getListById');
const { deleteContact } = require('./deleteContact');
const {putContact} = require('./putContact');
const {postContact} = require ('./postContact');
const {updateStatusContact} = require('./updateStatusContact');

module.exports = {
    getList,
    getListById,
    deleteContact,
    putContact,
    postContact,
    updateStatusContact,
}