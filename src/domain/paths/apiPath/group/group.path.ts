export const groupIntegrationPath = {
	createGroupWithAdminUser: "/api/todo-app/groups/create-group",
	getAllUserGroupsByUserId: "/api/todo-app/groups/get-all-groups",
	deleteGroup: "/api/todo-app/groups/delete-group",
	getAllGroupMember: "/api/todo-app/groups/all-group-member",
	addMemberToGroup: "/api/todo-app/groups/add-new-member",
	deleteMemberFromGroup: "/api/todo-app/groups/delete-member",
};

export const groupProjectsIntegrationPath = {
	getAllGroupProjects: "/api/todo-app/group-project/get-all-group-projects",
	createGroupProject: "/api/todo-app/group-project/create-group-project",
	getAllAssignTodoInGroupProjectList:
		"/api/todo-app/assign-todo/get-all-project-assign-todo-list",
	assignTodo: "/api/todo-app/assign-todo/create-assign-todo",
};
