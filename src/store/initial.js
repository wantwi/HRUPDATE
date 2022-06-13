import { config } from '../reusable/configs/config';

if (!localStorage.getItem(config.key.lan))
  localStorage.setItem('language', config.langs[navigator.language]);

if (!localStorage.getItem(config.key.sideBarShow))
  localStorage.setItem('sidebarShow', JSON.stringify('responsive'));

export const initialState = {
  sidebarShow: localStorage.getItem(config.key.sideBarShow) !== 'responsive' ? JSON.parse(localStorage.getItem(config.key.sideBarShow)) : localStorage.getItem(config.key.sideBarShow),
  language: localStorage.getItem('language'),
  createData: {},
  updateData: {},
  data: {}
}