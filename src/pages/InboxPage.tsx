/**
 * @copyright 2025 codingczar
 * @license Apache-2.0
 * @description Inbox page for the app
 */

/**
 * Node modules
 */
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

/**
 * Components
 */
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageTitle, PageList } from '@/components/Page';
import TaskCreateButton from '@/components/TaskCreateButton';
import TaskEmptyState from '@/components/TaskEmptyState';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';
import TaskCardSkeleton from '@/components/TaskCardSkeleton';

/**
 * Types
 */
import type { Models } from 'appwrite';

const InboxPage = () => {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();
  // console.log(tasks);
  const [taskFormShow, setTaskFormShow] = useState(false);

  return (
    <>
      <Head title='Inbox - TaskFlow AI' />

      <TopAppBar title='Inbox' />

      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>

        <PageList>
          {tasks.documents.map(
            ({ $id, content, completed, due_date, project }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                completed={completed}
                duedate={due_date}
                project={project}
              />
            ),
          )}

          {fetcher.state !== 'idle' && <TaskCardSkeleton />}

          {!taskFormShow && (
            <TaskCreateButton
              onClick={() => {
                setTaskFormShow(true);
              }}
            />
          )}

          {!tasks.total && !taskFormShow && <TaskEmptyState type='inbox' />}

          {taskFormShow && (
            <TaskForm
              mode='create'
              className='mt-1'
              onCancel={() => {
                setTaskFormShow(false);
              }}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  method: 'POST',
                  action: '/app',
                  encType: 'application/json',
                });
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  );
};

export default InboxPage;
