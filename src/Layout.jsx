import AmazonHeader from './components/AmazonHeader';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <AmazonHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}