import React from 'react'
import { FlatList } from 'react-native'

import { EditTaskArgs } from '../pages/Home'
import { ItemWrapper } from './ItemWrapper'
import { TaskItem } from './TaskItem'

export interface Task {
  id: number
  title: string
  done: boolean
}

interface TasksListProps {
  tasks: Task[]
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              editTask={editTask}
              removeTask={removeTask}
              task={item}
              toggleTaskDone={toggleTaskDone}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32,
      }}
    />
  )
}
