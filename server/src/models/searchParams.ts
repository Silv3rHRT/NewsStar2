import { Schema, Document } from 'mongoose';

export interface ISearchParams extends DOcument {
	_id: string;
	searchTerms: string;
}

export const searchParamsSchema = new Schema<ISearchParams>({
	searchTerms: { type: String, required: true }
});
