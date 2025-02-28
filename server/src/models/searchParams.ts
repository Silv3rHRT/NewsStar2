import { Schema, model, Document } from 'mongoose';

export interface ISearchParams extends Document {
	searchTerms: string;
	to: Date;
	from: Date;
	sortBy: string;
}

export const searchParamsSchema = new Schema<ISearchParams>({
	searchTerms: { type: String, required: true },
	to: { type: Date, required: false },
	from: { type: Date, required: false },
	sortBy: { type: String, required: false },
});

export const SearchParams = model<ISearchParams>('SearchParams', searchParamsSchema)