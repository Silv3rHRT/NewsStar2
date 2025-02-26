import { Schema, Document } from 'mongoose';

export interface ISearchParams extends Document {
	_id: string;
	searchTerms: string;
	to: Date;
	from: Date;
	sortBy: string;
}

export const searchParamsSchema = new Schema<ISearchParams>({
	searchTerms: { type: String, required: true }
});
