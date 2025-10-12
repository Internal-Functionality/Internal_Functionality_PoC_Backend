import mongoose, { Schema, Document } from 'mongoose';

export interface Fixer extends Document {
  userName: string;
  userTypes: string;
  search: string;
  typeOfService: string;
  scope: number;
}

const SearchSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre de usuario es requerido'],
    },
    email: {
      type: String,
      required: true,
      default: '0',
    },
    passwordHash: {
      type: String,
      required: true,
      default: '0',
    },
    role: {
      type: String,
      required: true,
      default: '0',
    },
    language: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, //crear y modificar ? preguntar
  },
);

const Search = mongoose.model<Fixer>('user', SearchSchema);
export default Search;
