import { DataTypes } from 'sequelize';

const Admins = (sequelize) => {
	const Schema = {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	};
	return sequelize.define('admins', Schema);
};

export default Admins;
