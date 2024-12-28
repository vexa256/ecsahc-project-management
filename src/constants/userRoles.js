```js
export const USER_ROLES = {
  REGIONAL_ADMIN: {
    id: 'regional_admin',
    name: 'Regional Admin',
    icon: 'globe',
    description: 'Manages regional operations and oversees country admins',
    permissions: ['manage_users', 'manage_entities', 'view_reports', 'manage_settings']
  },
  COUNTRY_ADMIN: {
    id: 'country_admin',
    name: 'Country/Partner Admin',
    icon: 'flag',
    description: 'Administers country-level operations and user management',
    permissions: ['manage_country_users', 'view_reports', 'manage_country_settings']
  },
  COUNTRY_REPORTER: {
    id: 'country_reporter',
    name: 'Country Reporter',
    icon: 'file-text',
    description: 'Submits and manages country-level reports',
    permissions: ['submit_reports', 'view_reports']
  },
  WORLD_BANK: {
    id: 'world_bank',
    name: 'World Bank',
    icon: 'briefcase',
    description: 'World Bank representative with oversight capabilities',
    permissions: ['view_all_reports', 'manage_indicators', 'view_analytics']
  }
}
```