
import mongoose, { Document, Schema } from 'mongoose';

export interface Contact extends Document {
  name: string;
  email: string;
  mobile: string;
  image_url: string;
  is_deleted: boolean;
}

const contactSchema: Schema = new mongoose.Schema({
  name: { type: String, default: null, trim: true },
  email: { type: String, default: null, trim: true },
  mobile: { type: String, default: null, trim: true },
  image_url: { type: String, default: null, trim: true },
  is_deleted: { type: Boolean, default: false, index: true },
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

export default mongoose.model<Contact>('Contact', contactSchema);
