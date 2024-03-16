import type { MenuProps } from 'antd';

// Items for first section of sidebar
export const mainMenuItems: MenuProps['items'] = [
  { key: 'contacts', icon: '', label: 'Contacts' },
  { key: 'documents', icon: '', label: 'Documents' },
  { key: 'profile', icon: '', label: 'Profile' },
  { key: 'goals', icon: '', label: 'Goals' }
];

export const profileDropdownItems: MenuProps['items'] = [
  { key: 'home', label: 'Home' },
  { key: 'logout', label: 'Logout' },
  { key: 'settings', label: 'Account Settings' }
];
