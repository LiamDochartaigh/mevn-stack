import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/404.vue'
import { nextTick } from 'vue';
import UserActivated from '../views/UserActivated.vue';
import ChangePassword from '../views/ChangePassword.vue';
import PasswordReset from '../views/PasswordReset.vue'
import Login from '../views/Login.vue';
import Google from '../views/auth callbacks/Google.vue'
import OrderComplete from '../views/OrderComplete.vue'

export function MoveRoute(to: RouteRecordRaw | undefined) {
  if (router.currentRoute.value.name == to?.name) {
    console.error("Same Route");
  }
  else if (to) { router.push(to); }
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: "Home Page"
    }
  },
  {
    path: '/dashboard/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: "Profile"
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: "Not Found"
    }
  },
  {
    path: '/dashboard',
    name: 'dash',
    component: Dashboard,
    meta: {
      title: "Dashboard"
    }
  },
  {
    path: '/activate',
    name: 'activate',
    component: UserActivated,
    meta: {
      title: "Account Activation"
    },
    props: true
  },
  {
    path: '/recovery',
    name: 'password-change',
    component: ChangePassword,
    meta: {
      title: "Change Password"
    },
    props: true
  },
  {
    path: '/recovery/new',
    name: 'password-recovery',
    component: PasswordReset,
    meta: {
      title: "Reset Password"
    },
    props: true
  },
  {
    path: '/login',
    name: "login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: '/auth/google/callback',
    name: "google-auth",
    component: Google,
  },
  {
    path: '/order-complete',
    name: "order-complete",
    component: OrderComplete,
    meta: {
      title: "Order Complete"
    }
  }
]

export const RouteIdentifier = {
  Home: routes[0],
  Profile: routes[1],
  Dashboard: routes[3]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _, next) => {
  
  if (to.matched.length) {
    next();
  }
  else next(RouteIdentifier.Home);
})

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title as string || "Home";
  })
});

export default router;