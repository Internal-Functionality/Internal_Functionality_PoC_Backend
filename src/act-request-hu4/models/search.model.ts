import mongoose, { Schema, Document } from 'mongoose';

export interface Search extends Document {
  userName: string;
  userTypes: string;
  search: string;
  typeOfService: string;
  scope: number;
}

const SearchSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'El nombre de usuario es requerido'],
    },
    userTypes: {
      type: String,
      required: true,
      default: '0',
    },
    search: {
      type: String,
      required: true,
      default: '0',
    },
    typeOfService: {
      type: String,
      required: true,
      default: '0',
    },
    scope: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, //crear y modificar ? preguntar
  },
);

const Search = mongoose.model<Search>('search', SearchSchema);
export default Search;
