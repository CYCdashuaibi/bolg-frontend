import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

import router from './router'
import '@/assets/css/reset.scss';
import '@/assets/css/index.scss';

createRoot(document.getElementById('root')).render(
  <Suspense fallback={"加载中.."}>
    <RouterProvider router={router} />
  </Suspense>,
)
