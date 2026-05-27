
export interface PaginationQuery {
	page?: number;
	limit?: number;
}

export interface PaginatedResult<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

/**
 * General pagination utility for Mongoose queries
 */
export async function paginate<T>(
	model: any,
	query: object = {},
	options: PaginationQuery = {},
	projection: object = {},
	sort: object = {}
): Promise<PaginatedResult<T>> {
	const page = Math.max(Number(options.page) || 1, 1);
	const limit = Math.max(Number(options.limit) || 10, 1);
	const skip = (page - 1) * limit;

	const [data, total] = await Promise.all([
		model.find(query, projection).sort(sort).skip(skip).limit(limit),
		model.countDocuments(query)
	]);

	return {
		data,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit)
	};
}
