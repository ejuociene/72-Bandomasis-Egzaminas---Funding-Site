import { DataTypes } from 'sequelize';

const Fundings = (sequelize) => {
	const Schema = {
		fullName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	};
	return sequelize.define('fundings', Schema);
};

export default Fundings;
