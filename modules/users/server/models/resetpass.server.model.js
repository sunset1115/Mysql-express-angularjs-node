'use strict';

/**
 * Reset Password Token Table Model
 */
module.exports = function(sequelize, DataTypes) {
  var ResetPass = sequelize.define('ResetPass', {
    token: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER(11),
      references: {
        model: 'guacamole_user',
        key: 'user_id'
      }
    }
  });
  return ResetPass;
};
