import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  requesterId: mongoose.Types.ObjectId;
  fixerId?: mongoose.Types.ObjectId;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter job title'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },

    description: {
      type: String,
      required: [true, 'Please enter job description'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },

    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
      required: true
    },

    requesterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter requester ID'],
    },

    fixerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    price: {
      type: Number,
      required: [true, 'Please enter price'],
      min: [0, 'Price cannot be negative'],
      validate: {
        validator: function(price: number) {
          return Number.isFinite(price) && price >= 0;
        },
        message: 'Price must be a valid non-negative number'
      }
    }
  },
  {
    timestamps: true
  }
);

JobSchema.index({ requesterId: 1, createdAt: -1 });
JobSchema.index({ fixerId: 1, status: 1 });
JobSchema.index({ status: 1 });
JobSchema.index({ createdAt: -1 });

JobSchema.methods.toJSON = function() {
  const job = this.toObject();
  return job;
};

export const Job = mongoose.model<IJob>('Job', JobSchema);
export default Job;