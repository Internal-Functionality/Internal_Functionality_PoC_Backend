import mongoose, { Schema, Document } from 'mongoose';

export interface Search extends Document {
  userName: string;
  userTypes: string;
  search: string;
  typeOfService: string;
  filters: number;
  searchesFound: number;
  createdAt: Date;
  updatedAt: Date;
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
    filters: {
      type: Number,
      required: true,
      default: 0,
    },
    searchFound: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Método para personalizar la representación JSON - Fechas en hora de Bolivia (24 horas)
SearchSchema.methods.toJSON = function () {
  const search = this.toObject();

  // Opciones para formato de 24 horas
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/La_Paz',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Esto fuerza el formato de 24 horas
  };

  if (search.createdAt) {
    search.createdAt = new Date(search.createdAt).toLocaleString('es-BO', options);
  }

  if (search.updatedAt) {
    search.updatedAt = new Date(search.updatedAt).toLocaleString('es-BO', options);
  }

  return search;
};

const Search = mongoose.model<Search>('search', SearchSchema);
export default Search;
