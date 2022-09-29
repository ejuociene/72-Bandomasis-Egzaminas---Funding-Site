import { DataTypes } from 'sequelize';

const Ideas = (sequelize) => {
	const Schema = {
		text: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false
		},
		goal: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		raisedAmount: {
			type: DataTypes.INTEGER
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0
		}
	};
	return sequelize.define('ideas', Schema);
};

export default Ideas;
