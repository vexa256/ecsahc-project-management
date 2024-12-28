// Navigation configuration for the sidebar
export const sidebarNavigation = {
  main: [
    { 
      name: 'Dashboard', 
      icon: 'home',
      path: '/dashboard'
    },
    { 
      name: 'Entities', 
      icon: 'briefcase',
      children: [
        { name: 'All Entities', path: '/entities' }
      ]
    },
    { 
      name: 'Indicators', 
      icon: 'target',
      children: [
        { name: 'Entity Results Framework', path: '/indicators', icon: 'bar-chart-2' },
        { name: 'Regional Results Framework', path: '/indicators/rrf', icon: 'globe' },
        { name: 'Report Indicators', path: '/indicators/report', icon: 'edit-3' }
      ]
    }
  ],
  reporting: [
    {
      name: 'Reports',
      icon: 'file-text',
      children: [
        { name: 'Reporting Timelines', path: '/reporting/timelines' },
        { name: 'Report Status', path: '/reports/status' },
        { name: 'Review Reports', path: '/reports/review', count: 12 },
        { name: 'Report History', path: '/reports/history' }
      ]
    }
  ],
  bottom: [
    {
      name: 'Administration',
      icon: 'settings',
      children: [
        { name: 'User Management', path: '/admin/users' },
        { name: 'System Settings', path: '/admin/settings' }
      ]
    },
    { 
      name: 'Help & Support', 
      icon: 'help-circle',
      children: [
        { name: 'Documentation', path: '/help/docs' },
        { name: 'Contact Support', path: '/help/support' }
      ]
    }
  ]
}