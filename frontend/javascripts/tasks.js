Vue.component('my-tasks', {
  template: '#tasks',
  data() {
    return {
      task: null,
      rate: null,
      running: false,
      seconds: '00',
      minutes: '00',
      hours: '00',
      time: null,
      tasks: [],
      activeTask: null,
      spentTime: null,
      earnedMoney: null,
      activeColor: 'gray',
    }
  },
  ready() {
    if (localStorage.tasks) {
      this.getLocalStorage()
    }
    this.calcTotals()
    this.allToInactive()
  },
  methods: {
    timeCounter() {
      this.seconds < 9 ? this.seconds = '0' + ++this.seconds : this.seconds++
      if (this.seconds >= 60) {
        this.seconds = '00'
        this.minutes < 9 ? this.minutes = '0' + ++this.minutes : this.minutes++
        if (this.minutes >= 60) {
          this.minutes = '00'
          this.hours < 9 ? this.hours = '0' + ++this.hours : this.hours++
        }
      }
      this.startTimer()
    },
    startTimer() {
      this.running = true
      this.time = setTimeout(this.timeCounter, 1000)
    },
    stopTimer() {
      this.running = false
      clearTimeout(this.time)
      this.addTask()
      this.task = null
      this.rate = null
      this.seconds = '00'
      this.minutes = '00'
      this.hours = '00'
      this.calcTotals()
      this.setLocalStorage()
      this.allToInactive()
    },
    addTask() {
      let time = this.hours + ':' + this.minutes + ':' + this.seconds
      let total = this.calcPrice()
      let totalSeconds = +this.hours * 3600 + +this.minutes * 60 + +this.seconds

      if (!this.task) {
        this.task = '(не заполнено)'
      }

      this.tasks.unshift(
        { name: this.task, rate: this.rate, time: time, total: total, totalSeconds: totalSeconds, flag: false }
      )
    },
    roundingToHours() {
      return Math.ceil((this.hours * 3600 + this.minutes * 60 + this.seconds)/3600)
    },
    calcPrice() {
      this.rate = parseInt(this.rate)
      if (isNaN(this.rate)) {
        this.rate = 0
      }

      return this.roundingToHours() * this.rate
    },
    editTask(index) {
      this.tasks[index].flag = true
      this.newName = null
      this.getActiveTask(index)
      this.calcTotals()
      this.setLocalStorage()
    },
    deleteTask(index) {
      this.tasks.splice(index, 1)
      this.calcTotals()
      this.setLocalStorage()
    },
    saveEditedTask(index) {
      let thisTask = this.tasks[index]
      let roundToHour = Math.ceil(thisTask.totalSeconds / 3600)

      if (!thisTask.name) {
        thisTask.name = '(не заполнено)'
      }

      thisTask.total = roundToHour * thisTask.rate
      thisTask.flag = false
      this.calcTotals()
      this.setLocalStorage()

    },
    calcTotals() {
      let totalSeconds = null
      let totalMoney = null
      let seconds = null
      let minutes = null
      let hours = null
      let reduce = null

      this.tasks.forEach(task => {
        totalSeconds += task.totalSeconds
        totalMoney += task.total
      })

      reduce = totalSeconds % 3600
      hours = (totalSeconds - reduce)/3600
      totalSeconds = reduce
      reduce = totalSeconds % 60
      minutes = (totalSeconds - reduce)/60
      seconds = reduce
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      this.spentTime = hours + ':' + minutes + ':' + seconds
      this.earnedMoney = totalMoney
    },
    getActiveTask(index) {
      if (this.activeTask !== null) {
        let thisTask = this.tasks[this.activeTask]
        let roundToHour = Math.ceil(thisTask.totalSeconds / 3600)
        thisTask.flag = false
        thisTask.total = roundToHour * thisTask.rate

        if (!thisTask.name) {
          thisTask.name = '(не заполнено)'
        }

        thisTask.total = roundToHour * thisTask.rate
        thisTask.flag = false
        this.calcTotals()
        this.setLocalStorage()
      }
      if (this.activeTask === index) {
        this.tasks[this.activeTask].flag = true
      }
      this.activeTask = index
    },
    setLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      localStorage.setItem('activeColor', JSON.stringify(this.activeColor))
    },
    getLocalStorage() {
      this.tasks = JSON.parse(localStorage.getItem('tasks'))
      this.activeColor = JSON.parse(localStorage.getItem('activeColor'))
    },
    allToInactive() {
      this.tasks.forEach(task => {
        task.flag = false
      })
    },
    getColor(color) {
      this.activeColor = color
      this.setLocalStorage()
    },
  },
})

new Vue({
  el: '#app',
})
