import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export type EditTaskArgs = {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const filteredSameTitleTask = tasks.find(
      (task) => task.title === newTaskTitle,
    )

    if (filteredSameTitleTask) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
      )
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks((oldState) => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map((task) => ({ ...task }))
    const filteredTask = updatedTask.find((item) => item.id === id)

    if (!filteredTask) return

    filteredTask.done = !filteredTask.done

    setTasks(updatedTask)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          style: 'cancel',
          text: 'Não',
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            const filteredTask = tasks.filter((task) => task.id !== id)
            setTasks(filteredTask)
          },
        },
      ],
    )
  }

  function habdleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTask = tasks.map((task) => ({ ...task }))
    const filteredTask = updatedTask.find((item) => item.id === taskId)

    if (!filteredTask) return

    filteredTask.title = taskNewTitle
    setTasks(updatedTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={habdleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
})
