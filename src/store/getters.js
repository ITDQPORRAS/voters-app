const getters = {
    access: state => state.user.access,
    isAdmin: state => state.user.isAdmin,
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    size: state => state.app.size,
    device: state => state.app.device,
    dialDirection: state => state.app.direction,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    userId: state => state.user.id,
    userName: state => state.user.userName,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    permissions: state => state.user.permissions,
    permission_routes: state => state.permission.routes,
    addRoutes: state => state.permission.addRoutes,

};
export default getters;