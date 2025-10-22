import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  role: 'visitor' | 'requester' | 'fixer';
  type: 'login' | 'search' | 'click' | 'review' | 'session_start' | 'session_end';
  metadata: {
    button?: string;
    searchTerm?: string;
    duration?: number;
    [key: string]: any;
  };
  timestamp: Date;
}

const ActivitySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter user ID'],
    },

    date: {
      type: Date,
      required: [true, 'Please enter event date'],
    },

    role: {
      type: String,
      enum: ['visitor', 'requester', 'fixer'],
      required: [true, 'Please enter user role'],
    },

    type: {
      type: String,
      enum: ['login', 'search', 'click', 'review', 'session_start', 'session_end'],
      required: [true, 'Please enter event type'],
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
      validate: {
        validator: function(metadata: any) {
          return typeof metadata === 'object' && metadata !== null;
        },
        message: 'Metadata must be an object'
      }
    },

    timestamp: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  {
    timestamps: false
  }
);

ActivitySchema.index({ userId: 1, timestamp: -1 });
ActivitySchema.index({ type: 1, timestamp: -1 });
ActivitySchema.index({ role: 1, timestamp: -1 });
ActivitySchema.index({ date: 1 });

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
export default Activity;