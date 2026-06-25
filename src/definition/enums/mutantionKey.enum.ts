export enum EMutationKey {
	// * AUTH
	REGISTER = "register",
	LOGIN = "login",

	// * PERSONAL
	CREATE_PERSONAL_PROJECT = "create-personal-project",
	DELETE_PERSONAL_DETAILS = "delete-personal-details",
	CREATE_PERSONAL_PROJECT_TODO = "create-personal-project-todo",
	UPDATE_PERSONAL_PROJECT_TODO = "update-personal-project-todo",
	DELETE_PERSONAL_PROJECT_TODO = "delete-personal-project-todo",
	MAKE_PERSONAL_PROJECT_TODO_IS_COMPLETED = "make-personal-project-todo-is-completed",

	// * GROUP
	CREATE_GROUP = "create-group",
	DELETE_GROUP = "delete-group",
	ADD_MEMBER_TO_GROUP = "add-member-to-group",
	DELETE_MEMBER_FROM_GROUP = "delete-member-from-group",

	// * GROUP PROJECT
	CREATE_GROUP_PROJECT = "create-group-project",
	CREATE_ASSIGN_TODO = "create-assign-todo",
}
