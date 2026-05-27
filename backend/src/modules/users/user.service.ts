import { User } from "../../infrastructure/db/models/user.model";
import { paginate, PaginationQuery, PaginatedResult } from "../../shared/utils/pagination";

export class UserService {
	static async getPaginatedUsers(query: PaginationQuery) {
		return paginate(User, {}, query, {}, { createdAt: -1 });
	}
}
