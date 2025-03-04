import { Schema, model, Document } from "mongoose";

export interface ISearchParams extends Document {
  searchTerms: string;
  to: Date;
  from: Date;
  sortBy: string;
}

export const searchParamsSchema = new Schema<ISearchParams>({
  searchTerms: {
	type: String,
	required: true,
	unique: true
},
  to: {
	type: Date,
	required: false,
	unique:true 
},
  from: {
	type: Date,
	required: false,
	unique: true
 },
  sortBy: {
	type: String,
	required: false,
	unique: true
},
});

export const SearchParams = model<ISearchParams>(
  "SearchParams",
  searchParamsSchema
);
