export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Machine'],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Machine',
        to: '/machine',
        icon: 'cil-mobile',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Items management'],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Category',
        to: '/category',
        icon: 'cil-tags',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Items',
        to: '/items',
        icon: 'cil-basket',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Stock'],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Stock',
        to: 'stock',
        icon: 'cil-spreadsheet',
      },
    ],
  },
];
