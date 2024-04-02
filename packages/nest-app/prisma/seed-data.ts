export const Resource = [
  {
    id: 1,
    title: '系统管理',
    type: 1,
    code: 'system'
  },
  {
    id: 2,
    title: '用户管理',
    parentId: 1,
    type: 1,
    code: 'system:user'
  },
  {
    id: 3,
    title: '角色管理',
    parentId: 1,
    type: 1,
    code: 'system:role'
  },
  {
    id: 4,
    title: '资源管理',
    parentId: 1,
    type: 1,
    code: 'system:resources'
  }
];

export const seedData = {
  Resource
};
