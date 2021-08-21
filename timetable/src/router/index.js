import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import DepEdit from '../views/DepEdit'
import ScheEdit from '../views/ScheEdit'
import TimetableEdit from '../views/TimetableEdit'
import StaffEdit from '../views/StaffEdit'
import Temp from '../views/Temp'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect:{name:'TimetableEdit'}
    },
    {
      path: '/depEdit',
      name: 'DepEdit',
      component: DepEdit
    },
    {
      path: '/timetableEdit',
      name: 'TimetableEdit',
      component: TimetableEdit
    },
    {
      path: '/scheEdit',
      name: 'ScheEdit',
      component: ScheEdit
    },
    {
      path: '/temp',
      name: 'Temp',
      component: Temp
    },
    {
      path: '/staffEdit',
      name: 'StaffEdit',
      component: StaffEdit
    },
  ]
})
