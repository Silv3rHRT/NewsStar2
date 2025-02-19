import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface SearchAttributes {
    id: number;
    user_id: number;
    searchterm: string;
    sortBy: string;
    sources: string;
    from: Date;
    to: Date;
}

interface SearchCreationAtrributes extends Optional<SearchAttributes, 'id'> { }

export class Search extends Model<SearchAttributes, SearchCreationAtrributes> implements SearchAttributes{
    public id!: number;
    public user_id!: number;
    public searchterm!: string;
    public sortBy!: string;
    public sources!: string;
    public from!: Date;
    public to!: Date;
}

export function SearchFactory(sequelize: Sequelize): typeof Search {
    Search.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            searchterm: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sortBy: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            sources: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            from: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            to: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: 'search',
            sequelize,
        }
    );

    return Search;
}