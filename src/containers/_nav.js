import React from 'react'
import CIcon from '@coreui/icons-react';


const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Authorization',
    route: '/base',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Configuration',
        to: '/base/breadcrumbs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Group Manager',
        to: '/authorization/groupmanager',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'User Manager',
        to: '/authorization/usermanager',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'General Settings',
    route: '/buttons',
    icon: 'cil-settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee Manager',
        to: '/buttons/buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Earning',
        to: '/buttons/brand-buttons',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Generic Parameters',
    route: '/icons',
    icon: 'cil-layers',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Department',
        to: '/genericparameter/department',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Division',
        to: '/genericparameter/division',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee Type',
        to: '/genericparameter/employeetype',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Location',
        to: '/genericparameter/location',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Position',
        to: '/genericparameter/position',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Section',
        to: '/genericparameter/section',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Unit',
        to: '/genericparameter/unit',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    route: '/notifications',
    icon: 'cil-notes',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Toaster',
        to: '/notifications/toaster'
      }
    ]
  }
]

export default _nav
