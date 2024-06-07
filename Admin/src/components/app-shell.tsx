import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { useEffect, useState} from 'react';
import Loader from './loader';

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUserLogin() {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          const userData = await response.json();
          // Проверяем, что уровень пользователя больше 3
          if (userData.level > 3) {
            // Пользователь выполнил вход и его уровень больше 3, завершаем загрузку
            setIsLoading(false);
          } else {
            // Пользователь выполнил вход, но его уровень меньше или равен 3, перенаправляем на страницу sign-in
            window.location.href = '/admin/sign-in';
          }
        } else {
          // Пользователь не выполнил вход, перенаправляем на страницу sign-in
          window.location.href = 'admin/sign-in';
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        // Обработка ошибок, например, перенаправление на страницу ошибки
        window.location.href = '/500';
      }
    }

    checkUserLogin();
}, []);

  if (isLoading) {
    return <Loader/>
  }
  
  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}
