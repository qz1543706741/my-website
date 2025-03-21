// 字节调度器
class MySchedule {
  private taskCount: number = 0;
  private taskQueue: Array<() => void> = [];
  constructor(private maxTask = 2) {}

  add(task: () => Promise<void>) {
    return new Promise<void>((resolve) => {
      this.taskQueue.push(() => {
        this.taskCount++;
        task()
          .then(resolve)
          .then(() => {
            this.taskCount--;
            this.call();
          });
      });
      this.call();
    });
  }

  private call() {
    if (this.taskCount < this.maxTask) {
      const _task = this.taskQueue.shift();
      _task?.();
    }
  }
}

const schedule = new MySchedule(3);

const timeout = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, time);
  });
};

const addTask = (time: number, label: string) => {
  schedule
    .add(() => timeout(time))
    .then(() => {
      console.log(label);
    });
};

addTask(1000, '1000');
addTask(500, '500');
addTask(300, '300');
addTask(400, '400');
