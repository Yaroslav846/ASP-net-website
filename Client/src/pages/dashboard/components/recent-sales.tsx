import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useState} from 'react';

export function RecentSales() {
  interface Note {
    createdAt: string;
    email: string;
    id: string;
    name: string;
    phone: string;
    questionAnswersJson: string;
  }
  
  
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/submitdata', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          // Пользователь выполнил вход, завершаем загрузку
          const responseData = await response.json();
          const notesArray = responseData.notes; // Используем notes.notes
          setNotes(notesArray); 
        } else {
          // Пользователь не выполнил вход, перенаправляем на страницу sign-in
          window.location.href = '/sign-in';
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        // Обработка ошибок, например, перенаправление на страницу ошибки
        //window.location.href = '/500';
      }
    }

    fetchData(); // Вызываем функцию здесь, перед setTimeout
  }, []);
  return (
    <div className='space-y-8'>
      {notes.map((note, index) => (
        <div key={index} className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src='/avatars/01.png' alt='Avatar' />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>{note.name}</p>
            <p className='text-sm text-muted-foreground'>
            {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
          <div className='ml-auto font-medium'>{note.phone}</div>
        </div>
      ))}
    </div>
  )
}
